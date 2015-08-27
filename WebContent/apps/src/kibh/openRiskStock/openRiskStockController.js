'use strict';

angular.module('ASS.openRiskStock').controller('openRiskStockCtrl', ['$rootScope', '$scope', '$stateParams', '$localStorage', 'kibhSystem', 'kibhAccount', 'myConfirm', 'kibhFile', 'myAlert', function ($rootScope, $scope, $stateParams, $localStorage, kibhSystem, kibhAccount, myConfirm, kibhFile, myAlert) {
	$scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
	var bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";

    var accountmap = {}, getBlkName = function (STKBD) {
        var blkname = "";
        for (var i = 0; i < $scope.stkbd.length; i++) {
            if (STKBD == $scope.stkbd[i].DICT_ITEM) {
                blkname = $scope.stkbd[i].DICT_ITEM_NAME;
                break;
            }
        }
        return blkname;
    };

    var getProtocolInfo = function (step) {
        kibhSystem.getProtocolInfo({
            BUSINESS_ID: bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.agreement_id = data[0][0].AGREEMENT_ID;
                $scope.agreement_name = data[0][0].AGREEMENT_NAME;
                $scope.agreement_url = kibhFile + data[0][0].AGREEMENT_URL;
                $scope.step = step;
            }
        });
    };

    var getUserBizs = function () {
        kibhSystem.getUserBizs({
            BUSINESS_ID: bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                if (data[0][0].STATUS == 0) $scope.step = 2; else getProtocolInfo(1);
            }
        });
    };

    $scope.myHeight = {height: $rootScope.protocolHeight};

    $scope.next = function () {
        myConfirm("您确定要开通风险警示板股票业务吗？", function () {
            kibhSystem.saveProtocolSign({
                BUSINESS_ID: bizid,
                AGREEMENT_ID: $scope.agreement_id,
                SIGN_TYPE: "0",
                SIGN_REMARK: "客户同意"
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        kibhAccount.openRiskStock({
                            BUSINESS_ID: bizid,
                            OPERATION_TYPE: "0",
                            STKBD: accountmap[$scope.actno],
                            TRDACCT: $scope.actno,
                            CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                            BUSI_LOG_NO: $scope.busilogno
                        }).then(function (data) {
                            if (data && data[0]) $scope.step = 2;
                        });
                    }
                }
            });
        });
    };

    $scope.cancel = function () {
        myConfirm("您确定要撤销风险警示板股票业务吗？", function () {
            kibhAccount.openRiskStock({
                BUSINESS_ID: bizid,
                OPERATION_TYPE: "2",
                STKBD: accountmap[$scope.actno],
                TRDACCT: $scope.actno,
                CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                BUSI_LOG_NO: $scope.busilogno
            }).then(function (data) {
                if (data && data[0]) myAlert("成功撤销风险警示板股票业务！", function () {
                    getUserBizs();
                });
            });
        });
    };
    
    kibhSystem.getBusiLogNo(bizid).then(function (data) {
        $scope.busilogno = data[0][0].BUSI_LOG_NO;
        kibhSystem.getLogUserInfo().then(function(data) {
        	$scope.user = data[0][0];
        	kibhSystem.getDictInfo({
                DICT_CODE: "STKBD"
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.stkbd = data[0];
                }
                kibhAccount.getStockAccount().then(function (data) {
                    $scope.accountlist = [];
                    if (data && data[0]) {
                        angular.forEach(data[0], function (d) {
                            if (d.STKBD == "10") {
                                accountmap[d.TRDACCT] = d.STKBD;
                                d.STKBDNAME = getBlkName(d.STKBD) + " " + d.TRDACCT;
                                $scope.accountlist.push(d);
                            }
                        });
                        $scope.actno = $scope.accountlist[0].TRDACCT;
                    }
                });
                getUserBizs();
            });
		});
    });

    // 兼容IE
    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 8) {
            $scope.isIE8 = true;
        }
    });
}]);