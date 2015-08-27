'use strict';

module.exports = angular.module('ASS.directive.zgcpProinfo', [])
    .directive('zgcpProinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zgcpProinfo.html',
            // scope:{}, 使用父控制器scope
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);
