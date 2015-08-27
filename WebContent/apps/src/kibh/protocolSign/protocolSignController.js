'use strict';

angular.module('ASS.protocolSign').controller('protocolSignCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$localStorage', '$timeout', 'kibhFile', 'kibhSystem', 'kibhCustomer', function ($scope, $rootScope, $state, $stateParams, $localStorage, $timeout, kibhFile, kibhSystem, kibhCustomer) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
    $scope.signtip = "我已阅读并同意签署该协议";
    $scope.myHeight = {height: $rootScope.protocolHeight};

    var setSignTip = function (wait) {
        if (wait == 0) {
            $scope.signtip = "我已阅读并同意签署该协议";
            $scope.isRead = true;
        } else {
            $scope.signtip = "我已阅读并同意签署该协议(" + wait + ")";
            $scope.isRead = false;
            wait--;
            $timeout(function () {
                setSignTip(wait);
            }, 1000);
        }
    };

    kibhSystem.getProtocolInfo({
        BUSINESS_ID: $scope.bizid
    }).then(function (data) {
        if (data && data[0] && data[0][0]) {
            var isSigned = false, protocol = data[0][0];
            kibhSystem.getProtocolRlt({
                BUSINESS_ID: $scope.bizid,
                AGREEMENT_ID: data[0][0].AGREEMENT_ID
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    if (data[0][0].SIGN_TYPE == "0") {
                        isSigned = true;
                    }
                }
                if (isSigned) {
                	if ($rootScope.beforeProtocolSignUrl) {
                		$scope.back();
                	} else {
                		$scope.step = 2;
                	}
                } else {
                    $scope.protocolInfo = protocol;
                    $scope.protocolPath = kibhFile + $scope.protocolInfo.AGREEMENT_URL;
                    $scope.step = 1;
                    setSignTip($scope.protocolInfo.SHOW_TIME);
                }
            });
        }
    });

    $scope.agree = function () {
        kibhSystem.saveProtocolSign({
            BUSINESS_ID: $scope.bizid,
            AGREEMENT_ID: $scope.protocolInfo.AGREEMENT_ID,
            SIGN_TYPE: "0",
            SIGN_REMARK: "客户同意"
        }).then(function (data) {
            if (data && data[2] && data[2].ANS_MSG_HDR) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                	if ($rootScope.beforeProtocolSignUrl) {
                		$scope.back();
                	} else {
                		$scope.step = 2;
                	}
                }
            }
        });
    };
    
    $scope.back = function () {
    	var url = $rootScope.beforeProtocolSignUrl;
    	$rootScope.beforeProtocolSignUrl = null;
    	if (url.indexOf("#") < 0) {
            $state.go(url);
        } else {
            window.location.href = url;
        }
	};
}]);