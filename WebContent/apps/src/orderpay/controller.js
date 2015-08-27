'use strict';

angular.module('ASS.orderpay').controller('OrderpayCtrl', ['$scope', '$rootScope', '$timeout', '$state', 'pwrecoveryService', 'loginService', 'myConfirm', 'myAlert', 'orderpayService', 'accountService', '$window', 'accountSafetyService',
    function ($scope, $rootScope, $timeout, $state, pwrecoveryService, loginService, myConfirm, myAlert, orderpayService, accountService, $window, accountSafetyService) {
        $scope.pw = 0;
        $scope.user = [];
        $scope.logintype = 0;
        $scope.orderList = [];
        $scope.paymoney = 0;
        $scope.zjpassword = "";
        $scope.fund_avl = 0;

        $scope.code_id = 0;
        $scope.code_no = "";
        $scope.browserType = 0; //浏览器类型
        //chrome浏览器42版本不支持安全控件，过滤
        $scope.version = $window.navigator.appVersion;
        if ($scope.version.indexOf('Chrome') >= 0) {
            var v = $scope.version.split("Chrome/");
            var v1 = v[1].substring(0, 2);
            if (v1 > 41) {
                $scope.browserType = 2;
            }
        }
        $scope.codetip = "获取验证码";
        /*获取验证码*/
        var wait = 120;
        $scope.getcode = function (flag) {
            if (wait == 0) {
                $scope.codetip = "获取验证码";
                wait = 120;
            } else {
                if (flag) {
                    $scope.codetip = "重新发送(" + wait + ")";
                    wait--;
                    $timeout(function () {
                        $scope.getcode(true);
                    }, 1000);
                } else {
                    $scope.codetip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>获取中...';
                    accountSafetyService.sendPhoneCertifyCode({
                        phone_no: $scope.user.PHONE_NO,
                        biz_type: "orderpay"
                    }).then(function (data) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            $scope.code_id = data[0][0].code_id;
                            $scope.codetip = "重新发送(" + wait + ")";
                            wait--;
                            $timeout(function () {
                                $scope.getcode(true);
                            }, 1000);
                        } else {
                            $scope.codetip = "获取验证码";
                            wait = 120;
                        }
                    });
                }
            }
        };

        if ($window.sessionStorage.sessionid) {
            accountService.getLoginUserInfo().then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.user = data[0][0];
                    orderpayService.getOrderList($window.sessionStorage.orderNo).then(function (data) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0 || data[0][0]) {
                            $scope.orderList = data[0];
                            for (var i = 0; i < $scope.orderList.length; i++) {
                                $scope.paymoney = (new Number($scope.paymoney) + new Number($scope.orderList[i].BUY_MONEY)).toFixed(2);
                            }
                            orderpayService.getJZJYZJAccount().then(function (data) {
                                $scope.fund_avl = new Number(data[0][0].FUNDAVL);
                            });
                        } else {
                            myAlert("查询失败！请稍后重试");
                            return;
                        }

                        /*if($scope.orderList[0].PRO_SOU=='1'){
                         orderpayService.getJZJYZJAccount().then(function(data){
                         $scope.fund_avl = data[0][0].FUNDAVL;
                         });
                         }else if($scope.orderList[0].PRO_SOU=='2'){
                         orderpayService.getOTCZJAccount().then(function(data){
                         $scope.fund_avl = data[0][0].FUND_AVL;
                         });
                         }*/
                    });
                } else {
                    myAlert("查询失败！请稍后重试");
                    return;
                }
            });
        }

        $scope.confirm = function () {
            if ((new Number($scope.paymoney) - new Number($scope.fund_avl)).toFixed(2) > 0) {
                myAlert("余额不足");
                return;
            }
            orderpayService.subOrder({
                trd_sno: $window.sessionStorage.orderNo,
                pay_way: $scope.orderList[0].PAY_WAY,
                browser_type: $scope.browserType,
                phone_no: $scope.user.PHONE_NO,
                verify_code: $scope.user.code_no
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE) {
                    if ('0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                        $state.go("kfps.paysuccess");
                    } else if ('-1' == data[2].ANS_MSG_HDR.MSG_CODE.indexOf('-7003') && '-1' == data[2].ANS_MSG_HDR.MSG_CODE.indexOf('-7015')) {
                        $state.go("page.account.orders", {order_type: 'failedToPayOrders'});
                    }
                }
            });
        };

        $scope.gotoRecharge = function () {
            $rootScope.beforeRechargeUrl = 'kfps.orderpay';
            $state.go('page.account.transfer');
        };

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
