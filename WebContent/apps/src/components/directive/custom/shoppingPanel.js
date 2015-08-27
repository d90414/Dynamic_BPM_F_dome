'use strict';

module.exports = angular.module('ASS.directive.shoppingPanel', [])
    .directive('shoppingPanel', ['$rootScope', '$window', 'scartService', function ($rootScope, $window, scartService) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/shoppingPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if ($window.sessionStorage.sessionid) {
                    scartService.getScart().then(function (data) {
                        if ($window.sessionStorage.shoppinglist) {
                            if (data[0] && data[0].length > 0) {
                                var shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                                $window.sessionStorage.shoppinglist = JSON.stringify($rootScope.bj(shoppinglist, data[0], ["user_id", "CREATE_TIME"]));
                            }
                        } else {
                            if (data[0] && data[0].length > 0) {
                                $window.sessionStorage.shoppinglist = JSON.stringify(data[0]);
                            }
                        }
                        $rootScope.updateShoppingTip(true);
                    });
                } else {
                    $rootScope.updateShoppingTip(true);
                }
            }
        }
    }]);