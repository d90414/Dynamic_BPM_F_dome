'use strict';

module.exports = angular.module('ASS.directive.slideAdvs', [])
    .directive('slideAdvs', ['adnotService', function (adnotService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/slideadvs.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                adnotService.getAdOrNote({
                    type: "1",
                    type_val: attrs.typeVal,
                    stat: "1",
                    cur_page: 1,
                    ret_rows: 6,
                    order_by: "ORDER_BY asc"
                }).then(function (data) {
                    $scope.slides = [];
                    for (var i = 0; i < data[0].length; i++) {
                        $scope.slides[i] = {
                            IMG: data[0][i].ATTR1_INFO ? data[0][i].ATTR1_INFO.split("|")[0] : "",
                            LINK: data[0][i].LINK
                        };
                    }
                });
            }
        }
    }]);