'use strict';

angular.module('ASS.login').controller('LoginCtrl', ['$rootScope', 'rsa', '$scope', '$window', '$timeout', '$state', '$localStorage', 'loginService', 'myAlert', 'myConfirm', 'myRoot', 'registerService', 'accountService',
    function ($rootScope, rsa, $scope, $window, $timeout, $state, $localStorage, loginService, myAlert, myConfirm, myRoot, registerService, accountService) {
        $scope.loginuser = {
            logintype: 2
        };

        $scope.submitting = 1;
        $scope.user = [];
        $scope.session_id = "";
        $scope.codetip = "验证手机号";
        $scope.checktype = 0;
        $scope.pwdfocus = false;
        $scope.sub = 0;
        $scope.bind_type = 0;
        $scope.browserType = 0; //浏览器类型
        // 是否渤海证券
        $scope.isBhzq = WEB_CUST;

        //chrome浏览器42版本不支持安全控件，过滤
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
            }
        }

        $scope.checkpw = function () {
            var safeEdit = document.getElementById('kdeditCtrl');
            var result = safeEdit.GetLength();
            if (result < 1) {
                $scope.pwdfocus = false;
            }
        };

        $scope.refresh = function () {
            $scope.uuid = new Date().getTime() + "-" + parseInt(Math.random() * 100000000);
            $scope.captcha = myRoot + "/kfps_validate?uuid=" + $scope.uuid;
        };

        $scope.toggleLoginType = function (type) {
            if (type != 3 && $("#loginbyfund").hasClass("active")) {
                $("#loginbyfund").removeClass("active");
            }
            if (type == 2 && !$("#loginbymobile").hasClass("active")) {
                $("#loginbymobile").addClass("active");
            }
            $scope.loginuser = {
                logintype: type
            };
        };
        $scope.check = 0;

        //检查资金账号是否正确，是否绑定
        $scope.chkAcctPwd = function () {
            $scope.pwdfocus = false;
            var result = "";
            if ($scope.browserType != 2) {
                var safeEdit = document.getElementById('kdeditCtrl');
                result = safeEdit.GetEncryptPassword();
                try {
                    if (result == "") {
                        myAlert("请输入密码！");
                        return;
                    }
                } catch (e) {
                    myAlert("请输入密码！");
                    return;
                }
            } else {
                result = document.getElementById('kdeditCtrl').value;
                if (result.length < 6) {
                    myAlert("输入密码不正确！");
                    return;
                }
                result = rsa.getPassword(result);
            }
            $scope.user['pwd'] = result;
            loginService["chkAcct"]($scope.user.name, $scope.user.pwd).then(function (data) {
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
            $state.reload();
        };

        $scope.chkMobileCode = function () {
            loginService["chkmobilecode"]($scope.user).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.bind();
                } else {
                    //myAlert("验证失败，请重新输入！");
                    //$scope.check = 0;
                }
            });
        }

        $scope.subForm = function () {
            $scope.loginuser['uuid'] = $scope.uuid;
            if ($scope.browserType != 2) {
                var safeEdit = document.getElementById('kdeditCtrl');
                var result = safeEdit.GetEncryptPassword();
                if (!result) {
                    myAlert("请输入密码！");
                    return;
                }
                $scope.loginuser['userpassword'] = result
            } else {
                var safeEdit = document.getElementById('kdeditCtrl').value;
                if (safeEdit.length < 6) {
                    myAlert("输入密码不正确！");
                    return;
                }
                $scope.loginuser['userpassword'] = rsa.getPassword(safeEdit);
            }

            $scope.submitting = 0;
            loginService["subLogin"]($scope.loginuser).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.submitting = 1;
                    $scope.uuid = new Date().getTime() + "-" + parseInt(Math.random() * 100000000);
                    $scope.captcha = myRoot + "kfps_validate?uuid=" + $scope.uuid;
                    if (data[0][0].SESSION_ID != "") {
                        $window.sessionStorage.sessionid = data[0][0].SESSION_ID;
                        $scope.session_id = data[0][0].SESSION_ID;

                        $window.sessionStorage.isLogin = '1';
                        $rootScope.global.isLogin = true;
                        $window.sessionStorage.IS_BIND = data[0][0].IS_BIND;
                        $rootScope.getNoReadMessages(true);
                        $rootScope.getMyFavorites();

                        if ($rootScope.beforeLoginUrl) {
                            if ($rootScope.beforeLoginUrl.indexOf("#") < 0) {
                                $state.go($rootScope.beforeLoginUrl);
                            } else {
                                window.location.href = $rootScope.beforeLoginUrl;
                            }
                            $rootScope.beforeLoginUrl = null;
                        } else {
                            if (data[0][0].IS_BIND == "1") {
                                if ($scope.loginuser['logintype'] == 3) {
                                    $state.go("auth.bindregaccount");
                                } else {
                                    $rootScope.global.hasBindRegAccount = false;
                                    $state.go("auth.binddealaccount");
                                }
                            } else {
                                $state.go("page.account.info");
                            }
                        }
                    }
                } else {
                    $scope.uuid = new Date().getTime() + "-" + parseInt(Math.random() * 100000000);
                    $scope.captcha = myRoot + "kfps_validate?uuid=" + $scope.uuid;
                    $scope.loginuser.regcode = "";
                    $scope.submitting = 1;
                    $scope.pwdfocus = false;
                }
            });
        };


        /*绑定资金账号*/
        $scope.bind = function () {
            $scope.sub = 1;
            loginService["bindbyDeal"]($scope.user.name, $scope.user.pwd).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    if ($rootScope.goBackTo) {
                        goBack();
                    } else {
                        $state.go("page.account.info");
                    }
                } else {
                    //myAlert("验证失败，请重新输入！");
                    $scope.sub = 0;
                }
                $scope.codetip = "验证手机号";
                wait = 0;
            });
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
                    loginService["getReCode"]($scope.user.mobile).then(function (data) {
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


        /*验证资金账号+交易密码登陆未绑定，新输入手机号是否存在*/
        $scope.checkmobile = function () {
            loginService["checkmobile"]($scope.user.mobile).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    if (data[0][0].IS_EXIST == "1") {  //已注册，未绑定
                        $scope.checktype = 1;
                        $scope.user['name'] = data[0][0].USER_NAME;
                        $scope.bind_type = 1;

                    } else if (data[0][0].IS_EXIST == "2") {  //未注册
                        $scope.checktype = 2;
                        $scope.getcode(false);
                    } else if (data[0][0].IS_EXIST == "3") {  //已注册，已绑定相同身份证
                        $scope.bind_type = 3;
                        $scope.checktype = 1;
                        $scope.user['name'] = data[0][0].USER_NAME;
                    } else if (data[0][0].IS_EXIST == "4") {  //已注册，已绑定不相同身份证
                        myAlert("关联此手机号的注册户已绑定所属不同身份信息的资金账号，请重新输入！");
                    }
                } else {
                    //myAlert("查询失败，请稍后重试！");

                }
            });
        }

        $scope.bindregaccount = function () {
            $scope.sub = 1;
            if ($scope.checktype == 2) {
                loginService["bindbyCode"]($scope.user.mobile, $scope.user.code, $scope.uuid).then(function (data) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        $window.sessionStorage.IS_BIND = '0';

                        if ($rootScope.goBackTo) {
                            goBack();
                        } else {
                            myConfirm("注册户绑定成功，您的用户名是" + $scope.user.mobile + "，登录密码是身份证后六位。强烈建议您立即修改密码。",
                                function () {
                                    $state.go("page.account.security.pwupdate.input");
                                }, function () {
                                    $state.go("page.account.info");
                                }, "", "立即修改密码", "暂时不修改");
                        }
                    }
                });
            } else {
                loginService["bindbyPw"]($scope.user.mobile, $scope.user.password, $scope.bind_type).then(function (data) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        if ($rootScope.goBackTo) {
                            goBack();
                        } else {
                            $state.go("page.account.info");
                        }
                    } else {
                        $scope.sub = 0;
                        //myAlert("验证失败，请重试！");
                    }
                });
            }
        }

        $scope.uuid = new Date().getTime() + "-" + parseInt(Math.random() * 100000000);
        $scope.captcha = myRoot + "kfps_validate?uuid=" + $scope.uuid;
        $scope.checkActive = function () {
            if ($scope.browserType == 2) {
                $scope.pwdfocus = true;
            } else {
                var safeEdit = document.getElementById('kdeditCtrl');
                try {
                    safeEdit.GetEncryptPassword();
                    //safeEdit.SetFocus();
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

        // 兼容IE
        $scope.initPlaceholder = function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) $('label').removeClass('i-checks i-checks-sm i-checks-lg');
                $('input, textarea').placeholder();
            }
        };

        $scope.$on('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $('label').removeClass('i-checks i-checks-sm i-checks-lg');
                }
                // Invoke the plugin
                $('input, textarea').placeholder();
            }
            if ($localStorage.loginByFund) {
                $localStorage.loginByFund = false;
                $timeout(function () {
                    $scope.loginuser = {
                        logintype: 3
                    };
                    $("#loginbymobile").removeClass("active");
                    $("#loginbyfund").addClass("active");
                }, 100);
            }
        });

        var goBack = function () {
            if ($rootScope.goBackTo) {
                if ($rootScope.goBackTo.indexOf("#") < 0) {
                    $state.go($rootScope.goBackTo);
                } else {
                    window.location.href = $rootScope.goBackTo;
                }
                $rootScope.goBackTo = null;
            }
        };

    }]);
