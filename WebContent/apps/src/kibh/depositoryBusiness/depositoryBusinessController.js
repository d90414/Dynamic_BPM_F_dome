'use strict';
/*
 1043	校验资金密码
 */
angular.module('ASS.depositoryBusiness').controller('depositoryBusinessCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$localStorage', '$modal', '$timeout', 'myAlert', 'myConfirm', 'kibhFile', 'kibhAccount', 'kibhSystem', function ($rootScope, $scope, $state, $stateParams, $localStorage, $modal, $timeout, myAlert, myConfirm, kibhFile, kibhAccount, kibhSystem) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";

    kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
        $scope.busilogno = data[0][0].BUSI_LOG_NO;
        kibhSystem.getLogUserInfo().then(function(data) {
        	$scope.user = data[0][0];
        	kibhAccount.getDepositoryInfo({
                BUSINESS_ID: $scope.bizid,
                CONTRACT_FLAG: "1"
            }).then(function (data) {
                $scope.mainaccount = [];
                $scope.secondaccount = [];
                if (data && data[0]) {
                    angular.forEach(data[0], function (d) {
                        if (d.MAIN_FLAG == "1") {
                            $scope.mainaccount.push(d);
                        } else {
                            $scope.secondaccount.push(d);
                        }
                    });
                }
            });
		});
    });

    var getDictInfo = function (codelist) {
        if (codelist && codelist.length > 0) {
            var code = codelist.shift();
            kibhSystem.getDictInfo({
                DICT_CODE: code
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope[code.toLowerCase().replace(/_/g, "")] = data[0];
                }
                getDictInfo(codelist);
            });
        }
    };
    
    getDictInfo(["CURRENCY", "FYHDM", "CONTRACT_STATUS"]);

    var addSecondBank = function (status, value) {
        var isSuccess = false;
        if (status == "1") {
            kibhAccount.addBank({
                BUSINESS_ID: $scope.bizid,
                BUSI_LOG_NO: $scope.busilogno,
                CURRENCY: $("input[name='currency']:checked").attr("value"),
                EXT_ORG: $scope.extorg,
                BANK_ACCT: value,
                MAIN_FLAG: "0",
                CUACCT_CODE: $scope.user.FUNDSACCT_CODE
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        isSuccess = true;
                    }
                }
                if (isSuccess) {
                    $scope.step = 3;
                } else {
                    $scope.step = 4;
                }
            });
        } else {
            kibhAccount.openAssetAccount({
                BUSINESS_ID: $scope.bizid,
                BUSI_LOG_NO: $scope.busilogno,
                CURRENCY: $("input[name='currency']:checked").attr("value")
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        kibhAccount.addBank({
                            BUSINESS_ID: $scope.bizid,
                            BUSI_LOG_NO: $scope.busilogno,
                            CURRENCY: $("input[name='currency']:checked").attr("value"),
                            EXT_ORG: $scope.extorg,
                            BANK_ACCT: value,
                            MAIN_FLAG: "0",
                            CUACCT_CODE: $scope.user.FUNDSACCT_CODE
                        }).then(function (data) {
                            if (data && data[2] && data[2].ANS_MSG_HDR) {
                                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                    isSuccess = true;
                                }
                            }
                            if (isSuccess) {
                                $scope.step = 3;
                            } else {
                                $scope.step = 4;
                            }
                        });
                    }
                }
            });
        }
    };

    var addBank = function (flag, value) {
        var isSuccess = false;
        if (flag) {
            kibhAccount.addBank({
                BUSINESS_ID: $scope.bizid,
                BUSI_LOG_NO: $scope.busilogno,
                CURRENCY: $("input[name='currency']:checked").attr("value"),
                EXT_ORG: $scope.extorg,
                BANK_ACCT: value,
                MAIN_FLAG: "1"
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        isSuccess = true;
                    }
                }
                if (isSuccess) {
                    $scope.step = 3;
                } else {
                    $scope.step = 4;
                }
            });
        } else {
            kibhAccount.getDepositoryInfo({
                BUSINESS_ID: $scope.bizid,
                CONTRACT_FLAG: "0"
            }).then(function (data) {
                if (data && data[0]) {
                    angular.forEach(data[0], function (d) {
                        if (d.MAIN_FLAG == "0") {
                            addSecondBank(d.CONTRACT_STATUS, value);
                        }
                    });
                }
            });
        }
    };

    var getBankList = function (step) {
        kibhSystem.getProtocolInfo({
            BUSINESS_ID: $scope.bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.banklist = data[0];
                $scope.extorg = data[0][0].REMARK;
                $scope.bankico = "public/images/bank_" + data[0][0].REMARK + ".png";
                $scope.bankname = "《" + data[0][0].AGREEMENT_NAME + "》";
                $scope.bankurl = kibhFile + data[0][0].AGREEMENT_URL;
                $scope.step = step;
            }
        });
    };

    $scope.itemClick = function (bank, index) {
        $scope.extorg = bank.REMARK;
        $scope.bankico = "public/images/bank_" + bank.REMARK + ".png";
        $scope.bankname = "《" + bank.AGREEMENT_NAME + "》";
        $scope.bankurl = kibhFile + bank.AGREEMENT_URL;
        if (index || index == 0) {
            if ($.browser.msie && $.browser.version <= 8) {
                $("input[name='bank']:checked").attr("checked", false);
                $("input[name='bank'][value='" + index + "']").attr("checked", true);
            }
        }
    };

    $scope.addBank = function (flag) {
        $scope.isMain = flag;
        if (flag) {
            $scope.step = 1;
            $scope.enter = 1;
        } else {
            kibhSystem.getUserBizs({
                BUSINESS_ID: "1033"
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    if (data[0][0].STATUS == "-1") {
                        myAlert("请先开通单客户多银行的业务权限！", function () {
                            $state.go("kibh.biz.openBusinessAuthority", {businessId: "101004"});
                        });
                    } else {
                        $scope.step = 1;
                        $scope.enter = 1;
                    }
                }
            });
        }
    };

    $scope.deleteBank = function (cur, org, acct, code) {
        $scope.deleteBankInfo = {
            CURRENCY: cur,
            EXT_ORG: org,
            BANK_ACCT: acct,
            CUACCT_CODE: code
        };
        $scope.step = 1;
        $scope.enter = 1;
    };

    $scope.subForm = function (value) {
        if (value) {
            if ($scope.step == 1) {
                kibhSystem.getBusiLogNo("1043").then(function (data) {
                    kibhSystem.checkMoneyPwd({
                        BUSINESS_ID: "1043",
                        BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                        FUND_PWD: value
                    }).then(function (data) {
                        if (data && data[2] && data[2].ANS_MSG_HDR) {
                            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                if ($scope.deleteBankInfo) {
                                    var isSuccess = false;
                                    myConfirm("您确定要删除存管银行吗？", function () {
                                        kibhAccount.deleteBank({
                                            BUSINESS_ID: $scope.bizid,
                                            BUSI_LOG_NO: $scope.busilogno,
                                            CURRENCY: $scope.deleteBankInfo.CURRENCY,
                                            EXT_ORG: $scope.deleteBankInfo.EXT_ORG,
                                            BANK_ACCT: $scope.deleteBankInfo.BANK_ACCT,
                                            CUACCT_CODE: $scope.deleteBankInfo.CUACCT_CODE
                                        }).then(function (data) {
                                            if (data && data[2] && data[2].ANS_MSG_HDR) {
                                                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                                    isSuccess = true;
                                                }
                                            }
                                            if (isSuccess) {
                                                $scope.step = 3;
                                            } else {
                                                $scope.step = 4;
                                            }
                                        });
                                    });
                                } else {
                                    getBankList(2);
                                }
                            }
                        }
                    });
                });
            } else {
                myConfirm('<div class="text-center"><div class="h4 text-danger">您的存管银行将变更为以下银行账号</div><div class="m-t"><img src="' + $scope.bankico + '"></div><div class="h4 m-t">银行账号：' + value + '</div></div>', function () {
                    addBank($scope.isMain, value);
                });
            }
        } else {
            if ($scope.deleteBankInfo) {
                $scope.step = 1;
            } else {
                getBankList(2);
            }
        }
    };

    $scope.readArgument = function (name, url) {
        $modal.open({
            backdrop: "static",
            size: "lg",
            templateUrl: 'apps/src/kibh/depositoryBusiness/argument.html',
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

    // 兼容IE
    $scope.$watch('step', function () {
        if ($.browser.msie && $.browser.version <= 9) {
            $timeout(function () {
                $('input, textarea').placeholder();
            }, 100);
        }
    });

    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 8) {
            $scope.isIE8 = true;
        }
    });
}]);