'use strict';

angular.module('ASS.openHKStock').controller('openHKStockCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$localStorage', '$modal', '$timeout', 'myAlert', 'myConfirm', 'kibhFile', 'kibhAccount', 'kibhSystem', function ($scope, $rootScope, $state, $stateParams, $localStorage, $modal, $timeout, myAlert, myConfirm, kibhFile, kibhAccount, kibhSystem) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
    
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

    var getAgreement = function () {
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
                $scope.step = 2;
            }
        });
    };

    var sortAnswers = function (answers) {
        for (var i = 0; i < answers.length; i++) {
            for (var j = 0; j < $scope.questions.length; j++) {
                if (answers[i].QUESTION_ID == $scope.questions[j].QUESTION_ID) {
                    $scope.questions[j].ANSWER.push(answers[i]);
                    break;
                }
            }
        }
    };

    var getAnswers = function (id) {
        kibhSystem.getAnswers({
            PAPER_ID: id
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                sortAnswers(data[0]);
            }
        });
    };

    var getQuestions = function (id) {
        kibhSystem.getQuestions({
            PAPER_ID: id
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.questions = data[0];
                for (var i = 0; i < $scope.questions.length; i++) {
                    $scope.questions[i].ANSWER = [];
                }
                getAnswers($scope.testInfo.PAPER_ID);
            }
        });
    };

    var checkRiskLevel = function (step) {
        kibhSystem.getRiskTestRlt().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.riskLevel = data[0][0].RATING_LVL;
                kibhSystem.getBusinessInfo({
                    BUSINESS_ID: $scope.bizid,
                    BUSINESS_CLS: "2"
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        if ($scope.riskLevel < data[0][0].RISK_LEVEL) {
                            if (data[0][0].RISK_LEVEL_IF_MUST == "1") {
                            	$scope.error1 = "无法办理此业务";
                            	$scope.step = 5;
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
                                myConfirm("开通港股通股票交易，要求风险评级是“" + askLevel + "”，超出您的“" + myLevel + "”风险评级，您确定要办理此业务吗？", function () {
                                    // 调用接口记录客户超出风险级别办理业务
                                    if (data[0][0].EVALUATION_TYPE != "0") {
                                        kibhSystem.getTestInfo({
                                            BUSINESS_ID: $scope.bizid
                                        }).then(function (data) {
                                            if (data && data[0] && data[0][0]) {
                                                $scope.testInfo = data[0][0];
                                                getQuestions($scope.testInfo.PAPER_ID);
                                                $scope.step = step;
                                            }
                                        });
                                    } else {
                                        getAgreement();
                                    }
                                }, function () {
                                	$scope.info = "操作已取消";
                                	$scope.step = 6;
                                });
                            }
                        } else {
                            if (data[0][0].EVALUATION_TYPE != "0") {
                                kibhSystem.getTestInfo({
                                    BUSINESS_ID: $scope.bizid
                                }).then(function (data) {
                                    if (data && data[0] && data[0][0]) {
                                        $scope.testInfo = data[0][0];
                                        getQuestions($scope.testInfo.PAPER_ID);
                                        $scope.step = step;
                                    }
                                });
                            } else {
                                getAgreement();
                            }
                        }
                    }
                });
            }
        });
    };

    var checkHKStock = function (step) {
        kibhAccount.getStockAccount().then(function (data) {
            if (data && data[0]) {
                angular.forEach(data[0], function (d) {
                    if (d.STKBD == "10") {
                        $scope.actno = d.TRDACCT;
                    }
                });
                kibhSystem.checkHKStock({
                    BUSINESS_ID: $scope.bizid,
                    BUSI_LOG_NO: $scope.busilogno,
                    TRDACCT: $scope.actno
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        switch (data[0][0].CODE) {
                            case "0":
                                checkRiskLevel(step);
                                break;
                            default:
                                $scope.error = data[0][0].TEXT;
                                $scope.step = 4;
                        }
                    }
                });
            }
        });
    };

    var getUserBizs = function () {
        kibhSystem.getUserBizs({
            BUSINESS_ID: $scope.bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                if (data[0][0].STATUS == 0) {
                    $scope.step = 3;
                } else {
                    checkHKStock(1);
                }
            }
        });
    };

    $scope.myHeight = {height: $rootScope.protocolHeight};

    $scope.itemSelect = function () {
        $scope.isChanged = true;
        if ($("input:radio:checked").size() == $scope.questions.length) {
            $scope.isChecked = true;
        } else {
            $scope.isChecked = false;
        }
    };

    $scope.reset = function () {
        $("input:radio:checked").each(function () {
            this.checked = false;
        });
        $scope.isChanged = false;
        $scope.isChecked = false;
    };

    $scope.testResult = function (score) {
        var isPassed;
        if (score >= 70) {
            isPassed = true;
        } else {
            isPassed = false;
        }
        $modal.open({
            backdrop: "static",
            templateUrl: 'apps/src/kibh/openHKStock/testResult.html',
            controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                $scope.score = score;
                $scope.isPassed = isPassed;

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.next = function () {
                    $scope.cancel();
                    getAgreement();
                };

                $modalInstance.result.then(function () {
                    $scope.cancel();
                });
            }]
        });
    };

    $scope.getTestResult = function () {
        var answerres = "";
        $("input:radio").each(function () {
            if (this.checked) {
                answerres += $(this).attr("answerres");
                answerres += "@@@";
            }
        });
        kibhSystem.saveTestInfo({
            BUSINESS_ID: $scope.bizid,
            BUSI_LOG_NO: $scope.busilogno,
            PAPER_ID: $scope.testInfo.PAPER_ID,
            ANSWER_RES: answerres.substring(0, answerres.length - 3)
        }).then(function (data) {
            if (data && data.length > 0 && data[2] && data[2].ANS_MSG_HDR) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    if (data[0] && data[0].length > 0) {
                        $scope.testResult(data[0][0].PAPER_SCORE);
                    }
                }
            }
        });
    };

    $scope.getAgreeResult = function () {
        myConfirm("您确定要开通港股通股票业务吗？", function () {
            kibhSystem.saveProtocolSign({
                BUSINESS_ID: $scope.bizid,
                AGREEMENT_ID: $scope.agreementid.join(","),
                SIGN_TYPE: "0",
                SIGN_REMARK: "客户同意"
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        kibhAccount.openHKStock({
                            BUSINESS_ID: $scope.bizid,
                            OPERATION_TYPE: "0",
                            STKBD: accountmap[$scope.actno],
                            TRDACCT: $scope.actno,
                            CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                            BUSI_LOG_NO: $scope.busilogno
                        }).then(function (data) {
                            if (data && data[0]) {
                                $scope.step = 3;
                            }
                        });
                    }
                }
            });
        });
    };

    $scope.submit = function () {
        switch ($scope.step) {
            case 1:
                $scope.getTestResult();
                break;
            case 2:
                $scope.getAgreeResult();
                break;
            default:
                $scope.step = 1;
        }
    };

    $scope.cancel = function () {
        myConfirm("您确定要撤销港股通股票业务吗？", function () {
            kibhAccount.openHKStock({
                BUSINESS_ID: $scope.bizid,
                OPERATION_TYPE: "2",
                STKBD: accountmap[$scope.actno],
                TRDACCT: $scope.actno,
                CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                BUSI_LOG_NO: $scope.busilogno
            }).then(function (data) {
                if (data && data[0]) myAlert("成功撤销港股通股票业务！", function () {
                    getUserBizs();
                });
            });
        });
    };
    
    kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
        $scope.busilogno = data[0][0].BUSI_LOG_NO;
        getDictInfo(["RATING_LVL_SECU"]);
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