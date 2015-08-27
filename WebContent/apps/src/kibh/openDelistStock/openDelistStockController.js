'use strict';

angular.module('ASS.openDelistStock').controller('openDelistStockCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$localStorage', 'kibhSystem', 'kibhAccount', 'kibhFile', 'myAlert', 'myConfirm', function ($rootScope, $scope, $state, $stateParams, $localStorage, kibhSystem, kibhAccount, kibhFile, myAlert, myConfirm) {
	$scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
	var bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    
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

    var getAgreement = function () {
        kibhSystem.getProtocolInfo({
            BUSINESS_ID: bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.agreement_id = data[0][0].AGREEMENT_ID;
                $scope.agreement_name = data[0][0].AGREEMENT_NAME;
                $scope.agreement_url = kibhFile + data[0][0].AGREEMENT_URL;
                $scope.step = 1;
            }
        });
    };

    var checkRiskLevel = function (step) {
        kibhSystem.getRiskTestRlt().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.riskLevel = data[0][0].RATING_LVL;
                kibhSystem.getBusinessInfo({
                    BUSINESS_ID: bizid,
                    BUSINESS_CLS: "2"
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        if ($scope.riskLevel < data[0][0].RISK_LEVEL) {
                            if (data[0][0].RISK_LEVEL_IF_MUST == "1") {
                            	$scope.error1 = "无法办理此业务";
                            	$scope.step = 4;
                            } else {
                            	var myLevel = "", askLevel = "";
                            	angular.forEach($scope.ratinglvlsecu, function (d) {
                            		if (d.DICT_ITEM == $scope.riskLevel) {
                            			myLevel = d.DICT_ITEM_NAME;
                            		}
                            		if (d.DICT_ITEM == data[0][0].RISK_LEVEL) {
                            			askLevel = d.DICT_ITEM_NAME;
                            		}
                            	});
                                myConfirm("开通退市整理板股票交易，要求风险评级是“" + askLevel + "”，超出您的“" + myLevel + "”风险评级，您确定要办理此业务吗？", function () {
                                    // 调用接口记录客户超出风险级别办理业务
                                    /*if(data[0][0].EVALUATION_TYPE != "0") {
                                     kibhSystem.getTestInfo({
                                     BUSINESS_ID: bizid
                                     }).then(function(data) {
                                     if(data && data[0] && data[0][0]) {
                                     $scope.testInfo = data[0][0];
                                     getQuestions($scope.testInfo.PAPER_ID);
                                     $scope.step = step;
                                     }
                                     });
                                     } else {*/
                                    getAgreement();
                                    //}
                                }, function () {
                                	$scope.info = "操作已取消";
                                	$scope.step = 5;
                                });
                            }
                        } else {
                            /*if(data[0][0].EVALUATION_TYPE != "0") {
                             kibhSystem.getTestInfo({
                             BUSINESS_ID: bizid
                             }).then(function(data) {
                             if(data && data[0] && data[0][0]) {
                             $scope.testInfo = data[0][0];
                             getQuestions($scope.testInfo.PAPER_ID);
                             $scope.step = step;
                             }
                             });
                             } else {*/
                            getAgreement();
                            //}
                        }
                    }
                });
            }
        });
    };

    var checkDelistStock = function (step) {
    	var account = null;
    	kibhAccount.getStockAccount().then(function (data) {
            if (data && data[0]) {
                angular.forEach(data[0], function (d) {
                    if (d.STKBD == $scope.actno) {
                    	account = d.TRDACCT;
                    }
                });
            }
            if (account) {
            	kibhSystem.checkDelistStock({
                    BUSINESS_ID: bizid,
                    BUSI_LOG_NO: $scope.busilogno,
                    TRDACCT: account
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        switch (data[0][0].CODE) {
                            case "0":
                                checkRiskLevel(step);
                                break;
                            default:
                                $scope.error = data[0][0].TEXT;
                                $scope.step = 3;
                        }
                    }
                });
            }
        });
    };

    var getUserBizs = function () {
        kibhSystem.getUserBizs({
            BUSINESS_ID: bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                if (data[0][0].STATUS == 0) {
                    $scope.step = 2;
                } else {
                    checkDelistStock(1);
                }
            }
        });
    };

    $scope.isChecked = true;
    $scope.actno = "10";
    $scope.myHeight = {height: $rootScope.protocolHeight};

    $scope.itemSelect = function () {
        var actno = [];
        if ($("input[name='market']:checked").size() == 0) {
            $scope.isChecked = false;
        } else {
            $scope.isChecked = true;
            $("input[name='market']:checked").each(function () {
                actno.push($(this).attr("value"));
            });
        }
        $scope.actno = actno.join(",");
    };

    $scope.submit = function () {
        myConfirm("您确定要开通退市整理板股票业务吗？", function () {
            kibhSystem.saveProtocolSign({
                BUSINESS_ID: bizid,
                AGREEMENT_ID: $scope.agreement_id,
                SIGN_TYPE: "0",
                SIGN_REMARK: "客户同意"
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        kibhAccount.openDelistStock({
                            BUSINESS_ID: bizid,
                            OPERATION_TYPE: "0",
                            STKBD: $scope.actno,
                            BUSI_LOG_NO: $scope.busilogno
                        }).then(function (data) {
                            if (data && data[0]) {
                                $scope.step = 2;
                            }
                        });
                    }
                }
            });
        });
    };

    $scope.cancel = function () {
        myConfirm("您确定要撤销退市整理板股票业务吗？", function () {
            kibhAccount.openDelistStock({
                BUSINESS_ID: bizid,
                OPERATION_TYPE: "2",
                STKBD: $scope.actno,
                BUSI_LOG_NO: $scope.busilogno
            }).then(function (data) {
                if (data && data[0]) myAlert("成功撤销退市整理板股票业务！", function () {
                    getUserBizs();
                });
            });
        });
    };
    
    kibhSystem.getBusiLogNo(bizid).then(function (data) {
        $scope.busilogno = data[0][0].BUSI_LOG_NO;
        getDictInfo(["RATING_LVL_SECU"]);
        kibhSystem.getLogUserInfo().then(function(data) {
        	$scope.user = data[0][0];
        	getUserBizs();
		});
    });

    // 兼容IE
    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 8) {
            $scope.isIE8 = true;
        }
    });
}]);