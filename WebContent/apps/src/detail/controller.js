'use strict';

angular.module('ASS.detail').controller('DetailCtrl', ['$scope', '$rootScope', '$window', '$state', '$stateParams', '$cookieStore', '$localStorage', 'detailService', 'accountService', 'scartService', 'myConfirm', 'myAlert', 'prdCommonService',
    function ($scope, $rootScope, $window, $state, $stateParams, $cookieStore, $localStorage, detailService, accountService, scartService, myConfirm, myAlert, prdCommonService) {

        $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];

        $scope.zgcpTabs = {
            manager: {
                active: false,
                refreshed: false
            },
            netvalue: {
                active: false,
                refreshed: false
            },
            fee: {
                active: false,
                refreshed: false
            },
            bonus: {
                active: false,
                refreshed: false
            },
            notice: {
                active: false,
                refreshed: false
            },
            law: {
                active: false,
                refreshed: false
            }
        };

        $scope.gmjjTabs = {
            manager: {
                active: false,
                refreshed: false
            },
            group: {
                active: false,
                refreshed: false
            },
            netvalue: {
                active: false,
                refreshed: false
            },
            fee: {
                active: false,
                refreshed: false
            },
            bonus: {
                active: false,
                refreshed: false
            },
            notice: {
                active: false,
                refreshed: false
            },
            law: {
                active: false,
                refreshed: false
            }
        };

        $scope.gtscTabs = {
            notice: {
                active: false,
                refreshed: false
            },
            law: {
                active: false,
                refreshed: false
            }
        };

        // 如果是从360基金净值tab页跳转过来的，则默认显示基金净值tab页
        if ('yes' == $window.sessionStorage.toNavTab) {
            $scope[$stateParams.type + 'Tabs'].netvalue.active = true;
            $window.sessionStorage.removeItem('toNavTab');
        }

        var prdId = $stateParams.id;
        var prdType = $stateParams.type;

        $scope.pro_id = prdId;
        prdType = prdType ? prdType : 'index';
        $scope.type = prdType;

        //$scope.buy_money = 0;
        $scope.buy = [];
        $scope.priceMode = [];
        $scope.prodtoadd = [];
        $scope.prd = [];

        if (prdType == 'zhcp') {
            detailService.getZhcp({
                pro_id: prdId
            }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $scope.prd = data[0][0];
                    }
                }
            );
        } else {
            detailService.getPrdDetail({
                pro_id: prdId
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.prd = data[0][0];

                    $scope.prd.isFavorite = prdCommonService.isMyFavorite($scope.prd);
                    $scope.prd.canBuy = prdCommonService.checkIfCanBuy($scope.prd);

                    $scope.prd.managerPicUrl = $scope.prd.MANAGER_IMG_URL ? $scope.prd.MANAGER_IMG_URL.split('|')[0] : '';
                }

                if (prdType == 'zxcp') {
                    detailService.getZxPrdPrice({
                        pro_id: prdId
                    }).then(function (data) {
                        if (data[0]) {
                            $scope.priceMode = data[0];
                            if ($scope.priceMode.length > 0) {
                                $scope.buy['buy_period'] = $scope.priceMode[0].FEE;
                            }
                            $scope.prodtoadd = {
                                pro_id: $scope.prd.PRO_ID,
                                pro_code: $scope.prd.PRO_CODE,
                                sht_name: $scope.prd.SHT_NAME,
                                lvl1_type: $scope.prd.LVL1_TYPE,
                                lvl2_type: $scope.prd.LVL2_TYPE,
                                price: $scope.priceMode,
                                buy_period: $scope.priceMode[0].FEE_MODE,
                                buy_num: '1',
                                buy_money: $scope.priceMode[0].FEE,
                                pay_type: $scope.prd.PAY_WAY,
                                pro_sou: $scope.prd.PRO_SOU,
                                inst_id: $scope.prd.INST_ID,
                                pay_way: $scope.prd.PAY_WAY,
                                jhlc_ecsno: $scope.prd.JHLC_ECSNO,
                                jhlc_ectype: $scope.prd.JHLC_ECTYPE,
                                jhlc_risksno: $scope.prd.JHLC_RISKSNO
                            };
                            $scope.buy['num'] = 1;
                        }

                    });
                } else if ($scope.prd) {
                    $scope.prodtoadd = {
                        pro_id: $scope.prd.PRO_ID,
                        pro_code: $scope.prd.PRO_CODE,
                        sht_name: $scope.prd.SHT_NAME,
                        lvl1_type: $scope.prd.LVL1_TYPE,
                        lvl2_type: $scope.prd.LVL2_TYPE,
                        inve_start: $scope.prd.INVE_START,
                        buy_money: $scope.prd.INVE_START,
                        pay_type: $scope.prd.PAY_WAY,
                        pro_sou: $scope.prd.PRO_SOU,
                        inst_id: $scope.prd.INST_ID,
                        allow_trds: $scope.prd.ALLOW_TRDS,
                        charge_cls: $scope.prd.CHARGE_CLS,
                        regi_org: $scope.prd.REGI_ORG,
                        pay_way: $scope.prd.PAY_WAY,
                        is_jhlc: $scope.prd.IS_JHLC,
                        addto_min_buy: $scope.prd.ADDTO_MIN_BUY,
                        regi_org_desc: $scope.prd.REGI_ORG_DESC,
                        jhlc_ecsno: $scope.prd.JHLC_ECSNO,
                        jhlc_ectype: $scope.prd.JHLC_ECTYPE,
                        jhlc_risksno: $scope.prd.JHLC_RISKSNO,
                        dura_time: $scope.prd.DURA_TIME,
                        reve_type: $scope.prd.REVE_TYPE,
                        reve_type_desc: $scope.prd.REVE_TYPE_DESC
                    };
                    if ($localStorage.buyPrd && $localStorage.buyPrd.beforeLogin) {
                        $scope.prd.BUY_MONEY = $localStorage.buyPrd.buy_money;
                        $localStorage.buyPrd.beforeLogin = false;
                    } else {
                        $scope.prd.BUY_MONEY = $scope.prd.INVE_START
                    }
                }
            });
        }

        // 直接支付
        $scope.product = {};
        $scope.addToOrder = function () {
            if ($scope.prodtoadd.lvl1_type != '3') {
                if (isNaN($scope.prd.BUY_MONEY)) {
                    $scope.prd.BUY_MONEY = $scope.prodtoadd.buy_money;
                    myAlert('请输入正确的购买金额');
                    return;
                } else {
                    $scope.prodtoadd.buy_money = $scope.prd.BUY_MONEY;
                }
            } else {
                if (isNaN($scope.buy.num)) {
                    $scope.buy.num = 1;
                    myAlert('请输入正确的购买数量');
                    return;
                } else if (new Number($scope.buy.num) < 1) {
                    $scope.buy.num = 1;
                    myAlert('请输入正确的购买数量');
                    return;
                } else if (new Number($scope.buy.num) >= new Number($scope.buy.num)) {
                    $scope.prodtoadd.buy_num = new Number($scope.buy.num);
                }
            }
            var prds = {}, prdsToAdd = [], prdslist = [];
            for (var key in $scope.prodtoadd) {
                prds[key.toUpperCase()] = $scope.prodtoadd[key];
            }
            prds.CREATE_TIME = new Date().format('yyyy-MM-dd HH:mm:ss');
            prdsToAdd.push($scope.prodtoadd);
            prdslist.push(prds);

            var order = {};
            if ($scope.prodtoadd.lvl1_type == '3') {
                order.paymoney = $scope.prodtoadd.paymoney;
            } else {
                order.paymoney = $scope.prodtoadd.buy_money;
            }
            for (var key in $scope.prodtoadd) {
                order[key.toUpperCase()] = $scope.prodtoadd[key];
            }
            order.CREATE_TIME = new Date().format('yyyy-MM-dd HH:mm:ss');
            $cookieStore.remove('productlist');
            $cookieStore.put('order', order);
            if (!$window.sessionStorage.sessionid) {
                $state.go('auth.checkLogin');
            } else {
                accountService.getLoginUserInfo().then(function (data) {
                    $scope.user = data[0][0];
                    // 未绑定注册号
                    if (!$scope.user.PHONE_NO) {
                        $state.go('kfps.orderCheck');
                        return;
                    }
                    // 未绑定交易账户
                    if (!$scope.user.FUNDSACCT_CODE_VIEW) {
                        $state.go('kfps.orderCheck');
                        return;
                    }

                    // 不是交易登录，使用资金账号登录
                    if ('3' != $scope.user.LOGIN_TYPE) {
                        $state.go('auth.checkLogin');
                        return;
                    }
                    $state.go('kfps.orderCheck');
                    return;
                });
            }
        };

        // 加入购物车
        $scope.addToCart = function () {
            if ($scope.prodtoadd.lvl1_type != '3') {
                if (isNaN($scope.prd.BUY_MONEY)) {
                    $scope.prd.BUY_MONEY = $scope.prodtoadd.buy_money;
                    myAlert('请输入正确的购买金额');
                    return;
                }
            } else {
                if (isNaN($scope.buy.num)) {
                    $scope.buy.num = 1;
                    myAlert('请输入正确的购买数量');
                    return;
                } else if (new Number($scope.buy.num) < 1) {
                    $scope.buy.num = 1;
                    myAlert('请输入正确的购买数量');
                    return;
                } else if (new Number($scope.buy.num) >= new Number($scope.buy.num)) {
                    $scope.prodtoadd.buy_num = new Number($scope.buy.num);
                }
            }
            if ($scope.prd.IS_ADD_CART == '1') {
                var prds = {}, prdsToAdd = [], prdslist = [];
                $scope.prodtoadd.buy_money = $scope.prd.BUY_MONEY;
                for (var key in $scope.prodtoadd) {
                    prds[key.toUpperCase()] = $scope.prodtoadd[key];
                }
                prds.CREATE_TIME = new Date().format('yyyy-MM-dd hh:mm:ss');
                prdsToAdd.push($scope.prodtoadd);
                prdslist.push(prds);
                if ($window.sessionStorage.sessionid) {
                    if ($window.sessionStorage.shoppinglist) {
                        var shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                        $window.sessionStorage.shoppinglist = JSON.stringify($rootScope.bj(shoppinglist, prdslist, ['user_id', 'CREATE_TIME']));
                    } else {
                        $window.sessionStorage.shoppinglist = JSON.stringify(prdslist);
                    }
                    $rootScope.updateShoppingTip(false);
                } else {
                    if ($window.sessionStorage.shoppinglist) {
                        var shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                        $window.sessionStorage.shoppinglist = JSON.stringify($rootScope.bj(shoppinglist, prdslist, ['user_id', 'CREATE_TIME']));
                    } else {
                        $window.sessionStorage.shoppinglist = JSON.stringify(prdslist);
                    }
                    $rootScope.updateShoppingTip(false);
                }
            }
        };

        $scope.addToMyFavorite = function (product) {
            if (!$window.sessionStorage.sessionid) {
                myConfirm('现在登录吗？', function () {
                    $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink;
                    $state.go('auth.login');
                }, '', '您需要登录后才能收藏产品', '登录');
            } else {
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $rootScope.global.account = data[0][0];
                        if (!$rootScope.global.account.USER_ID) {
                            myConfirm('现在去绑定注册户吗？', function () {
                                $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink;
                                $state.go('auth.bindregaccount');
                            }, '', '您需要绑定注册户后才能收藏产品', '立即绑定', '暂不绑定');
                        } else {
                            accountService.addMyFavorite({
                                pro_id: product.PRO_ID,
                                lvl2_type: product.LVL2_TYPE
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    product.isFavorite = true;
                                    prdCommonService.addToSessionFavorites(product);
                                }
                            });
                        }
                    }
                });
            }
        };

        $scope.deleteMyFavorites = function (product) {
            myConfirm('确定取消收藏该产品吗？', function () {
                accountService.deleteMyFavorites({
                    pro_id: product.PRO_ID
                }).then(function (data) {
                    if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                        product.isFavorite = false;
                        prdCommonService.removeFromSessionFavorites(product);
                    }
                });
            });
        };

        //兼容性
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
