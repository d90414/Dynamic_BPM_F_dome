'use strict';

module.exports = angular.module('ASS.directive.zgPrds', [])
    .directive('zgPrds', ['exclusiveService', 'prdCommonService', function (exclusiveService, prdCommonService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zgprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                exclusiveService.getPrds({
                    pref_type: "3",
                    lvl2_type: "4",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.fastSoldPrds = data[0]; // 销售最快，暂定简单取前八条数据
                        $scope.prds = data[0].slice(0, 3); // 图形展示，前3条数据
                    }
                });
            }
        }
    }]);