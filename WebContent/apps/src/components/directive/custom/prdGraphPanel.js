'use strict';

module.exports = angular.module('ASS.directive.prdGraphPanel', [])
    .directive('prdGraphPanel', [function () {
        return {
            restrict: "A",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/prdGraphPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4', 'bg-lvl5'];
                $scope.colorOfRiskLvl = ['color-lvl0', 'color-lvl1', 'color-lvl2', 'color-lvl3', 'color-lvl4', 'color-lvl5'];
                $scope.img = attrs.img;
                $scope.cols = attrs.cols;
            }
        };
    }]);
