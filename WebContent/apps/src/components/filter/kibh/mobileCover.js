'use strict';

var mobileCover = angular.module('ASS.filter.mobileCover', [])
    .filter('mobileCover', function () {
        return function (input, param1, param2) {
            if (input) {
                var head = "", cover = input, tail = "";
                if (param2) {
                    head = input.substring(0, param1);
                    cover = input.substring(param1, input.length - param2);
                    tail = input.substring(input.length - param2);
                } else if (param1) {
                    head = input.substring(0, param1);
                    cover = input.substring(param1);
                }
                cover = cover.replace(/[0-9]/g, "*");
                return head + cover + tail;
            }
        }
    });

module.exports = mobileCover;
