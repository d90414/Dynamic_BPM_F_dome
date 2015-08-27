'use strict';

module.exports = angular.module('ASS.directive.gmjjManinfo', [])
    .directive('gmjjManinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjManinfo.html',
            scope: true,
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);
