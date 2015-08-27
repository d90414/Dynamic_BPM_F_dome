'use strict';

module.exports = angular.module('ASS.directive.infoTitle', [])
    .directive('infoTitle', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/infotitle.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.featuredlist = [
                    {level: "2", name1: "首页", name2: "全部资讯产品"}
                ];
            }
        }
    }]);