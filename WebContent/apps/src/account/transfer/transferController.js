'use strict';

angular.module('ASS.account').controller('TransferCtrl', ['$rootScope', '$scope', '$window', '$state', '$stateParams', '$localStorage', 'rsa', 'accountService', 'myAlert', 'myConfirm',
    function ($rootScope, $scope, $window, $state, $stateParams, $localStorage, rsa, accountService, myAlert, myConfirm) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }

        $rootScope.global.myAccountMenu = "银证转账";

        accountService.getLoginUserInfo().then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.global.account = data[0][0];
                if (!$scope.global.account.PHONE_NO) {
                    $scope.showType = '-01';
                    return;
                } else if (!$scope.global.account.FUNDSACCT_CODE_VIEW) {
                    $scope.showType = '-02';
                    return;
                } else if ('3' != $scope.global.account.LOGIN_TYPE) {
                    $localStorage.loginByFund = true;
                    $scope.showType = '-03';
                    return;
                } else {
                    $scope.showType = '1';
                }
            }
        });
        $scope.pwdfocus = false;
        $scope.transfer = {};
        $scope.yhList = [];
        $scope.transferListAll = [];
        $scope.transferList = [];

        var getMaxDraw = function () {
            accountService.getMaxDraw().then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.moneytype = data[0][0].MONEYTYPE;
                    $scope.maxdraw = data[0][0].MAXDRAW;
                }
            });
        };

        $scope.tabs = {
            toSecurities: false,
            toBank: false,
            list: false
        };
        $scope.tabs[$stateParams.transfer_type] = true;
        if ($stateParams.transfer_type == 'toBank') {
            getMaxDraw();
        }

        $scope.changeTab = function (whichTab) {
            $state.go('page.account.transfer', {transfer_type: whichTab});
        };

        $scope.checkpw = function () {
            var safeEdit = document.getElementById('kdeditCtrl');
            var result = safeEdit.GetLength();
            if (result < 1) {
                $scope.pwdfocus = false;
            }
        };
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
        $scope.pagination = {
            pagesize: 10,
            totalcount: -1,
            currentpage: 1
        };

        //获取转账记录
        $scope.getTransferList = function (type) {
            accountService.getTransferList().then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.transferListAll = data[0];
                    $scope.pagination.totalcount = $scope.transferListAll.length;

                    for (var i = 0; i < $scope.transferListAll.length; i++) {
                        var date = $scope.transferListAll[i].OPERDATE;
                        if (date && 8 == date.length) {
                            $scope.transferListAll[i].OPER_DATE = date.slice(0, 4) + '-' + date.slice(4, 6) + '-' + date.slice(6, 8);
                            var time = $scope.transferListAll[i].OPERTIME;
                            if (time && 6 == time.length) {
                                $scope.transferListAll[i].OPER_TIME = time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + time.slice(4, 6);
                            }
                        }
                    }

                    $scope.refresh();
                }
            });
        }

        $scope.refresh = function () {
            $scope.transferList = [];
            var start = ($scope.pagination.currentpage - 1) * $scope.pagination.pagesize;
            var end = $scope.pagination.currentpage * $scope.pagination.pagesize;
            $scope.transferList = $scope.transferListAll.slice(start, end);
        }

        $scope.$watch('pagination.currentpage', function () {
            if ($scope.tabs.list) {
                $scope.refresh();
            }

        });

        if ($stateParams.transfer_type == 'list') {
            $scope.getTransferList();
        }


        //银证转账 1 银行转证券 2 证券转银行
        $scope.banktransfer = function () {
            $scope.pwdfocus = false;
            var type = $scope.tabs.toSecurities ? 1 : ($scope.tabs.toBank ? 2 : '');
            if (!type) return;
            if (isNaN($scope.transfer.transfer_money) || $scope.transfer.transfer_money <= 0) {
                myAlert('请输入正确的转账金额');
                return;
            } else {
                var money = parseFloat($scope.transfer.transfer_money);
                try {
                    var max = parseFloat($scope.maxdraw);
                    if (2 == type && money > max) {
                        myAlert('转账金额不能大于可取金额');
                        return;
                    }
                } catch (e) {
                    myAlert('可取金额不足，无法转账');
                }
            }
            var result = "";
            if ($scope.browserType != 2) {
                var safeEdit = document.getElementById('kdeditCtrl');
                result = safeEdit.GetEncryptPassword();
                if (!result) {
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
            if (1 == type) {
                $scope.transfer['bankpwd'] = result;
            }
            if (2 == type) {
                $scope.transfer['fundpwd'] = result;
            }
            $scope.transfer.banktrantype = type;

            var content = type == 1 ? '<div>银行转券商</div>' : '<div>券商转银行</div>';
            content += '<div>转账金额：<span class="text-danger">' + $scope.transfer.transfer_money + '</span>元</div>';
            content += '<div class="m-t-sm">您是否确认以上转账委托？</div>';
            var title = type == 1 ? '银行转证券确认' : '证券转银行确认';

            myConfirm(content, function () {
                accountService.banktransfer($scope.transfer).then(function (data) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        $scope.transfer = {};

                        if (1 == type) {
                            if ($rootScope.beforeRechargeUrl) {
                                $state.go($rootScope.beforeRechargeUrl);
                                $rootScope.beforeRechargeUrl = null;
                                return;
                            }
                        }
                        $state.reload();
                        myAlert('转账委托已提交！');
                    }
                });
            }, '', title);
        };
        $scope.formatBankNo = function () {
            var acct = $scope.transfer.bank_acct;
            if (acct == "") return;
            var account = new String(acct);
            account = account.substring(0, 22);
            /*帐号的总数, 包括空格在内 */
            if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
                /* 对照格式 */
                if (account.match(".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
                        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null) {
                    var accountNumeric = "", accountChar = "", i;
                    for (i = 0; i < account.length; i++) {
                        accountChar = account.substr(i, 1);
                        if (!isNaN(accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
                    }
                    account = "";
                    for (i = 0; i < accountNumeric.length; i++) {    /* 可将以下空格改为-,效果也不错 */
                        if (i == 4) account = account + " ";
                        /* 帐号第四位数后加空格 */
                        if (i == 8) account = account + " ";
                        /* 帐号第八位数后加空格 */
                        if (i == 12) account = account + " ";
                        /* 帐号第十二位后数后加空格 */
                        account = account + accountNumeric.substr(i, 1)
                    }
                }
            }
            else {
                account = " " + account.substring(1, 5) + " " + account.substring(6, 10) + " " + account.substring(14, 18) + "-" + account.substring(18, 25);
            }
            $scope.accountshow = account;
        }


        $scope.$on('$scope.transfer.bank_acct', function () {
            $scope.formatBankNo();
        });

        $scope.$watch('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $scope.isIE = true;
                    $("label").removeClass("i-checks i-checks-sm i-checks-lg");
                }
                $('input, textarea').placeholder();
            }
        });

    }]);
