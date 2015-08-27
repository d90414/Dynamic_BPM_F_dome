'use strict';


module.exports = angular.module('ASS.directive.infoPrdsList', [])
    .directive('infoPrdsList', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/infoprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: 50,
                    currentpage: 1
                };
            }
        }
    }]);