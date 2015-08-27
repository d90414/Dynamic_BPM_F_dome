'use strict';

angular.module('ASS.scart').controller('ScartCtrl', ['$scope', '$rootScope', 'scartService', 'myConfirm', 'myAlert', '$cookieStore', '$state', '$window', function ($scope, $rootScope, scartService, myConfirm, myAlert, $cookieStore, $state, $window) {
    $scope.zero = 0.00;
    $scope.zxcplist = [];
    $scope.lccplist = [];
    $scope.gmjjlist = [];
    $scope.initiallist = [];
    $scope.shoppinglist = [];

    $scope.change = function (val, i) {
        for (var j = 0; j < $scope.initiallist.length; j++) {
            if (val[i].PRO_ID == $scope.initiallist[j].PRO_ID) {
                if (val[i].BUY_PERIOD != $scope.initiallist[j].BUY_PERIOD
                    || val[i].BUY_NUM != $scope.initiallist[j].BUY_NUM
                    || val[i].BUY_MONEY != $scope.initiallist[j].BUY_MONEY) {
                    val[i].buy_num = new Number(val[i].buy_num).toFixed(2);
                    val[i].buy_period = new Number(val[i].buy_period).toFixed(2);
                    val[i].buy_money = new Number(val[i].buy_money).toFixed(2);
                    $scope.initiallist[j].modified = val[i];
                } else {
                    $scope.initiallist[j].modified = false;
                }
                if (val[i].LVL1_TYPE != "3" && val[i].buy_money < val[i].INVE_START) {
                    val[i].buy_money = val[i].INVE_START;
                    val[i].paymoney = val[i].INVE_START;
                    myAlert("购买金额不能小于投资起点");
                    return;
                } else if (val[i].LVL1_TYPE == "3" && val[i].buy_num < 1) {
                    val[i].buy_num = 1;
                    myAlert("购买数量不得小于1");
                    return;
                }
                break;
            }
        }
        if (val[i].checked) {
            $scope.shoppinglist.paymoney = (new Number($scope.shoppinglist.paymoney) - new Number(val[i].paymoney)).toFixed(2);
            val.paymoney = (new Number(val.paymoney) - new Number(val[i].paymoney)).toFixed(2);
            if (val[i].LVL1_TYPE == "3") {
                val[i].paymoney = (val[i].buy_period * val[i].buy_num).toFixed(2);
            } else {
                val[i].paymoney = val[i].buy_money;
            }
            val.paymoney = (new Number(val.paymoney) + new Number(val[i].paymoney)).toFixed(2);
            $scope.shoppinglist.paymoney = (new Number($scope.shoppinglist.paymoney) + new Number(val[i].paymoney)).toFixed(2);
        }
    };

    $scope.check = function (val, i) {
        if (val[i].checked) {
            val.checkcount--;
            val.paymoney = (new Number(val.paymoney) - new Number(val[i].paymoney)).toFixed(2);
            $scope.shoppinglist.paymoney = (new Number($scope.shoppinglist.paymoney) - new Number(val[i].paymoney)).toFixed(2);
            $scope.shoppinglist.checkcount--;
        } else {
            val.checkcount++;
            if (val[i].LVL1_TYPE == "3") {
                val[i].paymoney = (val[i].buy_period * val[i].buy_num).toFixed(2);
            } else {
                val[i].paymoney = val[i].buy_money;
            }
            val.paymoney = (new Number(val.paymoney) + new Number(val[i].paymoney)).toFixed(2);
            $scope.shoppinglist.paymoney = (new Number($scope.shoppinglist.paymoney) + new Number(val[i].paymoney)).toFixed(2);
            $scope.shoppinglist.checkcount++;
        }
        if (val.checkcount == val.length) {
            val.allcheck = true;
        } else {
            val.allcheck = false;
        }
        if ($scope.shoppinglist.checkcount == $scope.shoppinglist.length) {
            $scope.shoppinglist.allcheck = true;
        } else {
            $scope.shoppinglist.allcheck = false;
        }
    };

    $scope.checkeach = function (val) {
        $scope.shoppinglist.paymoney = (new Number($scope.shoppinglist.paymoney) - new Number(val.paymoney)).toFixed(2);
        val.paymoney = $scope.zero.toFixed(2);
        if (val.allcheck) {
            for (var i = 0; i < val.length; i++) {
                val[i].checked = false;
            }
            val.checkcount = 0;
        } else {
            for (var i = 0; i < val.length; i++) {
                val[i].checked = true;
                if (val[i].LVL1_TYPE == "3") {
                    val[i].paymoney = ( val[i].buy_period * val[i].buy_num).toFixed(2);
                } else {
                    val[i].paymoney = val[i].buy_money;
                }
                val.paymoney = (new Number(val.paymoney) + new Number(val[i].paymoney)).toFixed(2);
                $scope.shoppinglist.paymoney = (new Number($scope.shoppinglist.paymoney) + new Number(val[i].paymoney)).toFixed(2);
            }
            val.checkcount = val.length;
        }
        $scope.shoppinglist.checkcount = $scope.zxcplist.checkcount + $scope.lccplist.checkcount + $scope.gmjjlist.checkcount;
        if ($scope.shoppinglist.checkcount == $scope.shoppinglist.length) {
            $scope.shoppinglist.allcheck = true;
        } else {
            $scope.shoppinglist.allcheck = false;
        }
    };

    $scope.checkall = function (val) {
        val.paymoney = $scope.zero.toFixed(2);
        $scope.zxcplist.paymoney = $scope.zero.toFixed(2);
        $scope.lccplist.paymoney = $scope.zero.toFixed(2);
        $scope.gmjjlist.paymoney = $scope.zero.toFixed(2);
        if (val.allcheck) {
            for (var i = 0; i < $scope.zxcplist.length; i++) {
                $scope.zxcplist[i].checked = false;
            }
            $scope.zxcplist.checkcount = 0;
            $scope.zxcplist.allcheck = false;
            for (var i = 0; i < $scope.lccplist.length; i++) {
                $scope.lccplist[i].checked = false;
            }
            $scope.lccplist.checkcount = 0;
            $scope.lccplist.allcheck = false;
            for (var i = 0; i < $scope.gmjjlist.length; i++) {
                $scope.gmjjlist[i].checked = false;
            }
            $scope.gmjjlist.checkcount = 0;
            $scope.gmjjlist.allcheck = false;
        } else {
            for (var i = 0; i < $scope.zxcplist.length; i++) {
                $scope.zxcplist[i].checked = true;
                $scope.zxcplist[i].paymoney = ( $scope.zxcplist[i].buy_period * $scope.zxcplist[i].buy_num).toFixed(2);
                $scope.zxcplist.paymoney = (new Number($scope.zxcplist.paymoney) + new Number($scope.zxcplist[i].paymoney)).toFixed(2);
                val.paymoney = (new Number(val.paymoney) + new Number($scope.zxcplist.paymoney)).toFixed(2);
            }
            $scope.zxcplist.checkcount = $scope.zxcplist.length;
            $scope.zxcplist.allcheck = true;
            for (var i = 0; i < $scope.lccplist.length; i++) {
                $scope.lccplist[i].checked = true;
                $scope.lccplist[i].paymoney = $scope.lccplist[i].BUY_MONEY;
                $scope.lccplist.paymoney = (new Number($scope.lccplist.paymoney) + new Number($scope.lccplist[i].paymoney)).toFixed(2);
                val.paymoney = (new Number(val.paymoney) + new Number($scope.lccplist[i].paymoney)).toFixed(2);
            }
            $scope.lccplist.checkcount = $scope.lccplist.length;
            $scope.lccplist.allcheck = true;
            for (var i = 0; i < $scope.gmjjlist.length; i++) {
                $scope.gmjjlist[i].checked = true;
                $scope.gmjjlist[i].paymoney = $scope.gmjjlist[i].BUY_MONEY;
                $scope.gmjjlist.paymoney = (new Number($scope.gmjjlist.paymoney) + new Number($scope.gmjjlist[i].paymoney)).toFixed(2);
                val.paymoney = (new Number(val.paymoney) + new Number($scope.gmjjlist[i].paymoney)).toFixed(2);
            }
            $scope.gmjjlist.checkcount = $scope.gmjjlist.length;
            $scope.gmjjlist.allcheck = true;
        }
        val.checkcount = $scope.zxcplist.checkcount + $scope.lccplist.checkcount + $scope.gmjjlist.checkcount;
    };

    $scope.refresh = function () {
        $scope.zxcplist = [];
        $scope.lccplist = [];
        $scope.gmjjlist = [];
        $scope.initiallist = [];
        if ($window.sessionStorage.sessionid) {
            scartService.getScart().then(function (data) {
                if ($window.sessionStorage.shoppinglist) {
                    if (data[0].length > 0) {
                        var shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                        $window.sessionStorage.shoppinglist = JSON.stringify($rootScope.bj(shoppinglist, data[0], ["user_id", "CREATE_TIME"]));
                        $rootScope.updateShoppingTip(true);
                    }
                } else {
                    if (data[0].length > 0) {
                        $window.sessionStorage.shoppinglist = JSON.stringify(data[0]);
                        $rootScope.updateShoppingTip(true);
                    }
                }
                if ($window.sessionStorage.shoppinglist) {
                    $scope.shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                    for (var i = 0; i < $scope.shoppinglist.length; i++) {
                        $scope.initiallist.push(angular.copy($scope.shoppinglist[i]));
                        $scope.shoppinglist[i].price = $scope.shoppinglist[i].PRICE;
                        $scope.shoppinglist[i].checked = false;
                        if ($scope.shoppinglist[i].LVL1_TYPE == "3") {
                            $scope.shoppinglist[i].buy_money = new Number($scope.shoppinglist[i].BUY_MONEY).toFixed(2);
                            $scope.shoppinglist[i].buy_num = $scope.shoppinglist[i].BUY_NUM;
                            $scope.shoppinglist[i].paymoney = ($scope.shoppinglist[i].buy_num * $scope.shoppinglist[i].buy_money).toFixed(2);
                            if (angular.isArray($scope.shoppinglist[i].price)) {
                                $scope.shoppinglist[i].buy_period = $scope.shoppinglist[i].price[0].FEE;
                            }
                            $scope.zxcplist.push($scope.shoppinglist[i]);
                        } else if ($scope.shoppinglist[i].LVL1_TYPE == "1") {
                            $scope.shoppinglist[i].buy_money = new Number($scope.shoppinglist[i].BUY_MONEY).toFixed(2);
                            $scope.shoppinglist[i].paymoney = new Number($scope.shoppinglist[i].BUY_MONEY).toFixed(2);
                            if ($scope.shoppinglist[i].LVL2_TYPE == "6") {
                                $scope.gmjjlist.push($scope.shoppinglist[i]);
                            } else {
                                $scope.lccplist.push($scope.shoppinglist[i]);
                            }
                        }
                    }

                    $scope.zxcplist.checkcount = 0;
                    $scope.lccplist.checkcount = 0;
                    $scope.gmjjlist.checkcount = 0;
                    $scope.shoppinglist.checkcount = 0;
                    $scope.zxcplist.paymoney = $scope.zero.toFixed(2);
                    $scope.lccplist.paymoney = $scope.zero.toFixed(2);
                    $scope.gmjjlist.paymoney = $scope.zero.toFixed(2);
                    $scope.shoppinglist.paymoney = $scope.zero.toFixed(2);
                    $scope.zxcplist.allcheck = false;
                    $scope.lccplist.allcheck = false;
                    $scope.gmjjlist.allcheck = false;
                    $scope.shoppinglist.allcheck = false;
                } else {
                    $scope.shoppinglist = [];
                }
            });
        } else {
            if ($window.sessionStorage.shoppinglist) {
                $scope.shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                for (var i = 0; i < $scope.shoppinglist.length; i++) {
                    $scope.initiallist.push(angular.copy($scope.shoppinglist[i]));
                    $scope.shoppinglist[i].price = $scope.shoppinglist[i].PRICE;
                    $scope.shoppinglist[i].checked = false;
                    if ($scope.shoppinglist[i].LVL1_TYPE == "3") {
                        $scope.shoppinglist[i].buy_money = new Number($scope.shoppinglist[i].BUY_MONEY).toFixed(2);
                        $scope.shoppinglist[i].buy_num = $scope.shoppinglist[i].BUY_NUM;
                        $scope.shoppinglist[i].paymoney = ($scope.shoppinglist[i].buy_num * $scope.shoppinglist[i].buy_money).toFixed(2);
                        if (angular.isArray($scope.shoppinglist[i].price)) {
                            $scope.shoppinglist[i].buy_period = $scope.shoppinglist[i].price[0].FEE;
                        }
                        $scope.zxcplist.push($scope.shoppinglist[i]);
                    } else if ($scope.shoppinglist[i].LVL1_TYPE == "1") {
                        $scope.shoppinglist[i].buy_money = new Number($scope.shoppinglist[i].BUY_MONEY).toFixed(2);
                        $scope.shoppinglist[i].paymoney = new Number($scope.shoppinglist[i].BUY_MONEY).toFixed(2);
                        if ($scope.shoppinglist[i].LVL2_TYPE == "6") {
                            $scope.gmjjlist.push($scope.shoppinglist[i]);
                        } else {
                            $scope.lccplist.push($scope.shoppinglist[i]);
                        }
                    }
                }
                $scope.zxcplist.checkcount = 0;
                $scope.lccplist.checkcount = 0;
                $scope.gmjjlist.checkcount = 0;
                $scope.shoppinglist.checkcount = 0;
                $scope.zxcplist.paymoney = $scope.zero.toFixed(2);
                $scope.lccplist.paymoney = $scope.zero.toFixed(2);
                $scope.gmjjlist.paymoney = $scope.zero.toFixed(2);
                $scope.shoppinglist.paymoney = $scope.zero.toFixed(2);
                $scope.zxcplist.allcheck = false;
                $scope.lccplist.allcheck = false;
                $scope.gmjjlist.allcheck = false;
                $scope.shoppinglist.allcheck = false;
            } else {
                $scope.shoppinglist = [];
            }
        }
    };

    $scope.remove = function (val) {
        var proidlist = [], shoppinglist = [];
        if ($window.sessionStorage.shoppinglist) {
            shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
        }
        for (var i = 0; i < val.length; i++) {
            if (val[i].checked) {
                proidlist.push(val[i].PRO_ID);
                for (var j = 0; j < shoppinglist.length; j++) {
                    if (shoppinglist[j].PRO_ID == val[i].PRO_ID) {
                        shoppinglist.splice(j, 1);
                        break;
                    }
                }
            }
        }
        myConfirm("确定删除所选的" + proidlist.length + "件产品吗？", function () {
            if ($window.sessionStorage.sessionid) {
                scartService.deleteScart({
                    pro_id: proidlist.join()
                }).then(function (data) {
                    if ($window.sessionStorage.shoppinglist) {
                        if (shoppinglist.length > 0) {
                            $window.sessionStorage.shoppinglist = JSON.stringify(shoppinglist);
                        } else {
                            $window.sessionStorage.removeItem("shoppinglist");
                        }
                        $rootScope.updateShoppingTip(false);
                    }
                });
            } else {
                if (shoppinglist.length > 0) {
                    $window.sessionStorage.shoppinglist = JSON.stringify(shoppinglist);
                } else {
                    $window.sessionStorage.removeItem("shoppinglist");
                }
                $rootScope.updateShoppingTip(false);

            }
            $scope.refresh();
        });

    };

    $scope.pay = function (val) {
        var productlist = [], modifiedlist = [], shoppinglist = [];
        if ($window.sessionStorage.shoppinglist) {
            shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
        }
        for (var i = 0; i < val.length; i++) {
            if (val[i].checked) {
                productlist.push(val[i]);
            }
        }
        for (var i = 0; i < $scope.initiallist.length; i++) {
            if ($scope.initiallist[i].modified && $scope.initiallist[i].modified.checked) {
                $scope.initiallist[i].PRICE = $scope.initiallist[i].modified.PRICE;
                $scope.initiallist[i].BUY_PERIOD = $scope.initiallist[i].modified.BUY_PERIOD;
                $scope.initiallist[i].BUY_NUM = $scope.initiallist[i].modified.BUY_NUM;
                $scope.initiallist[i].BUY_MONEY = $scope.initiallist[i].modified.BUY_MONEY;
                delete $scope.initiallist[i].modified;
                var prod = {};
                for (var key in $scope.initiallist[i]) {
                    prod[key.toLowerCase()] = $scope.initiallist[i][key];
                }
                modifiedlist.push(prod);
                for (var j = 0; j < shoppinglist.length; j++) {
                    if (shoppinglist[j].PRO_ID == $scope.initiallist[i].PRO_ID) {
                        shoppinglist.splice(j, 1, $scope.initiallist[i]);
                        break;
                    }
                }
            }
        }
        if ($window.sessionStorage.sessionid) {
            if (modifiedlist.length > 0) {
                scartService.modifyScart({
                    cart_datas: modifiedlist
                }).then(function (data) {
                    if ($window.sessionStorage.shoppinglist) {
                        $window.sessionStorage.shoppinglist = JSON.stringify(shoppinglist);
                        $rootScope.updateShoppingTip(true);
                    }
                    $cookieStore.remove("order");
                    $cookieStore.remove("countlist");
                    $cookieStore.remove("monthlist");
                    $cookieStore.put("productlist", productlist);
                    $state.go("kfps.confirmorder");
                });
            } else {
                $cookieStore.remove("order");
                $cookieStore.remove("countlist");
                $cookieStore.remove("monthlist");
                $cookieStore.put("productlist", productlist);
                $state.go("kfps.confirmorder");
            }
        } else {
            if (modifiedlist.length > 0 && $window.sessionStorage.shoppinglist) {
                $window.sessionStorage.shoppinglist = JSON.stringify(shoppinglist);
                $rootScope.updateShoppingTip(true);
            }
            $rootScope.beforeLoginUrl = $state.current.name;
            $state.go("auth.login");
        }
    };

    $scope.refresh();

    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 9) {
            if ($.browser.version <= 8) {
                $scope.isIE = true;
                $('label').removeClass('i-checks i-checks-sm i-checks-lg');
            }
            // Invoke the plugin
            $('input, textarea').placeholder();
        }
    });
}]);
