'use strict';

angular.module('ASS.pwrecovery').controller('PwrecoveryCtrl', ['$scope', '$interval', '$stateParams', 'pwrecoveryService', '$window', function ($scope, $interval, $stateParams, pwrecoveryService, $window) {
    $scope.codeflag = 1;
    $scope.submitting = false;
    $scope.checktype = 1;
    $scope.clock = 120;
    $scope.user = [];
    $scope.uid = $stateParams.uid ? $stateParams.uid : "";
    $scope.rtxt = $stateParams.rtxt ? $stateParams.rtxt : "";
    if ($scope.uid != "" && $scope.uid != "undefined" && $scope.uid.length > 1) {
        pwrecoveryService["checkURLByEmail"]($scope.uid, $scope.rtxt).then(function (data) {
            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                $window.sessionStorage.safe_id = data[0][0].SAFE_USER_ID;
                $scope.user['safe_user_id'] = data[0][0].SAFE_USER_ID;
                window.location.href = "#/auth/repwset";
            } else {
                window.location.href = "#/auth/repwstart";
            }

        });
    }

    $scope.getcode = function () {
        $scope.codeflag = 2;
        try {
            pwrecoveryService["getReCode"]($scope.user.mobile).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.user['code_id'] = data[0][0].CODE_ID;
                    $scope.clock = 120;
                    $scope.codeflag = 3;
                    var clock = $interval(function () {
                        $scope.clock--;
                        if ($scope.clock == 0) {
                            $scope.codeflag = 1;
                            clearInterval(clock);
                        }
                    }, 1000);
                } else {
                    $scope.codeflag = 1;
                }
            });
        } catch (e) {
            $scope.codeflag = 1;
        }
    };

    /*用户验证下一步*/
    $scope.signup = function () {
        $scope.submitting = true;
        pwrecoveryService["checkMobile"]($scope.user).then(function (data) {
            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                $window.sessionStorage.safe_id = data[0][0].SAFE_USER_ID;
                $scope.user['safe_user_id'] = data[0][0].SAFE_USER_ID;
                $scope.submitting = false;
                window.location.href = "#/auth/repwset";
            } else {
                $scope.submitting = false;
                $scope.user.code = "";
            }

        });
    };
    /*发送邮件*/
    $scope.sendEmail = function () {
        $scope.submitting = true;
        pwrecoveryService["sendEmail"]($scope.user.email).then(function (data) {
            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                window.location.href = "#/auth/sendemailsuccess";
            } else {
                $scope.submitting = false;
            }
        });
    };
    /*重置密码下一步 手机*/
    $scope.updatepw = function () {
        $scope.submitting = true;
        $scope.user['safe_user_id'] = $window.sessionStorage.safe_id;
        pwrecoveryService["updatepw"]($scope.user).then(function (data) {
            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                $scope.submitting = false;
                window.location.href = "#/auth/repwsuccess";
            } else {
                $scope.submitting = true;
            }

        });
    };

    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 9) {
            if ($.browser.version <= 8) {
                $('label').removeClass('i-checks i-checks-sm i-checks-lg');
            }
            // Invoke the plugin
            $('input, textarea').placeholder();
        }
    });
}]);
