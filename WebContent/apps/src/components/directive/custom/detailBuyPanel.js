'use strict';

module.exports = angular.module('ASS.directive.detailBuyPanel', [])
    .directive('detailBuyPanel', [function () {
        return {
            restrict: "EAC",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/detailBuyPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
            }
        };
    }]);
