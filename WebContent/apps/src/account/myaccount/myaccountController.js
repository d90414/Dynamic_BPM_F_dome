'use strict';

angular.module('ASS.account').controller('MyaccountCtrl', ['$rootScope', 'rsa', '$scope', '$window', '$state', 'accountService', 'myAlert', '$timeout', 'myConfirm',
    '$timeout', '$localStorage', 'myConfirm',
    function ($rootScope, rsa, $scope, $window, $state, accountService, myAlert, $timeout, myConfirm) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }
        $scope.user = [];
        $scope.account = [];  //获取当前用户
        $scope.licaiList = []; //理财账号列表
        $scope.zijinList = []; //资金账号列表
        $scope.changeAccount = 0; //修改状态
        $scope.changeACCT = "";//要切换的账户
        $scope.acc_no = ""; //资金账号
        $scope.codetip = "验证手机号";

        $scope.isClick = false;

        $scope.showType = {
            show: true,
            edit: false
        };

        $scope.browserType = 0; //浏览器类型
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

        $scope.search = function () {  //当前登录账号刷新
            if ($window.sessionStorage.sessionid) {
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $scope.account = data[0][0];
                        if ($scope.account.PHONE_NO) {
                            $scope.account.sex = $scope.account.SEX == '0' ? '男' : $scope.account.SEX == '1' ? '女' : '其他';
                            $scope.changeACCT = "";
                            $scope.changeAccount = 0;

                            if ($scope.account.MANGACCT_CODE_VIEW) {
                                $scope.licaiList = $scope.account.MANGACCT_CODE_VIEW.split(',');
                            }
                            if ($scope.account.FUNDSACCT_CODE_VIEW) {
                                $scope.zijinList = $scope.account.FUNDSACCT_CODE_VIEW.split(',');
                            }
                        } else {
                            myAlert("您未绑定注册用户，请绑定后查看！");
                            $state.go("auth.bindregaccount");
                        }
                    }
                });
            }
        };

        /*获取验证码*/
        var wait = 120;
        $scope.getcode = function (flag) {
            if (wait == 0) {
                $scope.codetip = "验证手机号";
                wait = 120;
            } else {
                if (flag) {
                    $scope.codetip = "重新发送(" + wait + ")";
                    wait--;
                    $timeout(function () {
                        $scope.getcode(true);
                    }, 1000);
                } else {
                    $scope.codetip = "获取中...";
                    accountService["getReCode"]($scope.user.mobile).then(function (data) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            $scope.user['code_id'] = data[0][0].code_id;
                            $scope.codetip = "重新发送(" + wait + ")";
                            wait--;
                            $timeout(function () {
                                $scope.getcode(true);
                            }, 1000);
                        } else {
                            $scope.codetip = "验证手机号";
                            wait = 120;
                        }
                    });
                }
            }
        };

        $scope.check = 0;
        //检查资金账号是否正确，是否绑定
        $scope.chkAcctPwd = function () {
            $scope.pwdfocus = false;
            $scope.user['pwd'] = getPassword();
            $scope.isLoading = true;
            accountService["chkAcct"]($scope.user.name, $scope.user.pwd).then(function (data) {
                $scope.isLoading = false;
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.check = 1;
                    $scope.user['mobile'] = data[0][0].MOBILE_TEL;
                } else {
                    //myAlert("验证失败，请重新输入！");
                    $scope.check = 0;
                }
            });
        };

        $scope.verifyMobile = function () {
            if (!$scope.user['mobile']) {
                myConfirm('此资金账户对应的手机号为空，是否向注册户对应的的手机号发送短信？', function () {
                    accountService.getLoginUserInfo().then(function (data) {
                        if (data && data[0] && data[0][0]) {
                            $rootScope.global.account = data[0][0];
                            if (data[0][0].PHONE_NO) {
                                $scope.user['mobile'] = data[0][0].PHONE_NO;
                                $scope.getcode();
                            } else {
                                myConfirm("注册户没有绑定手机号，现在去绑定吗？", function () {
                                    $state.go('auth.bindregaccount');
                                });
                            }
                        }
                    });
                });
            } else {
                $scope.getcode();
            }
        };

        $scope.changeFundId = function () {
            if ($scope.browserType == 2) {
                result = document.getElementById('kdeditCtrl').value = '';
            }
            wait = 0;
            $scope.check = 0;
            $scope.changeAccount = 1;
            $scope.user.name = '';
            $scope.user.code = '';
        };

        $scope.chkMobileCode = function () {
            $scope.pwdfocus = false;
            accountService["chkmobilecode"]($scope.user).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.addBindDeal();
                } else {
                    //myAlert("验证失败，请重新输入！");
                    //$scope.check = 0;
                }
            });
        };

        $scope.toChangeAccount = function (fundAccount) {
            $scope.pwdfocus = false;
            $scope.showType = {
                show: false,
                edit: true
            };
            $scope.changeACCT = fundAccount;
        };

        $scope.search();

        //切换账户
        $scope.changeLogin = function () {
            $scope.pwdfocus = false;

            accountService.checkAccount($scope.changeACCT, getPassword(), $scope.browserType).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    myAlert("登录账户成功！ ");
                    $scope.search();
                }
            });
        };

        //绑定新账户
        $scope.addBindDeal = function () {
            var acc_no = document.getElementById('acc_no').value;
            accountService.addBindAccount($scope.user.name, $scope.user.pwd).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    myAlert("绑定账户成功！ ");
                    $scope.search();
                }
                wait = 0;
            });
        };

        $scope.cancel = function () {
            wait = 0;
            $scope.check = 0;
            $scope.search();
            $scope.user.name = '';
            $scope.user.code = '';
        };

        $scope.bindNewFundAccount = function () {
            $scope.changeAccount = 1;
        };

        checkBrowserVersion();

    }]);
