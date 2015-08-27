'use strict';

module.exports = angular.module('ASS.directive.gmjjComgroup', [])
    .directive('gmjjComgroup', ['$http', 'detailService', function ($http, detailService) {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjComgroup.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {

                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                //var COMB_CLASS_DESC = {
                //    1: '报告期末基金资产组合情况',
                //    2: '报告期末按行业分类的股票投资组合',
                //    3: '报告期末按公允价值占基金资产净值比例大小排序的前10名股票投资明细'
                //};

                var search = function () {
                    detailService.getAssetAllocation({
                        pro_id: attrs.proid,
                        cur_page: '-1',
                        ret_rows: '',
                        order_by: ''
                    }).then(function (data) {
                        if (data && data[0]) {
                            $scope.assetAllocation = {
                                '1': {
                                    total: {
                                        comb_type: '100',
                                        val: {}
                                    },
                                    list: []
                                },
                                '2': {
                                    total: {
                                        comb_type: '1',
                                        val: {}
                                    },
                                    list: []
                                },
                                '3': {
                                    list: []
                                }
                            };
                            for (var i = 0; i < data[0].length; i++) {
                                if (data[0][i].COMB_CLASS) {
                                    if (!$scope.assetAllocation[data[0][i].COMB_CLASS]) $scope.assetAllocation[data[0][i].COMB_CLASS] = [];

                                    if ($scope.assetAllocation[data[0][i].COMB_CLASS].total
                                        && (data[0][i].COMB_TYPE == $scope.assetAllocation[data[0][i].COMB_CLASS].total.comb_type || '合计' == data[0][i].COMB_TYPE_DESC)) {
                                        $scope.assetAllocation[data[0][i].COMB_CLASS].total.val = data[0][i];
                                    } else {
                                        $scope.assetAllocation[data[0][i].COMB_CLASS].list.push(data[0][i]);
                                    }
                                }
                            }
                        }

                    });
                };

                search();
            }
        }
    }]);
