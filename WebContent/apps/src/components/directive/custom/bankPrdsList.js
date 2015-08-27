'use strict';

module.exports = angular.module('ASS.directive.bankPrdsList', [])
    .directive('bankPrdsList', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/bankprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: 50,
                    currentpage: 1
                };
            }
        }
    }]);