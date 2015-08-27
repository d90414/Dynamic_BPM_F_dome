'use strict';
/*
 1054	机构信息查询
 */
angular.module('ASS.openFund').controller('openFundCtrl', ['$scope', '$rootScope', '$window', '$modal', '$state', '$stateParams', '$localStorage', '$timeout', 'myAlert', 'myConfirm', 'kibhFile', 'kibhAccount', 'kibhCustomer', 'kibhSystem', function ($scope, $rootScope, $window, $modal, $state, $stateParams, $localStorage, $timeout, myAlert, myConfirm, kibhFile, kibhAccount, kibhCustomer, kibhSystem) {
	$scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
	$scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
	
	kibhSystem.getRiskTestRlt({
		SURVEY_CLS: "0,1"
	}).then(function (data) {
		if (data && data[0] && data[0].length == 2) {
			kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
				$scope.busilogno = data[0][0].BUSI_LOG_NO;
				kibhSystem.getFundCompany({
					BUSINESS_ID: "1054",
					QUERY_FLAG: "1"
				}).then(function (data) {
					if (data && data[0] && data[0][0]) {
						$scope.fundcompany = data[0];
					}
					kibhSystem.getProtocolInfo({
						BUSINESS_ID: $scope.bizid
					}).then(function (data) {
						if (data && data[0]) {
							$scope.agreement = [];
							$scope.agreementid = [];
							angular.forEach(data[0], function (d) {
								$scope.agreement.push({agreement_name: d.AGREEMENT_NAME, agreement_url: kibhFile + d.AGREEMENT_URL});
								$scope.agreementid.push(d.AGREEMENT_ID);
							});
							if ($window.sessionStorage.fund) {
								$scope.fund = JSON.parse($window.sessionStorage.fund);
								$scope.fundlist = [];
								$scope.fundlist.push($scope.fund);
								$scope.range = true;
								$window.sessionStorage.removeItem("fund");
								$scope.step = 1;
							} else {
								kibhSystem.getFundCompany({
									BUSINESS_ID: "1054",
									QUERY_FLAG: "2"
								}).then(function (data) {
									if (data && data[0] && data[0][0]) {
										$scope.fundlist = data[0];
										fundlist = $scope.fundlist;
										$scope.fund = $scope.fundlist[0];
									}
									$scope.step = 1;
								});
							}
						}
					});
				});
			});
		} else {
			myAlert("请先进行风险测评！", function () {
				$rootScope.beforeRiskTestUrl = window.location.href;
                $state.go("kibh.biz.stockRiskTest", {businessId: $rootScope.stockRiskTestId});
            }, function () {
            	$rootScope.beforeRiskTestUrl = window.location.href;
                $state.go("kibh.biz.stockRiskTest", {businessId: $rootScope.stockRiskTestId});
            });
		}
	});
	
	var fundlist = [];
	$scope.fundlist = [];
	$scope.fundcompany = [];
	
	$scope.dateRangeOptions = [{
		'key': '0',
		'value': '全部',
		selected: true
	}, {
		'key': '1',
		'value': 'A-C',
		selected: false
	}, {
		'key': '2',
		'value': 'D-F',
		selected: false
	}, {
		'key': '3',
		'value': 'G-I',
		selected: false
	}, {
		'key': '4',
		'value': 'J-L',
		selected: false
	}, {
		'key': '5',
		'value': 'M-O',
		selected: false
	}, {
		'key': '6',
		'value': 'P-R',
		selected: false
	}, {
		'key': '7',
		'value': 'S-U',
		selected: false
	}, {
		'key': '8',
		'value': 'V-X',
		selected: false
	}, {
		'key': '9',
		'value': 'Y-Z',
		selected: false
	}];
	
	$scope.itemSelect = function (index) {
		for (var i = 0; i < $scope.dateRangeOptions.length; i++) {
			$scope.dateRangeOptions[i].selected = false;
		}
		$scope.dateRangeOptions[index].selected = true;
		if ($scope.dateRangeOptions[index].value == "全部") {
			$scope.fundlist = fundlist;
		} else {
			var fundcache = [], start = $scope.dateRangeOptions[index].value.substring(0, 1), end = $scope.dateRangeOptions[index].value.substring(2);
			angular.forEach(fundlist, function (d, i) {
				if(d.ORG_SPELL.substring(0, 1) >= start && d.ORG_SPELL.substring(0, 1) <= end) {
					fundcache.push(fundlist[i]);
				}
			});
			$scope.fundlist = fundcache;
		}
		$scope.fund = $scope.fundlist[0];
	};

    $scope.itemClick = function (fund) {
    	$scope.fund = fund;
    };
	
	$scope.submit = function () {
		myConfirm("您确定要办理" + $scope.fund.ORG_NAME + "开户业务吗？", function () {
			kibhSystem.saveProtocolSign({
				BUSINESS_ID: $scope.bizid,
				AGREEMENT_ID: $scope.agreementid.join(","),
				SIGN_TYPE: "0",
				SIGN_REMARK: "客户同意"
			}).then(function (data) {
				if (data && data[2] && data[2].ANS_MSG_HDR) {
					if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
						kibhSystem.openFundAccount({
							BUSINESS_ID: $scope.bizid,
	                        BUSI_LOG_NO: $scope.busilogno,
	                        TA_CODE: $scope.fund.ORG_CODE,
	                        BILL_MAIL_TYPE: "1",
	                        DIV_METHOD: "1"
						}).then(function (data) {
							if (data && data[2] && data[2].ANS_MSG_HDR) {
	                            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
	                            	if ($rootScope.beforeOpenFundUrl) {
	                            		$scope.back();
	                            	} else {
	                            		$scope.step = 2;
	                            	}
	                            }
	                        }
						});
					}
				}
			});
        });
	};
	
	$scope.readArgument = function (name, url) {
		$modal.open({
			backdrop: "static",
			size: "lg",
			templateUrl: 'apps/src/kibh/openFund/argument.html',
			controller: ['$scope', '$rootScope', '$modalInstance', function ($scope, $rootScope, $modalInstance) {
				$scope.myHeight = {height: $rootScope.protocolHeight};
				$scope.agreement_name = name;
				$scope.agreement_url = url;
				
				$scope.cancel = function () {
					$modalInstance.dismiss('cancel');
				};
				
				$modalInstance.result.then(function () {
					$scope.cancel();
				});
			}]
		});
	};
	
	$scope.back = function () {
		var url = $rootScope.beforeOpenFundUrl;
		$rootScope.beforeOpenFundUrl = null;
		if (url.indexOf("#") < 0) {
            $state.go(url);
        } else {
            window.location.href = url;
        }
	};
	
	// 兼容IE
	$scope.$on('$viewContentLoaded', function () {
		if ($.browser.msie && $.browser.version <= 8) {
			$scope.isIE8 = true;
		}
	});
}]);