'use strict';

angular.module('ASS.index').controller('IndexCtrl', ['$rootScope', '$scope', '$window', '$state', '$localStorage', 'exclusiveService', 'adnotService', 'accountService', 'kibhSystem', 'myAlert', 'myConfirm', 'prdCommonService',
    function ($rootScope, $scope, $window, $state, $localStorage, exclusiveService, adnotService, accountService, kibhSystem, myAlert, myConfirm, prdCommonService) {

        $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];

        if ('bhzq' != WEB_CUST) {

            adnotService.getAdOrNote({
                type: '2',
                type_val: '2',
                stat: '1',
                cur_page: 1,
                ret_rows: 6,
                order_by: 'OP_DATE desc'
            }).then(function (data) {
                $scope.news = data[0];
                for (var i = 0; i < $scope.news.length; i++) {
                    $scope.news[i].OP_DATE = $scope.news[i].OP_DATE.split(' ')[0];
                }
            });

            // 公募基金产品
            exclusiveService.getPrds({
                pref_type: '3',
                lvl2_type: '6',
                inve_start: '100,10000',
                cur_page: 1,
                ret_rows: 3
            }).then(function (data) {
                $scope.gmjjPrds = data[0];
                for (var i = 0; i < $scope.gmjjPrds.length; i++) {
                    $scope.gmjjPrds[i].canBuy = prdCommonService.checkIfCanBuy($scope.gmjjPrds[i]);
                    $scope.gmjjPrds[i].isFavorite = prdCommonService.isMyFavorite($scope.gmjjPrds[i]);
                }
            });

            // 柜台市场产品
            exclusiveService.getPrds({
                pref_type: '3',
                lvl2_type: '486',
                inve_start: '10000,',
                cur_page: 1,
                ret_rows: 3
            }).then(function (data) {
                $scope.gtscPrds = data[0];
                for (var i = 0; i < $scope.gtscPrds.length; i++) {
                    $scope.gtscPrds[i].canBuy = prdCommonService.checkIfCanBuy($scope.gtscPrds[i]);
                    $scope.gtscPrds[i].isFavorite = prdCommonService.isMyFavorite($scope.gtscPrds[i]);
                }
            });

            // 资管产品
            exclusiveService.getPrds({
                pref_type: '3',
                lvl2_type: '4',
                inve_start: '10000,',
                cur_page: 1,
                ret_rows: 3
            }).then(function (data) {
                $scope.zgPrds = data[0];
                for (var i = 0; i < $scope.zgPrds.length; i++) {
                    $scope.zgPrds[i].canBuy = prdCommonService.checkIfCanBuy($scope.zgPrds[i]);
                    $scope.zgPrds[i].isFavorite = prdCommonService.isMyFavorite($scope.zgPrds[i]);
                }
            });
        } else {
            exclusiveService.getPrds({
                pref_type: '1',
                cur_page: 1,
                ret_rows: 1
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.superPrd = data[0][0];
                    $scope.superPrd.canBuy = prdCommonService.checkIfCanBuy($scope.superPrd);
                }
            });
        }

        if (!angular.isDefined($localStorage.menulist)) {
            kibhSystem.getBizMenu().then(function (data) {
                var m, allmenu = data[0], menubiz = {}, menulist = {tree: {}, list: []};
                for (var i = 0; i < allmenu.length; i++) {
                    m = allmenu[i];
                    m.MENU_URL_OLD = m.MENU_URL;
                    if (m.MENU_LEVEL) {
                        m.MENU_URL = m.MENU_URL + "({businessId: '" + m.MENU_LEVEL + "'})";
                        var prefix = m.MENU_LEVEL.substr(0, 3);
                        if (!menulist.tree["a_" + prefix]) {
                            menulist.tree["a_" + prefix] = {root: null, menuitem: []};
                        }

                        if (m.MENU_LEVEL == prefix) {
                            menulist.tree["a_" + prefix].root = m
                        } else {
                            menulist.tree["a_" + prefix].menuitem.push(m);
                        }

                        menulist.list.push(m);
                        menubiz[m.MENU_LEVEL] = m.MEN_BUSI_IDS;
                    }
                }

                $localStorage.menubiz = menubiz;
                $localStorage.menulist = menulist;
                $scope.allBizs = $localStorage.menulist.tree;
                var commonBizs = [];
                angular.forEach($localStorage.menulist.list, function (d) {
                    if (commonBizs.length < 7 && d.IS_COMMON_USE == 1) {
                        commonBizs.push(d);
                    }
                });
                $scope.commonBizs = commonBizs;
            });
        } else {
            $scope.allBizs = $localStorage.menulist.tree;
            var commonBizs = [];
            angular.forEach($localStorage.menulist.list, function (d) {
                if (commonBizs.length < 7 && d.IS_COMMON_USE == 1) {
                    commonBizs.push(d);
                }
            });
            $scope.commonBizs = commonBizs;
        }

        $scope.addToMyFavorite = function (products, index) {
            if ($window.sessionStorage.sessionid) {
                accountService.addMyFavorite({
                    pro_id: products[index].PRO_ID,
                    lvl2_type: products[index].LVL2_TYPE
                }).then(function (data) {
                    if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                        products[index].isFavorite = true;
                        prdCommonService.addToSessionFavorites(products[index]);
                    }
                });
            } else {
                myConfirm('现在登录吗？', function () {
                    $rootScope.beforeLoginUrl = $state.current.name;
                    $state.go('auth.login');
                }, '', '您需要登录后才能收藏产品', '登录');
            }
        };

        $scope.addToMyFavorite = function (products, index) {
            if (!$window.sessionStorage.sessionid) {
                myConfirm('现在登录吗？', function () {
                    $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink ? $state.current.ncyBreadcrumbLink : $state.current.name;
                    $state.go('auth.login');
                }, '', '您需要登录后才能收藏产品', '登录');
            } else {
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $rootScope.global.account = data[0][0];
                        if (!$rootScope.global.account.USER_ID) {
                            myConfirm('现在去绑定注册户吗？', function () {
                                $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink ? $state.current.ncyBreadcrumbLink : $state.current.name;
                                $state.go('auth.bindregaccount');
                            }, '', '您需要绑定注册户后才能收藏产品', '立即绑定', '暂不绑定');
                        } else {
                            accountService.addMyFavorite({
                                pro_id: products[index].PRO_ID,
                                lvl2_type: products[index].LVL2_TYPE
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    products[index].isFavorite = true;
                                    prdCommonService.addToSessionFavorites(products[index]);
                                }
                            });
                        }
                    }
                });
            }
        };

        $scope.deleteMyFavorites = function (products, index) {
            myConfirm('确定取消收藏该产品吗？', function () {
                accountService.deleteMyFavorites({
                    pro_id: products[index].PRO_ID
                }).then(function (data) {
                    if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                        products[index].isFavorite = false;
                        prdCommonService.removeFromSessionFavorites(products[index]);
                    }
                });
            });
        };

        $scope.$on('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $('label').removeClass('i-checks i-checks-sm i-checks-lg');
                }
                // Invoke the plugin
                $('input, textarea').placeholder();
            }
        });

    }]);
