'use strict';

module.exports = angular.module('ASS.directive.gmjjNav', [])
    .directive('gmjjNav', ['$state', '$window', 'detailService', 'prdlistService', 'myAlert', function ($state, $window, detailService, prdlistService, myAlert) {
        return {
            restrict: "EAC",
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjNav.html',
            scope: true,
            link: function ($scope, $element, attrs, model) {
                $scope.showType = 1;

                $scope.quryObject = {
                    pro_id: attrs.proid,
                    startDate: (function () {
                        var temp = angular.copy(new Date());
                        temp.setMonth(temp.getMonth() - 6);
                        return temp;
                    })(),
                    endDate: new Date(),
                    trd_date: "",
                    cur_page: "",
                    ret_rows: ""
                };
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.openStartDate = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.startDateOpened = !$scope.startDateOpened;
                    $scope.endDateOpened = false;
                };
                $scope.openEndDate = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.endDateOpened = !$scope.endDateOpened;
                    $scope.startDateOpened = false;
                };

                // 查询历史净值下拉框选项
                var searchGmjj = function () {
                    if (attrs.partype == 'gmjj') {
                        prdlistService.getgmjjPrds({cur_page: -1}).then(function (data) {
                            $scope.gmjjListoption = data[0];
                        });
                    } else if (attrs.partype == 'zgcp') {
                        prdlistService.getzgcpPrds({cur_page: -1}).then(function (data) {
                            $scope.gmjjListoption = data[0];
                        });
                    }
                };
                searchGmjj();


                var preProId = $scope.quryObject.pro_id;
                $scope.searchFirst = function () {
                    if (!$scope.quryObject.startDate) {
                        myAlert("起始日期不能为空！");
                        return;
                    }
                    if (!$scope.quryObject.endDate) {
                        myAlert("结束日期不能为空！");
                        return;
                    }
                    if ($scope.quryObject.startDate.format("yyyyMMdd") > $scope.quryObject.endDate.format("yyyyMMdd")) {
                        $scope.quryObject.startDate = params.endDate;
                        myAlert("起始日期不能大于结束日期！");
                        return;
                    }

                    // 包含结束日期，因为接口不会包含，所以这里把结束日期改为下一天
                    var trd_date = "";
                    if ($scope.quryObject.startDate || $scope.quryObject.endDate) {
                        var endDate = (function () {
                            var temp = $scope.quryObject.endDate;
                            temp.setDate(temp.getDate() + 1);
                            return temp;
                        })();
                        trd_date = $scope.quryObject.startDate.format("yyyyMMdd") + "," + endDate.format("yyyyMMdd");
                    }
                    $scope.quryObject.trd_date = trd_date;

                    if (preProId && preProId != $scope.quryObject.pro_id) {
                        $window.sessionStorage.toNavTab = 'yes';
                        $state.go("kfps.detail", {"id": $scope.quryObject.pro_id, type: attrs.partype});
                        return;
                    }

                    search();
                };

                var search = function () {
                    detailService.getPrdPriceValue({
                        pro_id: $scope.quryObject.pro_id,
                        trd_date: $scope.quryObject.trd_date,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize,
                        order_by: ""
                    }).then(function (data) {
                        $scope.gmjjNav = data[0];
                        $scope.pagination.totalcount = data[1];
                    });
                };

                $scope.drawChart = function () {
                    var p = angular.copy($scope.quryObject);
                    p['cur_page'] = -1;
                    detailService.getPrdPriceValue(p).then(function (data) {
                        if (data[0]) {
                            var categories = [], nav = [], acc = [];
                            for (var i = data[0].length - 1; i >= 0; i--) {
                                categories.push(data[0][i].TRD_DATE);
                                nav.push(parseFloat(data[0][i].NAV_VAL));
                                acc.push(parseFloat(data[0][i].ACC_VAL));
                            }

                            var len = categories.length;
                            var positions = [],
                                increment = Math.floor((len - 1) / (len > 5 ? 4 : len - 1));
                            if (!isNaN(increment) && increment > 0) {
                                for (var tick = 0; tick <= len - 1; tick += increment) {
                                    positions.push(tick);
                                    if (positions.length == 4) {
                                        break;
                                    }
                                }
                            }
                            if (positions.length < 5) {
                                positions.push(len - 1);
                            }

                            var lines = [];
                            for (var i = 0; i < positions.length; i++) {
                                lines.push({
                                    color: '#D8D8D8',
                                    dashStyle: 'longdashdot',
                                    value: positions[i],
                                    width: 1
                                });
                            }

                            $('#container').highcharts({
                                credits: false,
                                title: null,
                                xAxis: {
                                    categories: categories,
                                    tickLength: 0,
                                    tickPositions: positions,
                                    plotLines: lines
                                },
                                yAxis: {
                                    title: {
                                        text: '净值 (元)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '元',
                                    shared: true,
                                    crosshairs: {
                                        color: 'green',
                                        width: 1
                                    }
                                },
                                legend: {
                                    verticalAlign: 'top'
                                },
                                series: [{
                                    name: '单位净值',
                                    data: nav
                                }, {
                                    name: '累计净值',
                                    data: acc
                                }]
                            });
                        }
                    });
                };
                $scope.drawChart();

                $scope.$watch("pagination.currentpage", function () {
                    if ($scope.pagination.currentpage <= 0) return;
                    search();
                });
            }
        }
    }]);
