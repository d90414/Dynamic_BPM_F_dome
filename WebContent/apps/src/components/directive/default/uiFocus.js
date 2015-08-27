'use strict';

var uiFocus = angular.module('ASS.directive.uiFocus', [])
    .directive('uiFocus', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            link: function (scope, element, attr) {
                var model = $parse(attr.uiFocus);
                scope.$watch(model,
                    function (value) {
                        if (value === true) {
                            $timeout(function () {
                                element[0].focus()
                            })
                        }
                    })
            }
        }
    }]);

module.exports = uiFocus;
