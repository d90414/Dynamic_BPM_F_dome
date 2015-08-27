'use strict';

module.exports = angular.module('ASS.directive.messagePanel', [])
    .directive('messagePanel', ['$rootScope', '$window', function ($rootScope, $window) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/messagePanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if ($window.sessionStorage.sessionid) {
                    $rootScope.getNoReadMessages();
                }
            }
        }
    }]);