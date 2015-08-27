'use strict';

var setNgAnimate = angular.module('ASS.directive.setNgAnimate', [])
    .directive('setNgAnimate', ['$animate', function ($animate) {
        return {
            link: function ($scope, $element, $attrs) {
                $scope.$watch(function () {
                        return $scope.$eval($attrs.setNgAnimate, $scope)
                    },
                    function (valnew, valold) {
                        $animate.enabled(!!valnew, $element)
                    })
            }
        }
    }]);

module.exports = setNgAnimate;
