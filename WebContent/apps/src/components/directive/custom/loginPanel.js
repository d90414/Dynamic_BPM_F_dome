'use strict';

module.exports = angular.module('ASS.directive.loginPanel', [])
    .directive('loginPanel', ['$rootScope', '$window', 'accountService', function ($rootScope, $window, accountService) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/loginPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if ('1' == $window.sessionStorage.isLogin) {
                    $rootScope.global.isLogin = true;
                    accountService.getLoginUserInfo().then(function (data) {
                        if (data && data[0] && data[0][0]) {
                            $rootScope.global.account = data[0][0];
                        }
                    });
                } else {
                    $rootScope.global.isLogin = false;
                }
            }
        }
    }]);