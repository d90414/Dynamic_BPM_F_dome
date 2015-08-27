'use strict';

angular.module('ASS.account').controller('PhoneUpdateCtrl', ['$rootScope', 'rsa', '$scope', '$window', '$state', 'accountService', 'accountSafetyService', 'myConfirm', 'myAlert',
    function ($rootScope, rsa, $scope, $window, $state, accountService, accountSafetyService, myConfirm, myAlert) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }

        $rootScope.global.myAccountMenu = "安全设置";

        $scope.codeflag = 1;
        $scope.submitting = false;
        $scope.checktype = 1;
        $scope.clock = 120;

        $scope.user = {};

        var clock, updateClock = function () {
            $scope.clock--;
            if ($scope.clock == 0) {
                $scope.codeflag = 1;
                clearInterval(clock);
            }
        };

        $scope.browserType = 0; //浏览器类型
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

        $scope.pw = 0;

        // 检查是否已安装密码输入控件
        $scope.checkActive = function () {
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
                        "是否下载安全控件？",
                        "立即下载",
                        "取消"
                    );
                }
            }
        };

        $scope.checkpw = function () {
            var safeEdit = document.getElementById('kdeditCtrl');
            var result = safeEdit.GetLength()
            if (result == 0) {
                $scope.pw = 0;
                document.getElementById('kdeditCtrlA').style.display = "none";
                document.getElementById('textPassword').style.display = "block";
            } else if (result < 6) {
                safeEdit.SetFocus();
            }
            $scope.myForm = $scope.myForm || {};
            $scope.myForm.trdpwd = {
                invalid: true,
                error: true
            }
        };

        accountService.getLoginUserInfo().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.account = data[0][0];
                $scope.user.phone = $scope.account.PHONE_NO;
            }
        });

        $scope.sendOldPhoneCode = function () {
            $scope.codeflag = 2;
            try {
                accountSafetyService.sendPhoneCertifyCode({
                    phone_no: $scope.user.phone,
                    biz_type: "modphone"
                }).then(function (data) {
                    if (data[2] && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                        $scope.user['code_id'] = data[0][0].CODE_ID;
                        $scope.clock = 120;
                        $scope.codeflag = 3;
                        clock = setInterval(function () {
                            $scope.$apply(updateClock);
                        }, 1000);
                        $scope.codeflag = 3;
                    } else {
                        $scope.codeflag = 1;
                    }
                });
            } catch (e) {
                $scope.codeflag = 3;
            }
        };
        $scope.sendNewPhoneCode = function () {
            $scope.codeflag = 2;
            try {
                accountSafetyService.sendPhoneCertifyCode({
                    phone_no: $scope.user.newPhone,
                    biz_type: "newreg"
                }).then(function (data) {
                    if (data[2] && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                        $scope.user['code_id'] = data[0][0].CODE_ID;
                        $scope.clock = 120;
                        $scope.codeflag = 3;
                        clock = setInterval(function () {
                            $scope.$apply(updateClock);
                        }, 1000);
                    } else {
                        $scope.codeflag = 1;
                    }
                });
            } catch (e) {
                $scope.codeflag = 3;
            }
        };

        $scope.step = 0;

        // step1 type1 通过验证旧手机号码来更改手机号
        $scope.submitStep1Type1Form = function () {
            accountSafetyService.checkPhoneCertifyCode({
                phone_no: $scope.user.phone,
                verify_code: $scope.user.code,
                code_id: $scope.user.code_id
            }).then(function (data) {
                if (data[2] && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                    $scope.clock = 0;
                    $scope.codeflag = 1;
                    clearInterval(clock);
                    $scope.user.code = '';

                    $scope.step = 2;
                }
            });
        };

        // step1 type2 通过验证资金账号和交易密码来更改手机号
        $scope.submitStep1Type2Form = function () {
            $scope.pwdfocus = false;
            var result = "";
            if ($scope.browserType != 2) {
                try {
                    var safeEdit = document.getElementById('kdeditCtrl');
                    result = safeEdit.GetEncryptPassword();
                    if (result == "") {
                        $scope.step1type2Form.trdpwd = {errorText: "请输入交易密码"};
                        $scope.step1type2Form.submitted = true;
                        return;
                    } else {
                        $scope.user.trdpwd = result;
                    }
                } catch (e) {
                    $scope.step1type2Form.trdpwd = {errorText: "请确认安全控件是否安装正确"};
                    $scope.step1type2Form.submitted = true;
                    return;
                }
            } else {
                result = document.getElementById('textPassword').value;
                if (result.length < 6) {
                    $scope.step1type2Form.trdpwd = {errorText: "请输入交易密码"};
                    $scope.step1type2Form.submitted = true;
                    return;
                }
                result = rsa.getPassword(result);
                $scope.user.trdpwd = result;
            }

            // 检查验证码是否正确
            accountSafetyService.checkBexIdAndPwd({
                fundsacct_code: $scope.user.fundsacct_code,
                trdpwd: $scope.user.trdpwd
            }).then(function (data) {
                if (data[2] && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                    $scope.step = 2;
                }
            });
        };

        // step2 新手机号验证
        $scope.submitStep2Form = function () {
            // 检查验证码是否正确，通过，中台接口会更新手机号码
            accountSafetyService.checkPhoneCertifyCode({
                phone_no: $scope.user.newPhone,
                verify_code: $scope.user.code,
                code_id: $scope.user.code_id,
                biz_type: "modphone"
            }).then(function (data) {
                if (data[2] && data[2].ANS_MSG_HDR.MSG_CODE == "0") {
                    $scope.clock = 0;
                    $scope.codeflag = 1;
                    clearInterval(clock);

                    $scope.step = 3;
                }
            });
        };

        $scope.stepLineStyle = function (matchStep, currentStep) {
            var style = {};
            if (matchStep && currentStep && currentStep >= matchStep) {
                style = {background: 'url(public/images/step_bline.png) no-repeat 34px 15px'};
            } else {
                style = {background: 'url(public/images/step_gline.png) no-repeat 34px 15px'};
            }
            return style;
        };

        $scope.choose = function (type) {
            $scope.type = type;
            $scope.step = 1;
        };

        $scope.previous = function () {
            if ($scope.step == 1) {
                $scope.type = null;
            }

            $scope.clock = 0;
            $scope.codeflag = 1;
            clearInterval(clock);

            $scope.step--;
            $scope.user.code = '';
        };

    }]);
