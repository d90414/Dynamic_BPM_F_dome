'use strict';
module.exports = angular.module('ASS.directive.checkRePassWord', [])
    .directive('checkRePassWord', [ function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.checkRePassWord;

                elem.on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }]);