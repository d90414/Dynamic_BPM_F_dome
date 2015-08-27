'use strict';

angular.module('ASS.login').controller('checkLoginCtrl', ['$scope', 'rsa', 'loginService', 'myRoot', '$rootScope', 'detailService', '$state', '$cookieStore', '$window', 'myAlert', 'myConfirm', 'scartService', 'accountService', 'orderpayService', 'confirmorderService', 'electronicContractSevice',
    function ($scope, rsa, loginService, myRoot, $rootScope, detailService, $state, $cookieStore, $window, myAlert, myConfirm, scartService, accountService, orderpayService, confirmorderService, electronicContractSevice) {

        // 保存输入值
        $scope.loginuser = {};

        /**
         * 是否显示安全控件。
         * true显示
         * false隐藏
         */
        $scope.pwdfocus = false;

        /**
         * 控制页面显示内容标记。
         * 1 未登录，显示资金账号登录输入；
         * 2 已登录注册账户，切换资金账号登录
         * @type {string}
         */
        $scope.showType = "2";

        /**
         * 浏览器类型。
         * 0 IE浏览器
         * 2 谷歌42版本及以上
         * 1 其他
         * @type {number}
         */
        $scope.browserType = 1;

        // 检测浏览器版本，用于安全控件
        var checkBrowserVersion = function () {
            var version = $window.navigator.appVersion;
            if (!version) {
                myAlert('非常抱歉，无法识别您使用的浏览器类型，建议您使用IE8以上浏览器/谷歌浏览器/火狐试试。');
            } else {
                // 谷歌42版本以上无法使用当前密码控件，区别对待
                if (version.indexOf('Chrome') != -1) {
                    var subVersion = version.split('Chrome/')[1].substring(0, 2);
                    $scope.browserType = (subVersion > 41 ? 2 : 1);
                } else {
                    if ($.browser.chrome || $.browser.firefox) {
                        $scope.browserType = 1;
                    } else if ($.browser.msie && $.browser.version > 6) {
                        $scope.browserType = 0;
                    } else if ($.browser.msie && $.browser.version <= 6) {
                        myAlert("非常抱歉，您的浏览器版本较低，建议您升级版本后重试。");
                        $state.go("kfps.index");
                    } else {
                        $scope.browserType = 0;
                    }
                }
            }
        };

        //刷新图片验证码
        $scope.changeVerifyCode = function () {
            $scope.uuid = new Date().getTime() + "-" + parseInt(Math.random() * 100000000);
            $scope.captcha = myRoot + "/kfps_validate?uuid=" + $scope.uuid;
        };

        // 检查是否安装了安全控件
        $scope.checkPwdPlugin = function () {
            if ($scope.browserType == 2) {
                $scope.pwdfocus = true;
            } else {
                var safeEdit = document.getElementById('kdeditCtrl');
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
                        "是否下载安全控件？", "立即下载", "取消"
                    );
                }
            }
        };

        // 获取页面输入密码
        var getPassword = function () {
            var password = "";
            if ($scope.browserType != 2) {
                // 密码输入框约定使用ID名为kdeditCtrl
                var passwordElement = document.getElementById('kdeditCtrl');
                try {
                    password = passwordElement.GetEncryptPassword();
                } catch (e) {
                    myConfirm("您的浏览器尚未安装控件，请下载相应的activex控件，安装完成需要重启浏览器",
                        function () {
                            location.href = "public/download/kdeditInstall.exe";
                        },
                        function () {
                        },
                        "是否下载安全控件？", "立即下载", "取消");
                }
                if (!password) {
                    myAlert("请输入密码！");
                    return;
                }
            } else {
                password = document.getElementById('kdeditCtrl').value;
                if (password.length < 6) {
                    myAlert("您输入的密码不正确！");
                    return;
                }
                password = rsa.getPassword(password);
            }
            return password;
        };


        // TODO 页面跳转逻辑 这里有问题，不应该直接跳转到订单页面，应该用一个参数设置跳转到哪个页面或者不跳转
        $scope.check = function () {
            if (!$window.sessionStorage.sessionid) {
                $scope.showType = '1';
                return;
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
                        $scope.bindType == '2';
                        $state.go('kfps.orderCheck');
                        return;
                    }
                    // 不是交易登录，使用资金账号登录
                    if ('3' != $scope.user.LOGIN_TYPE) {
                        $scope.showType = '2';
                        if ($scope.user.FUNDSACCT_CODE_VIEW && $scope.user.FUNDSACCT_CODE_VIEW != "") {
                            $scope.zijinList = $scope.user.FUNDSACCT_CODE_VIEW.split(',');
                            $scope.loginuser.fundsacct_code = $scope.zijinList[0];
                        }
                        return;
                    }
                    $state.go('kfps.orderCheck');
                });
            }
        };


        // 非资金账号登录后，如果已绑定了资金账号（可能多个），可选择一个资金账号，输入密码正确则切换为资金账号登录。
        $scope.toggleToFundAccount = function () {
            $scope.pwdfocus = false;
            orderpayService.checkAccount(
                $scope.loginuser.fundsacct_code,
                getPassword()).then(function (data) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        $scope.check();
                    }
                });
        };


        // 未登录的情况下使用资金账号登录
        $scope.loginByFundAccount = function () {
            $scope.pwdfocus = false;

            $scope.loginuser['uuid'] = $scope.uuid;
            $scope.loginuser['logintype'] = 3;
            $scope.loginuser['userpassword'] = getPassword();

            loginService["subLogin"]($scope.loginuser).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    if (data[0][0].SESSION_ID != "") {
                        $window.sessionStorage.sessionid = data[0][0].SESSION_ID;
                        $scope.session_id = data[0][0].SESSION_ID;

                        $window.sessionStorage.isLogin = '1';
                        $window.sessionStorage.IS_BIND = data[0][0].IS_BIND;
                        $rootScope.getNoReadMessages(true);
                        $rootScope.getMyFavorites();
                        $scope.check();
                    }
                } else {
                    // 登录失败，验证码刷新，输入框清空
                    $scope.changeVerifyCode();
                    //$scope.loginuser.regcode = "";
                }
            });
        };

        // 检测浏览器版本
        checkBrowserVersion();

        $scope.changeVerifyCode();

        $scope.check();

    }])
;
