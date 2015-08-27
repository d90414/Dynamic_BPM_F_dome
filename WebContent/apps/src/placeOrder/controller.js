'use strict';

angular.module('ASS.placeOrder').controller('OrderCtrl', ['$scope', '$http', 'rsa', 'loginService', 'myRoot', '$rootScope', 'detailService', '$state', '$cookieStore', '$window', '$modal', 'myAlert', 'myConfirm', 'scartService', 'accountService', 'orderpayService', 'confirmorderService', 'electronicContractSevice', 'orderService', 'otcService',
    function ($scope, $http, rsa, loginService, myRoot, $rootScope, detailService, $state, $cookieStore, $window, $modal, myAlert, myConfirm, scartService, accountService, orderpayService, confirmorderService, electronicContractSevice, orderService, otcService) {

        // 产品来源
        var ORDER_PRD_SOURCE = {
            PIF: '0',
            JZJY: '1',
            OTC: '2'
        };

        // 1、已开基金账户 2、未开基金账户
        var HAS_FUNDS_ACCT = {
            YES: '1',
            NO: '2'
        };

        // 1、有效 	2、无效
        var RISK_TEST = {
            VALID: '1',
            INVALID: '2'
        };

        // 1、已签署约定书	2、未签署约定书
        var IS_SIGN_TIFA = {
            YES: '1',
            NO: '2'
        };

        // 1、已签署合同 2、未签署合同
        var IS_SIGN_CONTRACT = {
            YES: '1',
            NO: '2'
        };

        // 1、匹配   2、不匹配（强制不能购买产品，OTC使用） 3、不匹配（可选择）
        var RISK_MATCH = {
            MATCHED: '1',
            MISMATCHED_FORBID_BUY: '2',
            MISMATCHED_MAY_BUY: '3'
        };

        // 1 已开通登记账户  2 未开通
        var IS_HAVE_TACODE = {
            YES: '1',
            NO: '2'
        };

        // 电子约定书类型和编号
        var AGREEMENT_ECTYPE = '3';   // TODO 暂时写死
        var AGREEMENT_ECSNO = '3001'; // TODO 暂时写死

        $scope.order = $cookieStore.get('order') ? $cookieStore.get('order') : null;
        $scope.total = $scope.subtotal = 0;
        if ($scope.order && $scope.order.BUY_MONEY) {
            $scope.total = $scope.subtotal = $scope.order.BUY_MONEY;
        }

        /**
         * '-01'    未登录，显示资金账号登录
         * '-02'    未绑定交易账户
         * '-03'    未绑定注册号（手机号码）
         * '-04'    不是交易登录，使用资金账号登录
         * '-05'    没有订单
         * '-06'    没有查到风险匹配信息（返回错误）
         * '-07'    查询到的账户信息为空，要求使用资金账号重新登录
         * '-j01'   未开通基金账户
         * '-jh01'  没有签署电子约定书和电子合同（签电子合同要风险揭示书）
         * '-jh02'  没有签署电子合同（签电子合同要风险揭示书）
         * '-j02'   适当性不匹配，仍可购买
         * '-t01'   未开通购买OTC产品的权限
         * '-t02'   未开通OTC登记账户
         * '-t03'   适当性不匹配，禁止购买OTC产品
         */
        $scope.showType = '-1';

        $scope.payWays = [];
        $scope.payWayDesc = ['保证金支付', '现金支付'];
        $scope.checked = false;
        $scope.qualification = {
            ignoreMismatch: false // 是否忽略适当性匹配结果
        };

        // 是否已经看过风险揭示书：true看过，false没有
        $scope.hasShowRiskDisclosure = false;

        // 是否请求数据中
        $scope.isLoading = false;

        $scope.step = 1;

        $scope.check = function () {
            if (!$window.sessionStorage.sessionid) {
                $scope.showType = '-01';
                return;
            } else {
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $scope.user = data[0][0];

                        // 未绑定注册号（手机号码）
                        if (!$scope.user.PHONE_NO) {
                            $scope.showType = '-02';
                            return;
                        }
                        // 未绑定交易账户
                        else if (!$scope.user.FUNDSACCT_CODE_VIEW) {
                            $scope.showType = '-03';
                            return;
                        }
                        // 不是交易登录，使用资金账号登录
                        else if ('3' != $scope.user.LOGIN_TYPE) {
                            $scope.showType = '-04';
                            if ($scope.user.FUNDSACCT_CODE_VIEW && $scope.user.FUNDSACCT_CODE_VIEW != '') {
                                $scope.zijinList = $scope.user.FUNDSACCT_CODE_VIEW.split(',');
                                $scope.fundsacct_code = $scope.zijinList[0];
                            }
                            return;
                        }
                        // $cookieStore里有订单
                        else if ($scope.order) {
                            var list = [$scope.order];
                            if ($scope.order.PRO_SOU) {
                                if ($scope.order.PRO_SOU == ORDER_PRD_SOURCE.JZJY) {
                                    confirmorderService.checkType(list).then(function (data) {
                                        if (data && data[0] && data[0][0]) {
                                            var riskMatch = data[0][0];
                                            // 风险测评
                                            if (RISK_TEST.VALID != riskMatch.IS_VALID) {
                                                $scope.showType = '-06';
                                                return;
                                            }
                                            // 未开通基金账户
                                            if (HAS_FUNDS_ACCT.YES != riskMatch.IS_HAVE_FUNDACCT) {
                                                $window.sessionStorage.fund = JSON.stringify({
                                                    ORG_CODE: $scope.order.REGI_ORG,
                                                    ORG_NAME: $scope.order.REGI_ORG_DESC
                                                });
                                                $scope.showType = '-j01';
                                                return;
                                            }
                                            // 如果是集合理财产品，做额外判断
                                            else if ('1' == $scope.order.IS_JHLC) {
                                                if (IS_SIGN_TIFA.YES != riskMatch.IS_SIGN_TIFA && IS_SIGN_CONTRACT.YES != riskMatch.IS_SIGN_CONTRACT) {
                                                    // 查询电子约定书
                                                    electronicContractSevice.getContract({
                                                        ectype: AGREEMENT_ECTYPE,
                                                        ecsno: AGREEMENT_ECSNO
                                                    }).then(function (data) {
                                                        if (data[0]) {
                                                            $scope.agreement = '';
                                                            for (var i = 0; i < data[0].length; i++) {
                                                                $scope.agreement += data[0][i].CONTENT;
                                                            }
                                                        }
                                                    });
                                                    // 查询风险揭示书
                                                    electronicContractSevice.getContract({
                                                        ectype: 4,
                                                        ecsno: $scope.order.JHLC_RISKSNO
                                                    }).then(function (data) {
                                                        if (data[0]) {
                                                            $scope.riskDisclosure = '';
                                                            for (var i = 0; i < data[0].length; i++) {
                                                                $scope.riskDisclosure += data[0][i].CONTENT;
                                                            }
                                                        }
                                                    });
                                                    // 查询电子合同
                                                    electronicContractSevice.getContract({
                                                        ectype: $scope.order.JHLC_ECTYPE,
                                                        ecsno: $scope.order.JHLC_ECSNO
                                                    }).then(function (data) {
                                                        if (data[0]) {
                                                            $scope.contract = '';
                                                            for (var i = 0; i < data[0].length; i++) {
                                                                $scope.contract += data[0][i].CONTENT;
                                                            }
                                                        }
                                                    });

                                                    $scope.agreements = [{
                                                        name: '电子约定书',
                                                        action: '签署',
                                                        type: 'agreement'
                                                    }, {
                                                        name: '风险揭示书',
                                                        action: '确认',
                                                        type: 'riskDisclosure'
                                                    }, {
                                                        name: '电子合同',
                                                        action: '签署',
                                                        type: 'contract'
                                                    }];

                                                    $scope.showType = '-jh01';
                                                    return;
                                                }
                                                // 是否已签署合同
                                                else if (IS_SIGN_CONTRACT.YES != riskMatch.IS_SIGN_CONTRACT) {
                                                    // 查询风险揭示书
                                                    electronicContractSevice.getContract({
                                                        ectype: 4,
                                                        ecsno: $scope.order.JHLC_RISKSNO
                                                    }).then(function (data) {
                                                        if (data[0]) {
                                                            $scope.riskDisclosure = '';
                                                            for (var i = 0; i < data[0].length; i++) {
                                                                $scope.riskDisclosure += data[0][i].CONTENT;
                                                            }
                                                        }
                                                    });
                                                    // 查询电子合同
                                                    electronicContractSevice.getContract({
                                                        ectype: $scope.order.JHLC_ECTYPE,
                                                        ecsno: $scope.order.JHLC_ECSNO
                                                    }).then(function (data) {
                                                        if (data[0]) {
                                                            $scope.contract = '';
                                                            for (var i = 0; i < data[0].length; i++) {
                                                                $scope.contract += data[0][i].CONTENT;
                                                            }
                                                        }
                                                    });

                                                    $scope.agreements = [{
                                                        name: '风险揭示书',
                                                        action: '确认',
                                                        type: 'riskDisclosure'
                                                    }, {
                                                        name: '电子合同',
                                                        action: '签署',
                                                        type: 'contract'
                                                    }];

                                                    $scope.showType = '-jh02';
                                                    return;
                                                }
                                            }
                                            // 适当性不匹配，仍可购买
                                            if (RISK_MATCH.MATCHED != riskMatch.IS_MATCH && !$scope.qualification.ignoreMismatch) {
                                                $scope.showType = '-j02';
                                                return;
                                            }
                                        } else {
                                            $scope.showType = '-06';
                                            return;
                                        }

                                        // 支付方式设置。资管和公募基金产品只有保证金支付方式
                                        $scope.payWays = ['0'];

                                        $scope.order['IS_MATCH'] = riskMatch.IS_MATCH;
                                        $scope.step = 2;
                                    });
                                } else if ($scope.order.PRO_SOU == ORDER_PRD_SOURCE.OTC) {
                                    // 未开通购买OTC产品的权限
                                    if ($scope.user.ACCT_EXT_ATTR.indexOf('2') < 0) {
                                        $scope.agreements = [{
                                            name: 'OTC电子约定书',
                                            action: '签署',
                                            type: 'otcAgreement'
                                        }, {
                                            name: '用户电子协议',
                                            action: '签署',
                                            type: 'otcContract'
                                        }];
                                        $scope.otcActions = [{
                                            name: '开通支付账号'
                                        }, {
                                            name: '开通登记账号'
                                        }];

                                        $scope.showType = '-t01';
                                        return;
                                    } else {
                                        confirmorderService.checkType(list).then(function (data) {
                                            if (data && data[0] && data[0][0]) {
                                                var riskMatch = data[0][0];
                                                // 风险测评无效
                                                if (RISK_TEST.VALID != riskMatch.IS_VALID) {
                                                    $scope.showType = '-06';
                                                    return;
                                                }
                                                // 未开通登记账户
                                                else if (IS_HAVE_TACODE.YES != riskMatch.IS_HAVE_TACODE) {
                                                    $scope.showType = '-t02';
                                                    return;
                                                }
                                                // 适当性不匹配，禁止购买OTC产品
                                                else if (RISK_MATCH.MATCHED != riskMatch.IS_MATCH) {
                                                    $scope.showType = '-t03';
                                                    return;
                                                }
                                            } else {
                                                $scope.showType = '-06';
                                                return;
                                            }

                                            // 支付方式设置
                                            var p = $scope.order.PAY_WAY.split(',');
                                            for (var i = 0; i < p.length; i++) {
                                                if (riskMatch.PAY_WAY.indexOf(p[i]) != -1) {
                                                    $scope.payWays.push(p[i]);
                                                }
                                            }

                                            $scope.order['IS_MATCH'] = riskMatch.IS_MATCH;
                                            $scope.step = 2;
                                        });
                                    }
                                }
                            }
                        } else {
                            // 查询购物车

                            // 购物车里也没有订单，提示
                            $scope.showType = '-05';
                        }
                    } else {
                        // 查询不到登录信息
                        $scope.showType = '-07';
                        return;
                    }
                });
            }
        };

        $scope.reloadPage = function () {
            $state.reload();
        };

        $scope.submitOrder = function (order) {
            if (!order.BUY_MONEY) {
                myAlert('请输入购买金额');
                return;
            } else if (isNaN(order.BUY_MONEY)) {
                myAlert('购买金额只能为数字');
                return;
            } else {
                // 是否为首次购买
                orderService.isFirstPurchase({
                    pro_sou: order.PRO_SOU,
                    inst_id: order.INST_ID
                }).then(function (data) {
                    if (data[0][0]) {
                        if (data[0][0].IS_ONEBUY == '1' && new Number(order.BUY_MONEY) < new Number(order.INVE_START)) {
                            order.BUY_MONEY = order.INVE_START;
                            $scope.subtotal = order.INVE_START;
                            $scope.total = order.INVE_START;
                            myAlert('首次购买金额不能小于投资起点' + order.INVE_START + '元！');
                            return;
                        } else if (data[0][0].IS_ONEBUY == '2' && new Number(order.BUY_MONEY) < new Number(order.ADDTO_MIN_BUY)) {
                            order.BUY_MONEY = order.ADDTO_MIN_BUY;
                            $scope.subtotal = order.ADDTO_MIN_BUY;
                            $scope.total = order.ADDTO_MIN_BUY;
                            myAlert('再次购买金额不能小于追加购买起点' + order.ADDTO_MIN_BUY + '元！');
                            return;
                        }
                    }
                    if (!$scope.payWay) {
                        myAlert('请选择支付方式');
                        return;
                    } else {
                        orderService.orderApply({
                            pay_way: $scope.payWay,
                            recommended: $scope.recommended,
                            ord_datas: [order]
                        }).then(function (data) {
                            if (data && data[0] && data[0]) {
                                $window.sessionStorage.orderNo = data[0][0].TRD_SNO;
                                $state.go('kfps.orderpay');
                            }
                        });
                    }
                });
            }
        };

        $scope.updateTotal = function (order) {
            if (!isNaN(order.BUY_MONEY)) {
                $scope.total = $scope.subtotal = order.BUY_MONEY;
            }
        };

        $scope.signAgreement = function () {
            $scope.isLoading = true;
            electronicContractSevice.agreementSign({
                inst_id: $scope.order.INST_ID
            }).then(function (data) {
                $scope.isLoading = false;
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                    $scope.check();
                }
            })
        };

        $scope.signContract = function () {
            $scope.isLoading = true;
            electronicContractSevice.contractSign({
                inst_id: $scope.order.INST_ID
            }).then(function (data) {
                $scope.isLoading = false;
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                    $scope.check();
                }
            })
        };

        $scope.signAllAgreements = function () {
            $scope.isLoading = true;
            electronicContractSevice.allAgreementsSign({
                inst_id: $scope.order.INST_ID
            }).then(function (data) {
                $scope.isLoading = false;
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                    $scope.check();
                }
            })
        };

        $scope.gotoDoSomething = function (url) {
            $rootScope.goBackTo = 'kfps.orderCheck';
            $state.go(url);
        };

        $scope.gotoRiskTest = function () {
            $rootScope.beforeRiskTestUrl = 'kfps.orderCheck';
            $state.go('page.account.stockRiskTest', {businessId: $rootScope.stockRiskTestId});
        };

        $scope.gotoOpenFund = function () {
            $rootScope.beforeOpenFundUrl = 'kfps.orderCheck';
            $state.go('kibh.biz.openFund', {businessId: $rootScope.openFundId});
        };

        $scope.readArgument = function (agreement) {
            switch (agreement.type) {
                case 'agreement':
                    agreement.content = $scope.agreement;
                    break;
                case 'riskDisclosure':
                    agreement.content = $scope.riskDisclosure;
                    break;
                case 'contract':
                    agreement.content = $scope.contract;
                    break;
                // otc电子协议、约定书页面写死
                case 'otcAgreement':
                    agreement.static = 'otcAgreement';
                    break;
                case 'otcContract':
                    agreement.static = 'otcContract';
                    break;
            }
            $modal.open({
                backdrop: 'static',
                size: 'lg',
                templateUrl: 'apps/src/placeOrder/agreement.html',
                controller: ['$scope', '$rootScope', '$modalInstance', function ($scope, $rootScope, $modalInstance) {
                    $scope.agreement = agreement;

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $modalInstance.result.then(function () {
                        $scope.cancel();
                    });
                }]
            });
        };

        // 签署电子约定书、电子协议，开通支付账号、登记账号
        $scope.openOtcAccount = function () {
            $scope.isLoading = true;
            otcService.openOtcAccount({
                ta_code: $scope.order.REGI_ORG
            }).then(function (data) {
                $scope.isLoading = false;
                if (data && data[2] && data[2].ANS_MSG_HDR && data[2].ANS_MSG_HDR.MSG_CODE && data[2].ANS_MSG_HDR.MSG_CODE == '0') {
                    $scope.check();
                }
            });
        };

        // 开通登记账号
        $scope.openOtcReg = function () {
            $scope.isLoading = true;
            otcService.openOtcReg({
                ta_code: $scope.order.REGI_ORG
            }).then(function (data) {
                $scope.isLoading = false;
                if (data && data[2] && data[2].ANS_MSG_HDR && data[2].ANS_MSG_HDR.MSG_CODE && data[2].ANS_MSG_HDR.MSG_CODE == '0') {
                    $scope.check();
                }
            });
        };

        // 开通基金账户
        $scope.openFundId = function () {
            $scope.isLoading = true;
            orderService.openFundAccount({
                ta_code: $scope.order.REGI_ORG,
                bill_mail_type: '1',
                div_method: '1'
            }).then(function (data) {
                $scope.isLoading = false;
                if (data && data[2] && data[2].ANS_MSG_HDR.MSG_CODE && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                    $scope.check();
                }
            })

        };

        $scope.chooseBuyWay = function (payWay) {
            $scope.payWay = payWay;
            $scope.checked = true;
        };


        $scope.productlist = [];
        $scope.zxcplist = [];
        $scope.lccplist = [];
        $scope.gmjjlist = [];
        $scope.type = '';
        $scope.bindType = '1';
        $scope.submitting = 1;
        $scope.browserType = 1;
        $scope.isfxjs = '0';
        // TODO 是否已开通现金支付功能：1表示未开通?
        $scope.yhkzf = '0';
        $scope.payway = 2;
        $scope.htqd = 0;
        $scope.loginuser = {};
        $scope.fundsacct_code = '';
        $scope.zijinList = [];


        //刷新图片验证码
        $scope.refresh = function () {
            $scope.uuid = new Date().getTime() + '-' + parseInt(Math.random() * 100000000);
            $scope.captcha = myRoot + '/kfps_validate?uuid=' + $scope.uuid;
        };

        $scope.uuid = new Date().getTime() + '-' + parseInt(Math.random() * 100000000);
        $scope.captcha = myRoot + 'kfps_validate?uuid=' + $scope.uuid;

        $scope.version = $window.navigator.appVersion;
        if ($scope.version.indexOf('Chrome') >= 0) {
            var v = $scope.version.split('Chrome/');
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
                myAlert('浏览器版本过低，请升级版本后重试！');
                $state.go('kfps.index');
            } else {
                $scope.browserType = 0;
            }
        }

        $scope.login = function () {
            $scope.checks = '1';
            var result = '';
            if ($scope.browserType != 2) {
                var safeEdit = document.getElementById('kdeditCtrl');
                result = safeEdit.GetEncryptPassword();
                try {
                    if (result == '') {
                        myAlert('请输入密码！');
                        $scope.checks = '0';
                        return;
                    }
                } catch (e) {
                    myAlert('请输入密码！');
                    $scope.checks = '0';
                    return;
                }
            } else {
                result = document.getElementById('kdeditCtrl').value;
                if (result.length < 6) {
                    $scope.checks = '0';
                    myAlert('输入密码不正确！');
                    return;
                }
                result = rsa.getPassword(result);
            }
            orderpayService.checkAccount($scope.fundsacct_code, result).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.check();
                } else {
                    $scope.checks = '0';
                }
            });
        };

        $scope.checkActive = function () {
            if ($scope.browserType == 2) {
                $scope.pwdfocus = true;
            } else {
                var safeEdit = document.getElementById('kdeditCtrlA');
                try {
                    safeEdit.GetEncryptPassword();
                    $scope.pwdfocus = true;
                } catch (e) {
                    myConfirm("您的浏览器尚未安装控件，请下载相应的activex控件，安装完成需要重启浏览器",
                        function () {
                            location.href = "public/download/kdeditInstall.exe";
                        },
                        function () {
                        },
                        "是否下载安全控件？",
                        "立即下载",
                        "取消"
                    );
                }
            }
        };

        //资金账号登录
        $scope.subForm = function () {
            $scope.loginuser['uuid'] = $scope.uuid;
            $scope.loginuser['logintype'] = 3;
            if ($scope.browserType != 2) {
                var safeEdit = document.getElementById('kdeditCtrlA');
                var result = safeEdit.GetEncryptPassword();
                if (!result) {
                    myAlert('请输入密码！');
                    return;
                }
                $scope.loginuser['userpassword'] = result
            } else {
                var safeEdit = document.getElementById('kdeditCtrlA').value;
                if (safeEdit.length < 6) {
                    myAlert('输入密码不正确！');
                    return;
                }
                $scope.loginuser['userpassword'] = rsa.getPassword(safeEdit);
            }

            $scope.submitting = 0;
            loginService['subLogin']($scope.loginuser).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.submitting = 1;
                    $scope.uuid = new Date().getTime() + '-' + parseInt(Math.random() * 100000000);
                    $scope.captcha = myRoot + 'kfps_validate?uuid=' + $scope.uuid;
                    if (data[0][0].SESSION_ID != '') {
                        $window.sessionStorage.sessionid = data[0][0].SESSION_ID;
                        $scope.session_id = data[0][0].SESSION_ID;

                        $window.sessionStorage.isLogin = '1';
                        accountService.getLoginUserInfo().then(function () {
                            if (data && data[0] && data[0][0]) {
                                $rootScope.global.account = data[0][0];
                                $rootScope.global.isLogin = true;
                                $window.sessionStorage.IS_BIND = data[0][0].IS_BIND;
                                $rootScope.getNoReadMessages(true);
                                $rootScope.getMyFavorites();
                                //$scope.check();
                                // fix bug428
                                $state.reload();
                            }
                        });
                    }
                } else {
                    $scope.uuid = new Date().getTime() + '-' + parseInt(Math.random() * 100000000);
                    $scope.captcha = myRoot + 'kfps_validate?uuid=' + $scope.uuid;
                    $scope.loginuser.regcode = '';
                    $scope.submitting = 1;
                    document.getElementById('kdeditCtrlA')
                }
            });
        };

        /*绑定资金账号*/
        $scope.bind = function () {
            var result = '';
            if ($scope.browserType != 2) {
                var safeEdit = document.getElementById('kdeditCtrl');
                result = safeEdit.GetEncryptPassword();
                if (!result) {
                    myAlert('请输入密码！');
                    return;
                }
            } else {
                result = document.getElementById('kdeditCtrl').value;
                if (result.length < 6) {
                    myAlert('输入密码不正确！');
                    return;
                }
                result = rsa.getPassword(result);
            }
            loginService['bindbyDeal']($scope.user.name, result).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.bindType == '1';
                    $state.go('kfps.orderpay');
                } else {
                    myAlert('验证失败，请重新输入！');
                }
            });
        }

        // 兼容IE
        $scope.$watch('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $scope.isIE8 = true;
                    $("label").removeClass("i-checks i-checks-sm i-checks-lg");
                }
                $('input, textarea').placeholder();
            }
        });

        if ($state && $state.current.name.indexOf('kfps.orderCheck') != -1) {
            $scope.check();
        }

    }]);
