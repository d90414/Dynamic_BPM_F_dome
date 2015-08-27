'use strict';

angular.module('ASS.register').controller('RegisterCtrl', ['$scope', '$timeout', '$window', 'myAlert', 'registerService', function ($scope, $timeout, $window, myAlert, registerService) {
    $scope.user = {};
    $scope.authError = null;
    $scope.submitting = false;
    $scope.user = [];
    $scope.subtip = "立即注册";
    $scope.codetip = "获取验证码";
    $scope.usernameAlreadyExist = 0;
    $scope.username = "";
    $scope.emailTest = false;

    /*查询用户名是否已经存在*/
    $scope.checkUsername = function () {
        if ($scope.usernameAlreadyExist != 0) {
            return;
        }
        if ($scope.user.name === undefined || $scope.user.name === null || $scope.user.name == "" || $scope.user.name.getLength < 6) {
            return;
        } else {
            var testusername = /^(?!^\d+$)[0-9a-zA-Z]{6,16}$/;
            if (!testusername.exec($scope.user.name)) {
                return;
            }
            $scope.usernameAlreadyExist = 3;
        }
        registerService["checkUserName"]($scope.user.name).then(function (data1) {
            if (data1[2].ANS_MSG_HDR.MSG_CODE == 0) {
                $scope.usernameAlreadyExist = 2;
            } else {
                $scope.usernameAlreadyExist = 1;
                $scope.user.name.onfocus;
                $scope.username = $scope.user.name;
                $scope.user.name = "";
            }
        });
    }
    $scope.checkEmail = function () {
        var test = /^[a-z0-9]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{1,3}([\.][a-z]{2})?$/;
        if (!test.exec($scope.user.email)) {
            $scope.emailTest = true;
            return;
        } else {
            $scope.emailTest = false;
            return;
        }

    }

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
                registerService["getReCode"]($scope.user.mobile).then(function (data) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        $scope.user['code_id'] = data[0][0].code_id;
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

    /*注册*/
    $scope.signup = function () {
        $scope.authError = null;
        $scope.subtip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>注册中...';
        $scope.submitting = true;
        registerService["registerUser"]($scope.user).then(function (data) {
            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                $scope.subtip = "立即注册";
                $scope.submitting = false;
                window.location.href = "#/auth/regsuc";
            } else {
                $scope.subtip = "立即注册";
                $scope.submitting = false;
            }
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

    checkBrowserVersion();


}]);
