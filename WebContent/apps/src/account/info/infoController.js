'use strict';

angular.module('ASS.account').controller('InfoCtrl', ['$rootScope', '$scope', '$window', '$state', 'accountService', 'myAlert',
    function ($rootScope, $scope, $window, $state, accountService, myAlert) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }
        $rootScope.global.myAccountMenu = "个人资料";

        accountService.getLoginUserInfo().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.account = data[0][0];
            }
        });

        $scope.sex = ['男', '女', '其他'];

       

    }]);
