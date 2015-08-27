'use strict';

angular.module('ASS.account').controller('AccountCtrl', ['$scope', '$rootScope', '$stateParams', '$window', '$state', 'accountService',
    function ($scope, $rootScope, $stateParams, $window, $state, accountService) {

        accountService.getLoginUserInfo().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $rootScope.global.account = data[0][0];
            }
        });

    }]);

