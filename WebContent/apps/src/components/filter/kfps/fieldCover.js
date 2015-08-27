'use strict';

var fieldCover = angular.module('ASS.filter.fieldCover', [])
    .filter('fieldCover', function () {
        return function (input, params) {
            if (input) {
                var toShow = "", toCover = input;
                if (params) {
                    if (input.length >= params) {
                        toShow = input.substring(0, input.length - params);
                        toCover = input.substring(input.length - params);
                    }
                }
                toCover = toCover.replace(/./g, "*");
                return toShow + toCover;
            }
        }
    });

module.exports = fieldCover;
