'use strict';

angular.module('ASS.account').controller('FavoritesCtrl', ['$scope', '$rootScope', '$window', '$state', '$filter', 'myConfirm', 'accountService', 'scartService', 'prdCommonService',
    function ($scope, $rootScope, $window, $state, $filter, myConfirm, accountService, scartService, prdCommonService) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }

        $rootScope.global.myAccountMenu = "我的收藏";

        $scope.init = function () {
            $scope.gtscPrds = $scope.gtscPrds || [];
            $scope.gtscPrds.checkcount = 0;
            $scope.gtscPrds.allcheck = false;
            $scope.gmjjPrds = $scope.gmjjPrds || [];
            $scope.gmjjPrds.checkcount = 0;
            $scope.gmjjPrds.allcheck = false;
            $scope.zxPrds = $scope.zxPrds || [];
            $scope.zxPrds.checkcount = 0;
            $scope.zxPrds.allcheck = false;
            $scope.zgPrds = $scope.zgPrds || [];
            $scope.zgPrds.checkcount = 0;
            $scope.zgPrds.allcheck = false;

            $scope.allgtscPrds = $scope.allgtscPrds || [];
            $scope.allgtscPrds.checkcount = 0;
            $scope.allgtscPrds.allcheck = false;
            $scope.allgmjjPrds = $scope.allgmjjPrds || [];
            $scope.allgmjjPrds.checkcount = 0;
            $scope.allgmjjPrds.allcheck = false;
            $scope.allzxPrds = $scope.allzxPrds || [];
            $scope.allzxPrds.checkcount = 0;
            $scope.allzxPrds.allcheck = false;
            $scope.allzgPrds = $scope.allzgPrds || [];
            $scope.allzgPrds.checkcount = 0;
            $scope.allzgPrds.allcheck = false;
        };

        $scope.all = {
            gtscPrds: [],
            gmjjPrds: [],
            zxPrds: []
        };

        $scope.showTab = {
            all: true,
            gtsc: false,
            gmjj: false,
            zx: false,
            zg: false
        };

        var previousTab;
        $scope.changeTab = function (whichTab) {
            for (var i in $scope.showTab) {
                $scope.showTab[i] = false;
            }
            $scope.showTab[whichTab] = true;

            if (previousTab != whichTab) {
                $scope.pagination.currentpage = 1;
                $scope.refresh();
                previousTab = whichTab;
            }
        };

        $scope.pagination = {
            pagesize: 10,
            totalcount: -1,
            currentpage: 1
        };

        $scope.$watch("pagination.currentpage", function () {
            $scope.refresh();
        });

        $scope.refresh = function () {
            if ($scope.showTab.all) {
                accountService.getMyFavorites({
                    lvl2_type: '486',
                    need_detail: '0',
                    cur_page: 1,
                    ret_rows: 3
                }).then(function (data) {
                    $scope.allgtscPrds = data[0] || [];
                    $scope.gtscPrds.totalCount = data[1];
                });

                accountService.getMyFavorites({
                    lvl2_type: '6',
                    need_detail: '0',
                    cur_page: 1,
                    ret_rows: 3
                }).then(function (data) {
                    $scope.allgmjjPrds = data[0] || [];
                    $scope.gmjjPrds.totalCount = data[1];
                });

                accountService.getMyFavorites({
                    lvl2_type: '38',
                    need_detail: '0',
                    cur_page: 1,
                    ret_rows: 3
                }).then(function (data) {
                    $scope.allzxPrds = data[0] || [];
                    $scope.zxPrds.totalCount = data[1];
                });

                accountService.getMyFavorites({
                    lvl2_type: '4',
                    need_detail: '0',
                    cur_page: 1,
                    ret_rows: 3
                }).then(function (data) {
                    $scope.allzgPrds = data[0] || [];
                    $scope.zgPrds.totalCount = data[1];
                });


            } else if ($scope.showTab.gtsc) {
                accountService.getMyFavorites({
                    lvl2_type: '486',
                    need_detail: '0',
                    cur_page: $scope.pagination.currentpage,
                    ret_rows: $scope.pagination.pagesize
                }).then(function (data) {
                    // 柜台市场
                    $scope.gtscPrds = data[0] || [];
                    var total = 0;
                    try {
                        total = parseInt(data[1])
                    } catch (e) {
                        total = 0;
                    }
                    $scope.pagination.totalcount = total > 0 ? total : 0;
                    $scope.gtscPrds.totalCount = total;
                    if ($scope.gtscPrds.totalCount == 0) {
                        $scope.showTabAll('gtsc');
                    }
                });
            } else if ($scope.showTab.gmjj) {
                accountService.getMyFavorites({
                    lvl2_type: '6',
                    need_detail: '0',
                    cur_page: $scope.pagination.currentpage,
                    ret_rows: $scope.pagination.pagesize
                }).then(function (data) {
                    // 公募基金
                    $scope.gmjjPrds = data[0] || [];
                    var total = 0;
                    try {
                        total = parseInt(data[1])
                    } catch (e) {
                        total = 0;
                    }
                    $scope.pagination.totalcount = total > 0 ? total : 0;
                    $scope.gmjjPrds.totalCount = total;
                    if ($scope.gmjjPrds.totalCount == 0) {
                        $scope.showTabAll('gmjj');
                    }
                });
            } else if ($scope.showTab.zx) {
                accountService.getMyFavorites({
                    lvl2_type: '38',
                    need_detail: '0',
                    cur_page: $scope.pagination.currentpage,
                    ret_rows: $scope.pagination.pagesize
                }).then(function (data) {
                    // 资讯产品
                    $scope.zxPrds = data[0] || [];
                    var total = 0;
                    try {
                        total = parseInt(data[1])
                    } catch (e) {
                        total = 0;
                    }
                    $scope.pagination.totalcount = total > 0 ? total : 0;
                    $scope.zxPrds.totalCount = total;
                    if ($scope.zxPrds.totalCount == 0) {
                        $scope.showTabAll('zx');
                    }
                });
            } else if ($scope.showTab.zg) {
                accountService.getMyFavorites({
                    lvl2_type: '4',
                    need_detail: '0',
                    cur_page: $scope.pagination.currentpage,
                    ret_rows: $scope.pagination.pagesize
                }).then(function (data) {
                    // 资管产品
                    $scope.zgPrds = data[0] || [];
                    var total = 0;
                    try {
                        total = parseInt(data[1])
                    } catch (e) {
                        total = 0;
                    }
                    $scope.pagination.totalcount = total > 0 ? total : 0;
                    $scope.zgPrds.totalCount = total;
                    if ($scope.zgPrds.totalCount == 0) {
                        $scope.showTabAll('zg');
                    }
                });
            }

            $scope.init();
        };

        // 当前tab查询没有产品，跳转到“全部产品”tab页
        $scope.showTabAll = function (currentTab) {
            $scope.showTab[currentTab] = false;
            $scope.showTab.all = true;
            $scope.refresh();
        };

        $scope.addToCart = function (prds) {
            var prod = {}, prdsToAdd = [], prdslist = [];
            for (var i = 0; i < prds.length; i++) {
                if (prds[i].checked) {
                    prdsToAdd.push(prds[i]);
                    for (var key in prds[i]) {
                        prod[key.toUpperCase()] = prds[i][key];
                    }
                    prod.CREATE_TIME = new Date().format("yyyy-MM-dd HH:mm:ss");
                    prdslist.push(prod);
                }
            }
            scartService.addScart({
                cart_datas: prdsToAdd
            }).then(function (data) {
                if (data[2] && "0" == data[2].ANS_MSG_HDR.MSG_CODE) {
                    if ($window.sessionStorage.shoppinglist) {
                        var shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                        $window.sessionStorage.shoppinglist = JSON.stringify($rootScope.bj(shoppinglist, prdslist, ["user_id", "CREATE_TIME"]));
                    } else {
                        $window.sessionStorage.shoppinglist = JSON.stringify(prdslist);
                    }
                    $rootScope.updateShoppingTip();
                    $scope.refresh();
                }
            });
        };

        $scope.remove = function (products) {
            var proIds = [];
            for (var i = 0; i < products.length; i++) {
                if (products[i].checked) {
                    proIds.push(products[i].PRO_ID);
                }
            }
            myConfirm("确定删除所选的" + proIds.length + "件产品吗？", function () {
                accountService.deleteMyFavorites({
                    pro_id: proIds.join(",")
                }).then(function (data) {
                    if (data[2] && "0" == data[2].ANS_MSG_HDR.MSG_CODE) {
                        for (var i = 0; i < products.length; i++) {
                            prdCommonService.removeFromSessionFavorites(products[i]);
                        }
                        $scope.refresh()
                    }
                });
            });
        };

        $scope.check = function (val, i) {
            if (!val.checkcount || isNaN(val.checkcount)) {
                val.checkcount = 0;
            }
            val[i].checked ? val.checkcount-- : val.checkcount++;
            val.checkcount == val.length ? val.allcheck = true : val.allcheck = false;
        };

        $scope.checkeach = function (val) {
            if (val.allcheck) {
                for (var i = 0; i < val.length; i++) {
                    val[i].checked = false;
                }
                val.checkcount = 0;
            } else {
                for (var i = 0; i < val.length; i++) {
                    val[i].checked = true;
                }
                val.checkcount = val.length;
            }
        };

        $scope.$watch('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $scope.isIE = true;
                    $("label").removeClass("i-checks i-checks-sm i-checks-lg");
                }
                $('input, textarea').placeholder();
            }
        });


    }]);
