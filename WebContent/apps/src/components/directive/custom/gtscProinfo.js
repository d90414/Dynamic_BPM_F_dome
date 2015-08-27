'use strict';

module.exports = angular.module('ASS.directive.gtscProinfo', [])
    .directive('gtscProinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gtscProinfo.html',
            // scope:{}, 使用父控制器scope
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);
