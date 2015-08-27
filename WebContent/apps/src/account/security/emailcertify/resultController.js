'use strict';

angular.module('ASS.account').controller('EmailCertifyResultCtrl', ['$rootScope', '$scope', '$window', '$state', '$stateParams', 'accountSafetyService', 'accountService',
    function ($rootScope, $scope, $window, $state, $stateParams, accountSafetyService, accountService) {

        $scope.result = '1';
        if (!$window.sessionStorage.sessionid && $stateParams.session_id) {
            $window.sessionStorage.sessionid = $stateParams.session_id;
        }

        accountSafetyService.checkEmail({
            safe_user_id: $stateParams.safe_user_id,
            safe_user_name: $stateParams.safe_user_name,
            safe_random_code: $stateParams.safe_random_code
        }).then(function (data) {
            if ($window.sessionStorage.sessionid) {
                $window.sessionStorage.isLogin = '1';
                $rootScope.global.isLogin = true;
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $rootScope.global.account = data[0][0];
                    }
                });
            }
            if (data && data[2]) {
                if (data[2].ANS_MSG_HDR.MSG_CODE && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                    $scope.result = '2';
                } else {
                    $scope.result = '-1';
                }
            }
        });

    }]);
