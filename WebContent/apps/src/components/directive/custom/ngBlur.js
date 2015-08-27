'use strict';

/*
 *
 */
module.exports = angular.module('ASS.directive.ngBlur', [])
    .directive('ngBlur', function ($document) {
        return {
            link: function (scope, element, attrs) {
                $(element).bind('blur', function (e) {
                    scope.$apply(attrs.ngBlur);
                });
            }
        }
    });