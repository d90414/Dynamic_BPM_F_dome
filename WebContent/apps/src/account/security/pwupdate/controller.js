'use strict';

angular.module('ASS.account').controller('PasswordUpdateCtrl', ['$rootScope', '$scope', '$window', '$state', 'accountService', 'accountSafetyService', 'myAlert',
    function ($rootScope, $scope, $window, $state, accountService, accountSafetyService, myAlert) {
        if (!$window.sessionStorage.sessionid) {
            $state.go('auth.login');
            return;
        }

        $rootScope.global.myAccountMenu = '安全设置';

        $scope.auth = {
            forbidPwUpdate: false
        };

        $scope.showType = '-1';

        accountService.getLoginUserInfo().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.account = data[0][0];
                if (!$scope.account.USER_ID) {
                    $scope.auth.forbidPwUpdate = true;
                    $scope.showType = '-01';
                } else {
                    $scope.showType = '1'
                }
            }
        });

        $scope.user = {
            old_pwd: '',
            first_pwd: ''
        };
        $scope.submitted = false;
        $scope.submitForm = function () {
            if (!$window.sessionStorage.sessionid) {
                myAlert('会话已过期，您需要重新登录');
            } else {
                if ($scope.myForm.$valid) {
                    accountSafetyService.updatePassword({
                        old_pwd: $scope.user.old_pwd,
                        first_pwd: $scope.user.first_pwd
                    }).then(function (data) {
                        if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                            $state.go('page.account.security.pwupdate.success')
                        }
                    })
                } else {
                    $scope.myForm.submitted = true;
                }
            }
        };

        $scope.clearConfirmPwd = function() {
          $scope.user.second_pwd = "";
            $scope.myForm.$valid = false;
        };

    }]);
