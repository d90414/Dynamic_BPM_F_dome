'use strict';

angular.module('ASS.confirmorder').controller('ConfirmorderCtrl', ['$scope','rsa','loginService','myRoot', '$rootScope', 'detailService', '$state', '$cookieStore', '$window', 'myAlert', 'myConfirm', 'scartService', 'accountService', 'orderpayService', 'confirmorderService', 'electronicContractSevice',
    function ($scope,rsa,loginService,myRoot, $rootScope, detailService, $state, $cookieStore, $window, myAlert, myConfirm, scartService, accountService, orderpayService, confirmorderService, electronicContractSevice) {

        // 产品来源
        var ORDER_PRD_SOURCE = {
            PIF: "0",
            JZJY: "1",
            OTC: "2"
        };

        // 1、已开基金账户 2、未开基金账户
        var HAS_FUNDS_ACCT = {
            YES: "1",
            NO: "2"
        };

        // 1、有效 	2、无效
        var RISK_TEST = {
            VALID: "1",
            INVALID: "2"
        };

        // 1、已签署约定书	2、未签署约定书
        var IS_SIGN_TIFA = {
            YES: "1",
            NO: "2"
        };

        // 1、已签署合同 2、未签署合同
        var IS_SIGN_CONTRACT = {
            YES: "1",
            NO: "2"
        };

        // 1、匹配   2、不匹配（强制不能购买产品，OTC使用） 3、不匹配（可选择）
        var RISK_MATCH = {
            MATCHED: "1",
            MISMATCHED_FORBID_BUY: "2",
            MISMATCHED_MAY_BUY: "3"
        };

        $scope.order = $cookieStore.get("order") ? $cookieStore.get("order") : null;

        //$scope.productlist = $cookieStore.get("productlist") ? $cookieStore.get("productlist") : [];

        $scope.productlist = [];
        $scope.zxcplist = [];
        $scope.lccplist = [];
        $scope.gmjjlist = [];
        $scope.SUMPAYMONEY = 0;
        $scope.type = "";
        $scope.bindType = '1';
        $scope.submitting = 1;
        /**
         * 1  订单信息
         * 2  验证资金账号
         * 3  您的账户暂未开通购买OTC产品的权限
         * 4  风险测评无效 && OTC产品
         * 5  风险测评无效 && 其他产品
         * 6  适当性匹配 && 步骤1
         * 7  未开通基金账户
         * 9  风险测评无效 && 集中交易产品
         * 10 未签署约定书（针对集合理财产品）
         * 11 未签署理财合同（针对集合理财产品）
         * 12 适当性不匹配，禁止购买OTC产品
         * 13 展示风险揭示书
         * @type {string}
         */
        $scope.showType = "1";
        $scope.browserType = 1;
        $scope.isfxjs = '0';
        $scope.checks = '0';
        $scope.step = '1';
        // TODO 是否已开通现金支付功能：1表示未开通?
        $scope.yhkzf = '0';
        $scope.payway = 2;
        $scope.htqd = 0;
        $scope.loginuser = {};
        $scope.fundsacct_code = "";
        $scope.zijinList = [];
        $scope.payWays=['保证金支付', '现金支付'];
        $scope.checked = false;

        // 是否已经看过风险揭示书：true看过，false没有
        $scope.hasShowRiskDisclosure = false;

        //刷新图片验证码
        $scope.refresh = function () {
            $scope.uuid = new Date().getTime() + "-" + parseInt(Math.random() * 100000000);
            $scope.captcha = myRoot + "/kfps_validate?uuid=" + $scope.uuid;
        };

        $scope.uuid = new Date().getTime() + "-" + parseInt(Math.random() * 100000000);
        $scope.captcha = myRoot + "kfps_validate?uuid=" + $scope.uuid;

        $scope.version = $window.navigator.appVersion;
        if ($scope.version.indexOf('Chrome') >= 0) {
            var v = $scope.version.split("Chrome/");
            var v1 = v[1].substring(0, 2);
            if (v1 > 41) {
                $scope.browserType = 2;
            } else {
                $scope.browserType = 1;
            }
        } else {
            /*根据浏览器版本控制安全控件*/
            if ($.browser.chrome || $.browser.firefox) {
                $scope.browserType = 1;
            } else if ($.browser.msie && $.browser.version > 6) {
                $scope.browserType = 0;
            } else if ($.browser.msie && $.browser.version <= 6) {
                myAlert("浏览器版本过低，请升级版本后重试！");
                $state.go("kfps.index");
            } else {
                $scope.browserType = 0;
            };
        }

        $scope.check = function () {
            if (!$window.sessionStorage.sessionid) {
                $state.go('auth.checkLogin');
            } else  {
                accountService.getLoginUserInfo().then(function (data) {
                    $scope.user = data[0][0];

                    // 未绑定注册号
                    if (!$scope.user.PHONE_NO ) {
                        $scope.showType = '02';
                        return;
                    }
                    // 未绑定交易账户
                    if (!$scope.user.FUNDSACCT_CODE_VIEW) {
                        $scope.showType = '01';
                        return;
                    }

                    // 不是交易登录，使用资金账号登录
                    if ('3' != $scope.user.LOGIN_TYPE) {
                        $state.go('auth.checkLogin');
                    }

                    // $cookieStore里有订单
                    if ($scope.order) {
                        var list = [$scope.order];

                        confirmorderService.checkType(list).then(function (data) {
                            if (data && data[0] && data[0][0]) {
                                var riskMatch = data[0][0];

                                switch ($scope.order.PRO_SOU) {
                                    case ORDER_PRD_SOURCE.PIF :
                                        break;
                                    case ORDER_PRD_SOURCE.JZJY :
                                    {
                                        // TODO 客户要求：风险测评暂时注释
                                        // 风险测评无效
                                        //if (RISK_TEST.VALID != riskMatch.IS_VALID) {
                                        //    $scope.step = '1';
                                        //    $scope.showType = '9';
                                        //    return;
                                        //}

                                        //未开通基金账户
                                        if (HAS_FUNDS_ACCT.YES != riskMatch.IS_HAVE_FUNDACCT) {
                                            $window.sessionStorage.fund = JSON.stringify({
                                                ORG_CODE: $scope.order.REGI_ORG,
                                                ORG_NAME: $scope.order.REGI_ORG_DESC
                                            });
                                            $scope.showType = '7';
                                            return;
                                        }


                                        // 如果是集合理财产品，做额外判断
                                        if ('1' == $scope.order.IS_JHLC) {

                                            // 是否已签署约定书
                                            if (IS_SIGN_TIFA.YES != riskMatch.IS_SIGN_TIFA) {
                                                electronicContractSevice.getContract({
                                                    ectype: '3', // TODO 暂时写死
                                                    ecsno: '3001'// TODO 暂时写死
                                                }).then(function (data) {
                                                    if (data[0]) {
                                                        $scope.agreement = "";
                                                        for (var i = 0; i < data[0].length; i++) {
                                                            $scope.agreement += data[0][i].CONTENT;
                                                        }
                                                    }
                                                });
                                                $scope.showType = '10';
                                                $scope.hasShowRiskDisclosure = true;
                                                return;
                                            }

                                            // 是否已签署合同
                                            if (IS_SIGN_CONTRACT.YES != riskMatch.IS_SIGN_CONTRACT) {
                                                // 签合同前显示风险揭示书
                                                // 查询风险揭示书
                                                if (!$scope.hasShowRiskDisclosure) {
                                                    electronicContractSevice.getContract({
                                                        ectype: 4,
                                                        ecsno: $scope.order.JHLC_RISKSNO
                                                    }).then(function (data) {
                                                        if (data[0]) {
                                                            $scope.riskDisclosure = "";
                                                            for (var i = 0; i < data[0].length; i++) {
                                                                $scope.riskDisclosure += data[0][i].CONTENT;
                                                            }
                                                        }
                                                        $scope.showType = '13';
                                                        $scope.hasShowRiskDisclosure = true;
                                                        return;
                                                    });
                                                }

                                                electronicContractSevice.getContract({
                                                    ectype: $scope.order.JHLC_ECTYPE,
                                                    ecsno: $scope.order.JHLC_ECSNO
                                                }).then(function (data) {
                                                    if (data[0]) {
                                                        $scope.contract = "";
                                                        for (var i = 0; i < data[0].length; i++) {
                                                            $scope.contract += data[0][i].CONTENT;
                                                        }
                                                    }
                                                });
                                                $scope.showType = '11';
                                                return;
                                            }
                                        }


                                        // 适当性不匹配，仍可购买
                                        if (RISK_MATCH.MATCHED != riskMatch.IS_MATCH && $scope.step == '1') {

                                            $scope.showType = '6';
                                            return;
                                        }

                                        break;
                                    }
                                    case ORDER_PRD_SOURCE.OTC :
                                    {
                                        // 未开通购买OTC产品的权限
                                        if ($scope.user.ACCT_EXT_ATTR.indexOf('2') < 0) {
                                            $scope.showType = '3';
                                            return;
                                        }

                                        // 风险测评无效
                                        if (RISK_TEST.VALID != riskMatch.IS_VALID) {
                                            $scope.step = '1';
                                            $scope.showType = '4';
                                            return;
                                        }

                                        // 适当性不匹配，禁止购买OTC产品
                                        if (RISK_MATCH.MATCHED != riskMatch.IS_MATCH) {
                                            $scope.showType = '12';
                                            return;
                                        }

                                        break;
                                    }
                                }

                                $scope.order['IS_MATCH'] = riskMatch.IS_MATCH;
                                $scope.step = '2';
                                $scope.showType = '1';
                                if ($scope.order.LVL2_TYPE == "6") {
                                    $scope.type = "gmjj";
                                } else if ($scope.order.LVL2_TYPE == "4") {
                                    $scope.type = "zgcp";
                                } else if ($scope.order.LVL2_TYPE == "486") {
                                    $scope.type = "gtsc";
                                } else if ($scope.order.LVL1_TYPE == "3") {
                                    $scope.type = "zxcp";
                                }

                                // 如果不是现金支付
                                if ($scope.order.PAY_WAY.indexOf('1') < 0) {
                                    $scope.yhkzf = '1';
                                }

                                $scope.SUMPAYMONEY = $scope.order.paymoney;
                                $scope.compare = angular.copy($scope.order);
                            } else {
                                $scope.step = '1';
                                $scope.showType = '4';
                                return;
                            }
                        });
                    }
                });
            }
        };

        $scope.check();

        $scope.nextstep = function () {
            $scope.step = '2';
            $scope.check();
        };


        $scope.submit = function (val) {
            // 检查金额
            $scope.change(val, false);

            if (!$scope.payWay) {
                myAlert("请选择支付方式");
                return;
            }

            var list = [val];
            scartService.orderConfim($scope.payWay, list).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $window.sessionStorage.orderNo = data[0][0].TRD_SNO;
                    $state.go("kfps.orderpay");
                }
            });
        };

        $scope.change = function (val, flag) {
            if (flag) {
                if (isNaN(val.BUY_NUM)) {
                    val.BUY_NUM = 1;
                    myAlert("请输入正确数字！");
                    return;
                }
                if (isNaN(val.BUY_NUM) || val.BUY_NUM < 1) {
                    val.BUY_NUM = 1;
                    myAlert("购买数量不得小于1！");
                    return;
                }
                $scope.SUMPAYMONEY = (new Number($scope.SUMPAYMONEY) - new Number(val.paymoney)).toFixed(2);
                val.paymoney = (val.BUY_PERIOD * val.BUY_NUM).toFixed(2);
                $scope.SUMPAYMONEY = (new Number($scope.SUMPAYMONEY) + new Number(val.paymoney)).toFixed(2);
            } else {
                detailService.getIsOneBuy(val.PRO_SOU, val.INST_ID).then(function (data) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        if (isNaN(val.BUY_MONEY)) {
                            val.BUY_MONEY = val.INVE_START;
                            val.paymoney = val.INVE_START;
                            $scope.SUMPAYMONEY = val.INVE_START;
                            myAlert("请输入正确数字！");
                            return;
                        }
                        if (data[0][0] == '1' && new Number(val.BUY_MONEY) < new Number(val.INVE_START)) {
                            val.BUY_MONEY = val.INVE_START;
                            val.paymoney = val.INVE_START;
                            $scope.SUMPAYMONEY = val.INVE_START;
                            myAlert("购买金额不能小于投资起点！");
                            return;
                        } else if (data[0][0] == '2' && new Number(val.BUY_MONEY) < new Number(val.addto_min_buy)) {
                            val.BUY_MONEY = val.addto_min_buy;
                            val.paymoney = val.addto_min_buy;
                            $scope.SUMPAYMONEY = val.addto_min_buy;
                            myAlert("购买金额不能小于再次起购起点！");
                            return;
                        }
                        $scope.SUMPAYMONEY = (new Number($scope.SUMPAYMONEY) - new Number(val.paymoney)).toFixed(2);
                        val.paymoney = val.BUY_MONEY;
                        $scope.SUMPAYMONEY = (new Number($scope.SUMPAYMONEY) + new Number(val.paymoney)).toFixed(2);
                    } else {
                        myAlert('下单失败，请重试！');
                        return;
                    }
                });

            }
        };

        $scope.signAgreement = function () {
            electronicContractSevice.agreementSign({
                inst_id: $scope.order.INST_ID
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                    $scope.check();
                }
            })
        };

        $scope.signContract = function () {
            electronicContractSevice.contractSign({
                inst_id: $scope.order.INST_ID
            }).then(function (data) {
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                    $scope.nextstep();
                }
            })
        };

        $scope.chooseBuyWay = function (payWay) {
            $scope.payWay = payWay;
            $scope.checked = true;
        };







        // 兼容IE
        $scope.initPlaceholder = function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) $('label').removeClass('i-checks i-checks-sm i-checks-lg');
                $('input, textarea').placeholder();
            }
        };

        $scope.$on('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 8) {
                $scope.isIE8 = true;
                $("label").removeClass("i-checks i-checks-sm i-checks-lg");
                $('input, textarea').placeholder();
            }
        });

    }])
;
