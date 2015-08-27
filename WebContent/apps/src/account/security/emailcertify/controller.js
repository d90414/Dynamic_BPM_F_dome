'use strict';

angular.module('ASS.account').controller('EmailCertifyCtrl', ['$rootScope', '$scope', '$window', '$state', '$stateParams', 'accountSafetyService', 'myAlert',
    function ($rootScope, $scope, $window, $state, $stateParams, accountSafetyService, myAlert) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }

        $rootScope.global.myAccountMenu = "安全设置";

        $scope.tip = 1;

        $scope.step = 1;

        $scope.user = {};
        // 发送邮件
        $scope.submitForm = function () {
            $scope.tip = 2;
            accountSafetyService.sendEmail({
                mail_address: $scope.user.email
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                    $scope.tip = 3;
                    //$state.go("page.account.security.emailcertify.prompt", {email: $scope.user.email});
                    $scope.step = 2;
                } else {
                    $scope.tip = 1;
                }
            });
        };

        $scope.inputtedEmail = $stateParams.email;
        $scope.gotoEmailAddress = "";
        $scope.$watch("user.email", function () {
            if ($scope.user.email) {
                if ($scope.user.email.indexOf('hotmail') != -1) {
                    $scope.gotoEmailAddress = 'http://mail.live.com';
                } else {
                    //$scope.gotoEmailAddress = "http://mail." + $scope.inputtedEmail.split("@")[1];
                    $scope.gotoEmailAddress = "http://mail." + $scope.user.email.split("@")[1];
                }
            }
        });

        // 重新发送邮件
        $scope.resendBindingEmail = function () {
            accountSafetyService.sendEmail({
                mail_address: $scope.user.email
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                    myAlert('重新发送邮件成功！');
                    $scope.resended = true;
                    $scope.step = 2;
                    //$state.go("page.account.security.emailcertify.prompt", {email: $scope.inputtedEmail});
                }
            });
        };

        $scope.changeAnother = function () {
            $scope.user.email = '';
            $scope.tip = 1;
            $scope.step = 1;
        };

    }]);
