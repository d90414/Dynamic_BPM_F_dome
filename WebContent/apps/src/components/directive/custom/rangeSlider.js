'use strict';

module.exports = angular.module('ASS.directive.rangeSlider', [])
    .directive('rangeSlider', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            template: '<div id="slider"></div>',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
                var now = new Date();
                $("#slider").dateRangeSlider({
                    step: {
                        days: 1
                    },
                    bounds: {
                        min: (function () {
                            var before = angular.copy(now);
                            before.setFullYear(now.getFullYear() - 1);
                            return before;
                        })(),
                        max: now
                    },
                    defaultValues: {
                        min: (function () {
                            var before = angular.copy(now);
                            before.setMonth(now.getMonth() - 1);
                            return before;
                        })(),
                        max: now
                    },
                    scales: [
                        {
                            first: function (value) {
                                return value;
                            },
                            end: function (value) {
                                return value;
                            },
                            next: function (value) {
                                var next = new Date(value);
                                return new Date(next.setMonth(value.getMonth() + 1));
                            },
                            label: function (value) {
                                return months[value.getMonth()];
                            },
                            format: function (tickContainer, tickStart, tickEnd) {
                                tickContainer.addClass("myCustomClass");
                            }
                        }
                    ]
                });
            }
        }
    }]);