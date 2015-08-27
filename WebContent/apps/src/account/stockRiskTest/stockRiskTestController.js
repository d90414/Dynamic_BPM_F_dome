'use strict';

angular.module('ASS.stockRiskTest').controller('stockRiskTestCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$localStorage', 'accountService', 'myAlert',
    function ($rootScope, $scope, $state, $stateParams, $localStorage, accountService, myAlert) {

        $rootScope.global.myAccountMenu = '风险评测';

        var paperno = $stateParams.paperno;

        var getHistory = function () {
            accountService.getRiskResult({
                SURVEY_CLS: "0"
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.riskResult = data[0][0];
                    angular.forEach(data[0], function (item) {
                        if (item.RATING_DATE > $scope.riskResult.RATING_DATE) {
                            $scope.riskResult = item;
                        }
                    })
                }
            });
        };


        var getTestInfo = accountService.getTestInfo({
            BUSINESS_ID: '1024',
            EXTERNAL_PAPER_NO: paperno
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.testInfo = data[0][0];
                getQuestions($scope.testInfo.PAPER_ID);
            }
        });

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
            accountService.getAnswers({
                PAPER_ID: id
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    sortAnswers(data[0]);
                }
            });
        };

        var getQuestions = function (id) {
            accountService.getQuestions({
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

        $scope.submit = function () {
            var answerres = "";
            $("input:radio").each(function () {
                if (this.checked) {
                    answerres += $(this).attr("answerres");
                    answerres += "@@@";
                }
            });
            accountService.saveTestInfo({
                BUSINESS_ID: $scope.bizid,
                BUSI_LOG_NO: $scope.busilogno,
                PAPER_ID: $scope.testInfo.PAPER_ID,
                ANSWER_RES: answerres.substring(0, answerres.length - 3)
            }).then(function (data) {
                if (data && data.length > 0 && data[2] && data[2].ANS_MSG_HDR) {
                    $scope.hideHistory = true;
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        if (data[0] && data[0].length > 0) {
                            if ($rootScope.beforeRiskTestUrl) {
                                $scope.back();
                            } else {
                                //$scope.score = data[0][0].PAPER_SCORE;
                                //$scope.scorelevel = data[0][0].LEVEL_NAME;
                                $scope.step = 1;
                                getHistory();
                            }
                        }
                    }
                }
            });
        };

        $scope.back = function () {
            var url = $rootScope.beforeRiskTestUrl;
            $rootScope.beforeRiskTestUrl = null;
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

        $scope.isLoading = true;
        accountService.getLoginUserInfo().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.account = data[0][0];

                if (!$scope.global.account.PHONE_NO) {
                    $scope.showType = '-01';
                    $scope.isLoading = false;
                    return;
                } else if (!$scope.global.account.FUNDSACCT_CODE_VIEW) {
                    $scope.showType = '-02';
                    $scope.isLoading = false;
                    return;
                } else if ('3' != $scope.global.account.LOGIN_TYPE) {
                    $localStorage.loginByFund = true;
                    $scope.showType = '-03';
                    $scope.isLoading = false;
                    return;
                } else {
                    $scope.showType = '1';

                    if (!$rootScope.beforeRiskTestUrl) {
                        getHistory();
                    }

                    getTestInfo();
                }
            }
        });
    }]);