'use strict';

module.exports = angular.module('ASS.directive.accountTopbar', [])
    .directive('accountTopbar', [function () {
        return {
            restrict: "A",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/accountTopbar.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
            }
        };
    }]);