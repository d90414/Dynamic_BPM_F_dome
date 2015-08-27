'use strict';

var moneyDivide = angular.module('ASS.filter.moneyDivide', [])
    .filter('moneyDivide', function () {
        return function (input, params) {
            if (input) {
                if (input.indexOf(".") == 0) {
                    input = "0" + input;
                }
                var position = params ? params : 3, toDivide = input, toSave = "", index = input.indexOf(".");
                if (index >= 0) {
                    toDivide = input.substring(0, index);
                    toSave = input.substring(index);
                }
                for (var i = toDivide.length - position; i > 0; i = i - position) {
                    if (i == 1 && isNaN(toDivide.charAt(0))) break;
                    toDivide = toDivide.substring(0, i) + "," + toDivide.substring(i);
                }
                return toDivide + toSave;
            }
        }
    });

module.exports = moneyDivide;
