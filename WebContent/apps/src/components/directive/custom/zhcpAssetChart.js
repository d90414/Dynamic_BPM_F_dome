'use strict';

module.exports = angular.module('ASS.directive.zhcpAssetChart', [])
    .directive('zhcpAssetChart', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zhcpAssetChart.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                detailService.getZhcpAssetAllocation({
                    pack_pro_id: attrs.proid,
                    cur_page: -1
                }).then(function (data) {
                        var categories = [];

                        angular.forEach(data[0], function (item) {
                            var items = [];
                            items.push(item.SHT_NAME);
                            items.push(parseFloat(item.PRO_RATIO));
                            categories.push(items);
                        });

                        $('#container').highcharts({
                            credits: false,
                            chart: {
                                type: 'pie',
                                options3d: {
                                    enabled: true,
                                    alpha: 45
                                }
                            },
                            title: {
                                text: '组合内各资产配置',
                                style: {
                                    fontWeight: 'bold'
                                }
                            },
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
                                '#f15c80', '#e4d354', '#8085b8', '#8d4653', '#91e8e1',
                                '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a',
                                '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
                                '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
                            tooltip: {
                                valueSuffix: '%'
                            },
                            plotOptions: {
                                pie: {
                                    innerSize: 100,
                                    depth: 45
                                }
                            },
                            series: [
                                {
                                    name: '所占比例',
                                    data: categories
                                }
                            ]
                        });
                    }
                )

            }
        }
    }]);
