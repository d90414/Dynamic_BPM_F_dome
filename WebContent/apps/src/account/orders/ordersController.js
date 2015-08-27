'use strict';

angular.module('ASS.account').controller('OrdersCtrl', ['$rootScope', '$scope', '$window', '$state', '$stateParams', '$localStorage', '$modal', 'accountService', 'myAlert', 'myConfirm',
    function ($rootScope, $scope, $window, $state, $stateParams, $localStorage, $modal, accountService, myAlert, myConfirm) {
        if (!$window.sessionStorage.sessionid) {
            $state.go('auth.login');
            return;
        }

        $rootScope.global.myAccountMenu = '我的订单';

        $scope.orders = {
            tobePaidOrders: {
                trd_sta: '1',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                refreshed: false,
                showHierarchy: true,
                active: false
            },
            acceptedOrders: {
                trd_sta: '4',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                refreshed: false,
                showHierarchy: true,
                active: false
            },
            processedOrders: {
                trd_sta: '5',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                refreshed: false,
                showHierarchy: false,
                active: false
            },
            canceledOrders: {
                trd_sta: '6',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                refreshed: false,
                showHierarchy: false,
                active: false
            },
            failedToPayOrders: {
                trd_sta: '3',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                refreshed: false,
                showHierarchy: true,
                active: false
            }
        };

        var now = new Date();
        var getStartDate = function (howManyMonthsAgo) {
            var before = angular.copy(now);
            before.setMonth(now.getMonth() - howManyMonthsAgo);
            return before;
        };
        var lastMonthStart = getStartDate(1);
        var last3MonthsStart = getStartDate(3);
        var lastYearStart = getStartDate(12);
        var overOneYearAgoStart = getStartDate(24);
        var overOneYearAgoEnd = getStartDate(12);

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

        $scope.dateRangeOptions = [{
            'key': '0',
            'value': '今天',
            selected: false,
            dateRange: {
                startDate: now,
                endDate: now
            }
        }, {
            'key': '1',
            'value': '最近一个月',
            selected: false,
            dateRange: {
                startDate: lastMonthStart,
                endDate: now
            }
        }, {
            'key': '2',
            'value': '3个月',
            selected: false,
            dateRange: {
                startDate: last3MonthsStart,
                endDate: now
            }
        }, {
            'key': '3',
            'value': '1年',
            selected: false,
            dateRange: {
                startDate: lastYearStart,
                endDate: now
            }
        }, {
            'key': '4',
            'value': '1年前',
            selected: false,
            dateRange: {
                startDate: overOneYearAgoStart,
                endDate: overOneYearAgoEnd
            }
        }];

        var hasSelected = false;

        $scope.select = function (index, justRender) {
            for (var i = 0; i < $scope.dateRangeOptions.length; i++) {
                $scope.dateRangeOptions[i].selected = false;
            }
            $scope.dateRangeOptions[index].selected = true;
            if (!justRender) {
                $scope.condition.startDate = $scope.dateRangeOptions[index].dateRange.startDate;
                $scope.condition.endDate = $scope.dateRangeOptions[index].dateRange.endDate;
                $scope.doAgain(true);
            }
            hasSelected = true;
        };

        var months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        var drawSlider = function () {
            $('#slider').dateRangeSlider({
                step: {
                    days: 1
                },
                bounds: {
                    min: (function () {
                        var before = angular.copy(now);
                        before.setFullYear(now.getFullYear() - 2);
                        return before;
                    })(),
                    max: now
                },
                defaultValues: {
                    min: $scope.condition.startDate,
                    max: $scope.condition.endDate
                },
                scales: [{
                    first: function (value) {
                        return value;
                    },
                    end: function (value) {
                        return value;
                    },
                    next: function (value) {
                        var next = new Date(value);
                        return new Date(next.setMonth(value.getMonth() + 1));
                    },
                    label: function (value) {
                        return months[value.getMonth()];
                        return value;
                    },
                    format: function (tickContainer, tickStart, tickEnd) {
                        tickContainer.addClass('myCustomClass');
                    }
                }]
            });
            $('#slider').dateRangeSlider('values', $scope.condition.startDate, $scope.condition.endDate);
        };
        $('#slider').on('userValuesChanged', function (e, data) {
            $scope.condition = $scope.condition || {};
            $scope.condition.startDate = data.values.min;
            $scope.condition.endDate = data.values.max;
            $scope.doAgain(true);
        });

        $scope.currentPageOrders = [];
        $scope.getOrdersByPageNum = function () {
            if (!$window.sessionStorage.sessionid) {
                myAlert('会话已过期，您需要重新登录');
                $state.go('auth.login');
            } else {
                $scope.currentPageOrders = [];
                var orders = $scope.orders[$scope.showTab].list;
                $scope.pagination.totalcount = orders.length;
                if ($scope.orders[$scope.showTab].showHierarchy) {
                    var start = ($scope.pagination.currentpage - 1) * $scope.pagination.pagesize;
                    var end = $scope.pagination.currentpage * $scope.pagination.pagesize;
                    $scope.currentPageOrders = orders.slice(start, end);
                } else {
                    var parentIndex = {}; // 存储父订单在currentPageOrders中的索引
                    for (var i = 0; i < orders.length; i++) {
                        if (!orders[i].TRD_SNO) {
                            if (!parentIndex[orders[i].APP_SNO]) {
                                $scope.currentPageOrders.push(orders[i]);
                                parentIndex[orders[i].APP_SNO] = $scope.currentPageOrders.length - 1;
                            }
                        } else {
                            if (!parentIndex[orders[i].TRD_SNO]) {
                                parentIndex[orders[i].TRD_SNO] = $scope.currentPageOrders.length;
                            }
                            if (!$scope.currentPageOrders[parentIndex[orders[i].TRD_SNO]]) {
                                $scope.currentPageOrders[parentIndex[orders[i].TRD_SNO]] = {
                                    APP_SNO: orders[i].TRD_SNO,
                                    SHT_NAME: orders[i].SHT_NAME,
                                    BUY_MONEY: orders[i].BUY_MONEY,
                                    APP_DATE: orders[i].APP_DATE,
                                    TRD_STA: orders[i].TRD_STA,
                                    TRD_STA_DESC: orders[i].TRD_STA_DESC,
                                    PAY_WAY_DESC: orders[i].PAY_WAY_DESC
                                }
                            } else {
                                $scope.currentPageOrders[parentIndex[orders[i].TRD_SNO]].SHT_NAME = $scope.currentPageOrders[parentIndex[orders[i].TRD_SNO]].SHT_NAME + ', ' + orders[i].SHT_NAME;
                            }
                            $scope.currentPageOrders[parentIndex[orders[i].TRD_SNO]]['subOrders'] = $scope.currentPageOrders[parentIndex[orders[i].TRD_SNO]]['subOrders'] || [];
                            $scope.currentPageOrders[parentIndex[orders[i].TRD_SNO]]['subOrders'].push(orders[i]);
                        }
                    }
                    // 只有一个子订单，则不显示父订单
                    for (var i = 0; i < $scope.currentPageOrders.length; i++) {
                        if ($scope.currentPageOrders[i].subOrders && $scope.currentPageOrders[i].subOrders.length == 1) {
                            $scope.currentPageOrders[i] = $scope.currentPageOrders[i].subOrders[0];
                        }
                    }
                }
            }
        };

        $scope.showType = '1';
        $scope.refresh = function () {
            $scope.isLoading = true;
            $scope.currentPageOrders = [];
            if (!$window.sessionStorage.sessionid) {
                myAlert('会话已过期，您需要重新登录');
                $state.go('auth.login');
            } else {
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $scope.account = data[0][0];

                        if (!$scope.global.account.PHONE_NO) {
                            $scope.showType = '-01';
                            $scope.isLoading = false;
                            return;
                        } else if (!$scope.global.account.FUNDSACCT_CODE_VIEW) {
                            $scope.showType = '-02';
                            $scope.isLoading = false;
                            return;
                        } else if ('3' != $scope.global.account.LOGIN_TYPE) {
                            $localStorage.loginByFund = true;
                            $scope.showType = '-03';
                            $scope.isLoading = false;
                            return;
                        } else {
                            $scope.showType = '1';
                            $scope.currentPageOrders = [];
                            $scope.pagination.totalcount = 0;

                            $scope.orders[$scope.showTab].refreshed = true;
                            accountService.getOrders({
                                trd_sno: $scope.condition.trd_sno,
                                trd_sta: $scope.orders[$scope.showTab].trd_sta,
                                start_date: $scope.condition.startDate.format('yyyyMMdd'),
                                end_date: $scope.condition.endDate.format('yyyyMMdd'),
                                cur_page: -1,
                                ret_rows: $scope.pagination.pagesize,
                                order_by: 'APP_DATE desc'
                            }).then(function (data) {
                                $scope.isLoading = false;
                                if (data[0]) {
                                    $scope.orders[$scope.showTab].list = data[0];
                                    $scope.orders[$scope.showTab].totalCount = data[0].length;
                                    $scope.orders[$scope.showTab].checkedCount = 0;
                                    $scope.orders[$scope.showTab].allChecked = false;
                                    //$scope.orders[$scope.showTab].refreshed = true;
                                    $scope.pagination.totalcount = data[0].length;

                                    $scope.currentPageOrders = data[0].slice(0, $scope.pagination.pagesize);
                                } else {
                                    $scope.currentPageOrders = [];
                                    $scope.pagination.totalcount = 0;
                                }
                            });
                        }
                    }
                });
            }
        };

        $scope.doAgain = function (forceRefresh) {
            if (forceRefresh) {
                $scope.refresh();
            } else {
                $scope.getOrdersByPageNum();
            }

            for (var i = 0; i < $scope.dateRangeOptions.length; i++) {
                if ($scope.dateRangeOptions[i].dateRange.startDate <= $scope.condition.startDate
                    && $scope.dateRangeOptions[i].dateRange.endDate >= $scope.condition.endDate) {
                    $scope.select(i, true);
                    break;
                }
            }
            drawSlider();
        };

        $scope.pagination = {
            pagesize: 10,
            totalcount: -1,
            currentpage: 1
        };
        $scope.$watch('pagination.currentpage', function () {
            $scope.doAgain(false);
        });

        $scope.condition = {
            trd_sno: '',
            startDate: $scope.dateRangeOptions[1].dateRange.startDate,
            endDate: $scope.dateRangeOptions[1].dateRange.endDate
        };

        $scope.$watch('condition', function () {
            if (!$scope.condition.startDate) {
                myAlert("起始日期不能为空！");
                return;
            } else if (!$scope.condition.endDate) {
                myAlert("结束日期不能为空！");
                return;
            } else if ($scope.condition.endDate > new Date()) {
                myAlert("结束日期不能大于当前日期！");
                return;
            } else if ($scope.condition.startDate.format("yyyyMMdd") > $scope.condition.endDate.format("yyyyMMdd")) {
                myAlert("起始日期不能大于结束日期！");
                return;
            } else {
                for (var key in $scope.orders) {
                    $scope.orders[key].refreshed = false;
                }
                $scope.doAgain(true);
            }
        }, true);

        $scope.showTab = $stateParams.order_type || 'tobePaidOrders';
        $scope.orders[$scope.showTab].active = true;
        $scope.changeTab = function (whichTab) {
            $stateParams.order_type = whichTab;
            $scope.showTab = whichTab;
            $scope.pagination.currentpage = 1;
            $scope.refresh();
        };

        $scope.check = function (items, index) {
            if (!items.checkedCount || isNaN(items.checkedCount)) {
                items.checkedCount = 0;
            }
            items[index].checked ? (items.checkedCount > 0 ? items.checkedCount-- : '') : items.checkedCount++;
            items.allChecked = (items.checkedCount == items.length ? true : false);
        };

        $scope.checkAll = function (items) {
            if (items.allChecked) {
                for (var i = 0; i < items.length; i++) {
                    items[i].checked = false;
                }
                items.checkedCount = 0;
                items.allChecked = false;
            } else {
                for (var i = 0; i < items.length; i++) {
                    items[i].checked = true;
                }
                items.checkedCount = items.length;
                items.allChecked = true;
            }
        };

        $scope.deleteSingleOrder = function (order) {
            if (!$window.sessionStorage.sessionid) {
                myAlert('会话已过期，您需要重新登录');
                $state.go('auth.login');
            } else {
                myConfirm('确定删除这个订单吗？', function () {
                    accountService.deleteOrders({
                        app_sno: order.APP_SNO
                    }).then(function (data) {
                        if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                            myAlert('删除成功');
                            for (var i = 0; i < $scope.orders.length; i++) {
                                $scope.orders[i].refreshed = false;
                            }
                            $scope.doAgain(true);
                        }
                    });
                });
            }
        };
        $scope.cancelSingleOrder = function (order) {
            if (!$window.sessionStorage.sessionid) {
                myAlert('会话已过期，您需要重新登录');
                $state.go('auth.login');
            } else {
                myConfirm('确定撤销这个订单吗？', function () {
                    accountService.cancelOrders(order).then(function (data) {
                        if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                            myAlert('撤单成功');
                            for (var i = 0; i < $scope.orders.length; i++) {
                                $scope.orders[i].refreshed = false;
                            }
                            $scope.doAgain(true);
                        }
                    });
                });
            }
        };

        $scope.deleteOrders = function (items) {
            if (!$window.sessionStorage.sessionid) {
                myAlert('会话已过期，您需要重新登录');
                $state.go('auth.login');
            } else {
                var ordersToDel = [];
                if (angular.isArray(items)) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].checked) {
                            ordersToDel.push(items[i].APP_SNO);
                        }
                    }
                } else {
                    ordersToDel.push(items.APP_SNO);
                }
                myConfirm('确定删除所选的' + ordersToDel.length + '个订单吗？', function () {
                    accountService.deleteOrders({
                        app_sno: ordersToDel.join(',')
                    }).then(function (data) {
                        if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                            myAlert('删除成功');
                            for (var i = 0; i < $scope.orders.length; i++) {
                                $scope.orders[i].refreshed = false;
                            }
                            $scope.doAgain(true);
                        }
                    });
                });
            }
        };

        $scope.pay = function (order) {
            if (!$window.sessionStorage.sessionid) {
                myAlert('会话已过期，您需要重新登录');
                $state.go('auth.login');
            } else {
                $window.sessionStorage.orderNo = order.TRD_SNO;
                $state.go('kfps.orderpay');
            }
        };

        $scope.$on('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $scope.isIE = true;
                    $('label').removeClass('i-checks i-checks-sm i-checks-lg');
                }
                $('input, textarea').placeholder();
            }
        });
    }])
;
