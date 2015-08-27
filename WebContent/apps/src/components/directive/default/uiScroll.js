'use strict';

var uiScroll = angular.module('ASS.directive.uiScroll', [])
    .directive('uiScroll', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click',
                    function (e) {
                        $location.hash(attr.uiScroll);
                        $anchorScroll()
                    })
            }
        }
    }]);

module.exports = uiScroll;
