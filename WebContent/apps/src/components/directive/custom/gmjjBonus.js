'use strict';

module.exports = angular.module('ASS.directive.gmjjBonus', [])
    .directive('gmjjBonus', ['$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjBonus.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                $scope.pagination1 = {
                    pagesize: 12,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.pagination2 = {
                    pagesize: 12,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.$watch("pagination1.currentpage", function () {
                    if ($scope.pagination1.currentpage <= 0) return;
                    search1();
                });

                $scope.$watch("pagination2.currentpage", function () {
                    if ($scope.pagination2.currentpage <= 0) return;
                    search2();
                });

                // 分红
                var search1 = function () {
                    detailService.getPrdBonus({
                        pro_id: attrs.proid,
                        qry_type: "0",
                        cur_page: $scope.pagination1.currentpage,
                        ret_rows: $scope.pagination1.pagesize
                    }).then(function (data) {
                        $scope.gmjjDiv = data[0];
                        $scope.pagination1.totalcount = data[1];
                    });
                };

                // 拆分
                var search2 = function () {
                    detailService.getPrdBonus({
                        pro_id: attrs.proid,
                        qry_type: "1",
                        cur_page: $scope.pagination2.currentpage,
                        ret_rows: $scope.pagination2.pagesize
                    }).then(function (data) {
                        $scope.gmjjBonus = data[0];
                        $scope.pagination2.totalcount = data[1];
                    });
                };

            }
        }
    }]);
