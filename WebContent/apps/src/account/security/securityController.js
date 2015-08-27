'use strict';

angular.module('ASS.account').controller('SecurityCtrl', ['$rootScope', '$scope', '$window', '$state', 'accountService',
    function ($rootScope, $scope, $window, $state, accountService) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }

        $rootScope.global.myAccountMenu = "安全设置";

        $scope.links = [{
            iconUrl: {width: "42px", height: "42px", background: "url(public/images/myaccount-icons-edit.png)"},
            url: "page.account.security.pwupdate.input",
            name: "修改用户密码",
            remark: "互联网账号存在被盗风险，建议您定期更改密码以确保安全。"
        }, {
            iconUrl: {
                width: "42px",
                height: "42px",
                background: "url(public/images/myaccount-icons-edit.png) 84px"
            },
            url: "page.account.security.emailcertify",
            name: "邮箱验证",
            remark: "验证后，可用于快速找回登录密码，接收账户余额变动提醒。"
        }, {
            iconUrl: {
                width: "42px",
                height: "42px",
                background: "url(public/images/myaccount-icons-edit.png) 42px"
            },
            url: "page.account.security.phoneupdate",
            name: "手机号变更",
            remark: "手机号可用于快速找回登录密码及支付密码，接收账户余额变动提醒。"
        }];


        if ($rootScope.global.account.USER_EMAIL) {
            $scope.links[1].name = "修改邮箱";
        }

        if (!$rootScope.global.account.PHONE_NO) {
            $scope.links.pop();
        }

    }]);
