'use strict';
/*
 1037	修改联系人
 */
angular.module('ASS.openGEMBoard').controller('openGEMBoardCtrl', ['$scope', '$rootScope', '$modal', '$state', '$stateParams', '$localStorage', '$timeout', 'myAlert', 'myConfirm', 'kibhFile', 'kibhAccount', 'kibhCustomer', 'kibhSystem', function ($scope, $rootScope, $modal, $state, $stateParams, $localStorage, $timeout, myAlert, myConfirm, kibhFile, kibhAccount, kibhCustomer, kibhSystem) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";

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

    var setStep = function (step) {
        if (step == 2) {
            kibhCustomer.getContactInfo({
                BUSINESS_ID: "1044"
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.subtip = "提交";
                    $scope.contactInfo = data[0][0];
                    $scope.step = step;
                }
            });
        } else {
            $scope.step = step;
        }
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
                            	$scope.error = "无法办理此业务";
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
                                myConfirm("开通创业板股票交易，要求风险评级是“" + askLevel + "”，超出您的“" + myLevel + "”风险评级，您确定要办理此业务吗？", function () {
                                    // 调用接口记录客户超出风险级别办理业务
                                    if (data[0][0].EVALUATION_TYPE != "0") {
                                        kibhSystem.getTestInfo({
                                            BUSINESS_ID: $scope.bizid
                                        }).then(function (data) {
                                            if (data && data[0] && data[0][0]) {
                                                $scope.testInfo = data[0][0];
                                                getQuestions($scope.testInfo.PAPER_ID);
                                                setStep(step);
                                            }
                                        });
                                    } else {
                                        setStep(2);
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
                                        setStep(step);
                                    }
                                });
                            } else {
                                setStep(2);
                            }
                        }
                    }
                });
            }
        });
    };

    var checkGEMBoard = function (step) {
        kibhSystem.checkGEMBoard({
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
                        myAlert('<div class="text-2x text-danger">' + data[0][0].TEXT + '</div><div class="text-primary m-t">根据《创业板股票交易规则》，您暂时不符合开通创业板的条件。</div>');
                }
            }
        });
    };

    $scope.myHeight = {height: $rootScope.protocolHeight};

    $scope.open = function (step) {
        switch (step) {
            case 1:
                $scope.newopen = true;
                checkGEMBoard(step);
                break;
            default:
                $scope.newopen = false;
                setStep(step);
        }
    };

    $scope.subForm = function (flag) {
        $scope.subtip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>提交中...';
        $scope.submitting = true;
        if (flag) {
            kibhSystem.getBusiLogNo("1037").then(function (data) {
                kibhCustomer.modifyContactInfo({
                    BUSINESS_ID: "1037",
                    BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                    LINKMAN_DELX: $scope.contactInfo.LINKMAN_DELX,
                    LINKMAN_TEL_DELX: $scope.contactInfo.LINKMAN_TEL_DELX,
                    LINKMAN_TEL_XXFS: $scope.contactInfo.LINKMAN_TEL_XXFS
                }).then(function (data) {
                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            kibhSystem.getProtocolInfo({
                                BUSINESS_ID: $scope.bizid
                            }).then(function (data) {
                                $scope.subtip = "提交";
                                $scope.submitting = false;
                                if (data && data[0] && data[0][0]) {
                                    $scope.agreement_id = data[0][0].AGREEMENT_ID;
                                    $scope.agreement_name = data[0][0].AGREEMENT_NAME;
                                    $scope.agreement_url = kibhFile + data[0][0].AGREEMENT_URL;
                                    setStep(3);
                                }
                            });
                        }
                    }
                });
            });
        } else {
            kibhSystem.getProtocolInfo({
                BUSINESS_ID: $scope.bizid
            }).then(function (data) {
                $scope.subtip = "提交";
                $scope.submitting = false;
                if (data && data[0] && data[0][0]) {
                    $scope.agreement_id = data[0][0].AGREEMENT_ID;
                    $scope.agreement_name = data[0][0].AGREEMENT_NAME;
                    $scope.agreement_url = kibhFile + data[0][0].AGREEMENT_URL;
                    setStep(3);
                }
            });
        }
    };

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

    $scope.testResult = function (isPassed) {
        $modal.open({
            backdrop: "static",
            templateUrl: 'apps/src/kibh/openGEMBoard/testResult.html',
            controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                $scope.isPassed = isPassed;

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

                $scope.next = function () {
                    $scope.cancel();
                    setStep(2);
                };

                $modalInstance.result.then(function () {
                    $scope.cancel();
                });
            }]
        });
    };

    $scope.submit = function (flag) {
        if (flag) {
            myConfirm("您确定要开通创业板股票业务吗？", function () {
                kibhSystem.saveProtocolSign({
                    BUSINESS_ID: $scope.bizid,
                    AGREEMENT_ID: $scope.agreement_id,
                    SIGN_TYPE: "0",
                    SIGN_REMARK: "客户同意"
                }).then(function (data) {
                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            kibhAccount.openGEMBoard({
                                BUSINESS_ID: $scope.bizid,
                                OPERATION_TYPE: "0",
                                STKBD: accountmap[$scope.actno],
                                TRDACCT: $scope.actno,
                                CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                                BUSI_LOG_NO: $scope.busilogno,
                                GEM_TYPE: $scope.newopen ? "2" : "1"
                            }).then(function (data) {
                                if (data && data[0]) setStep(4);
                            });
                        }
                    }
                });
            });
        } else {
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
                            if (data[0][0].PAPER_SCORE >= 70) {
                                $scope.testResult(true);
                            } else {
                                $scope.testResult(false);
                            }
                        }
                    }
                }
            });
        }
    };

    $scope.cancel = function () {
        myConfirm("您确定要撤销创业板股票业务吗？", function () {
            kibhAccount.openGEMBoard({
                BUSINESS_ID: $scope.bizid,
                OPERATION_TYPE: "2",
                STKBD: accountmap[$scope.actno],
                TRDACCT: $scope.actno,
                CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                BUSI_LOG_NO: $scope.busilogno,
                GEM_TYPE: "1"
            }).then(function (data) {
                if (data && data[0]) myAlert("成功撤销创业板股票业务！", function () {
                    // 去掉新签创业板功能
                    $scope.newopen = false;
                    setStep(2);//setStep(0);
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
                            if (d.STKBD == "00") {
                                accountmap[d.TRDACCT] = d.STKBD;
                                d.STKBDNAME = getBlkName(d.STKBD) + " " + d.TRDACCT;
                                $scope.accountlist.push(d);
                            }
                        });
                        $scope.actno = $scope.accountlist[0].TRDACCT;
                    }
                });
                kibhSystem.getUserBizs({
                    BUSINESS_ID: $scope.bizid
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        if (data[0][0].STATUS == 0) {
                            setStep(4);
                        } else {
                            // 去掉新签创业板功能
                            $scope.newopen = false;
                            setStep(2);
                        }
                    }
                });
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