'use strict';

module.exports = angular.module('ASS.directive.gmjjPrds', [])
    .directive('gmjjPrds', ['exclusiveService', 'prdCommonService', function (exclusiveService, prdCommonService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjPrds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                $scope.prdsGroup = [];

                // 公募基金下小类: 股票型、混合型、债券型、货币型、指数型、保本型、QDII型

                // 股票型
                exclusiveService.getPrds({
                    pref_type: "3",
                    lvl2_type: "6",
                    pro_type: "399",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[0] = {
                            label: "股票型",
                            fastSold: data[0], // 销售最快，暂定简单取前八条数据
                            prd: data[0].slice(0, 3) // 图形展示，前3条数据
                        };
                    }
                });

                // 混合型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "400",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[1] = {
                            label: "混合型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 债券型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "401",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[2] = {
                            label: "债券型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 货币型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "403",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[3] = {
                            label: "货币型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 指数型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "404",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[4] = {
                            label: "指数型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 保本型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "405",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[5] = {
                            label: "保本型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // QDII型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "406",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[6] = {
                            label: "QDII型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

            }
        }
    }]);