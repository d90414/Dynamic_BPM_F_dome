'use strict';

angular.module('ASS.fundRiskTest').controller('fundRiskTestCtrl', ['$scope', '$state', '$stateParams', '$localStorage', 'kibhSystem', function ($scope, $state, $stateParams, $localStorage, kibhSystem) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";

    kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
        $scope.busilogno = data[0][0].BUSI_LOG_NO;
        kibhSystem.getTestInfo({
            BUSINESS_ID: $scope.bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.testInfo = data[0][0];
                getQuestions($scope.testInfo.PAPER_ID);
            }
        });
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
        kibhSystem.saveTestInfo({
            BUSINESS_ID: $scope.bizid,
            BUSI_LOG_NO: $scope.busilogno,
            PAPER_ID: $scope.testInfo.PAPER_ID,
            ANSWER_RES: answerres.substring(0, answerres.length - 3)
        }).then(function (data) {
            if (data && data.length > 0 && data[2] && data[2].ANS_MSG_HDR) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    if (data[0] && data[0].length > 0) {
                        $scope.score = data[0][0].PAPER_SCORE;
                        $scope.scorelevel = data[0][0].LEVEL_NAME;
                        $scope.step = 1;
                    }
                }
            }
        });
    };

    // 兼容IE
    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 8) {
            $scope.isIE8 = true;
        }
    });
}]);