'use strict';

angular.module('ASS.openHSFund').controller('openHSFundCtrl', ['$scope', '$rootScope', '$modal', '$state', '$stateParams', '$localStorage', '$timeout', 'myAlert', 'myConfirm', 'kibhFile', 'kibhAccount', 'kibhCustomer', 'kibhSystem', function ($scope, $rootScope, $modal, $state, $stateParams, $localStorage, $timeout, myAlert, myConfirm, kibhFile, kibhAccount, kibhCustomer, kibhSystem) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";

    kibhSystem.getRiskTestRlt({
		SURVEY_CLS: "0,1"
	}).then(function (data) {
		if (data && data[0] && data[0].length == 2) {
		    kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
		        $scope.busilogno = data[0][0].BUSI_LOG_NO;
		        kibhSystem.getLogUserInfo().then(function(data) {
		        	$scope.user = data[0][0];
		        	kibhSystem.getFundAccount({
		                BUSINESS_ID: $scope.bizid
		            }).then(function (data) {
		                if (data && data[0]) {
		                    angular.forEach(data[0], function (d) {
		                        $scope.flag[d.TA_CODE] = true;
		                    });
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

    /*var getDictInfo = function(codelist) {
     if(codelist && codelist.length > 0) {
     var code = codelist.shift();
     kibhSystem.getDictInfo({
     DICT_CODE: code
     }).then(function(data) {
     if(data && data[0] && data[0][0]) {
     $scope[code.toLowerCase().replace(/_/g, "")] = data[0];
     }
     getDictInfo(codelist);
     });
     }
     };

     getDictInfo(["OFACCT_STATUS"]);*/

    $scope.tacode = "00";
    $scope.title = {
        "00": "沪深开放式基金开户",
        "11": "沪开放式基金开户",
        "22": "深开放式基金开户"
    };
    $scope.flag = {
        "11": false,
        "22": false
    };
    $scope.myHeight = {height: $rootScope.protocolHeight};

    $scope.open = function (code) {
        if ($scope.flag[code]) {
            myAlert("您已办理过此业务！");
        } else {
            $scope.tacode = code;
            kibhSystem.getProtocolInfo({
                BUSINESS_ID: $scope.bizid
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.agreement_id = data[0][0].AGREEMENT_ID;
                    $scope.agreement_name = data[0][0].AGREEMENT_NAME;
                    $scope.agreement_url = kibhFile + data[0][0].AGREEMENT_URL;
                    $scope.step = 1;
                }
            });
        }
    };

    $scope.submit = function () {
        myConfirm("您确定要办理" + $scope.title[$scope.tacode] + "业务吗？", function () {
            kibhSystem.saveProtocolSign({
                BUSINESS_ID: $scope.bizid,
                AGREEMENT_ID: $scope.agreement_id,
                SIGN_TYPE: "0",
                SIGN_REMARK: "客户同意"
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        kibhSystem.openFundAccount({
                            BUSINESS_ID: $scope.bizid,
                            BUSI_LOG_NO: $scope.busilogno,
                            TA_CODE: $scope.tacode,
                            BILL_MAIL_TYPE: "1",
                            DIV_METHOD: "1"
                        }).then(function (data) {
                            if (data && data[2] && data[2].ANS_MSG_HDR) {
                                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                    $scope.step = 2;
                                }
                            }
                        });
                    }
                }
            });
        });
    };

    // 兼容IE
    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 8) {
            $scope.isIE8 = true;
        }
    });
}]);