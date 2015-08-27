'use strict';

module.exports = angular.module('ASS.filter.escapeSequence', [])
    .filter('escapeSequence', function () {
        return function (input) {
            var esc = [{
                real: ' ',
                esc: '&nbsp;'
            }, {
                real: '<',
                esc: '&lt;'
            }, {
                real: '>',
                esc: '&gt;'
            }, {
                real: '&',
                esc: '&amp;'
            }, {
                real: '"',
                esc: '&quot;'
            }, {
                real: '<br>',
                esc: '\r'
            }];
            if (input) {
                var output = input;
                for (var i = 0; i < esc.length; i++) {
                    output = output.replace(new RegExp(esc[i].esc, 'g'), esc[i].real);
                }
                return output;
            }
        }
    });