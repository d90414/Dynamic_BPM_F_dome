'use strict';

require('./components/service/service');
require('./components/directive/directive');
require('./components/filter/filter');

require('./template/template');
require('./index/index');
require('./zindex/zindex');
require('./login/login');
require('./register/register');
require('./prdlist/prdlist');
require('./detail/detail');
require('./scart/scart');
require('./confirmorder/confirmorder');
require('./orderpay/orderpay');
require('./paysuccess/paysuccess');
require('./notice/notice');
require('./account/account');
require('./pwrecovery/pwrecovery');
require('./help/help');
require('./placeOrder/placeOrder');

require('./kibh/index/index');
require('./kibh/openAccount/openAccount');
require('./kibh/accountInfo/accountInfo');
require('./kibh/accountFrozen/accountFrozen');
require('./kibh/accountUnfrozen/accountUnfrozen');
require('./kibh/modifyTradePwd/modifyTradePwd');
require('./kibh/modifyMoneyPwd/modifyMoneyPwd');
require('./kibh/customerInfo/customerInfo');
require('./kibh/openHKStock/openHKStock');
require('./kibh/openGEMBoard/openGEMBoard');
require('./kibh/openRiskStock/openRiskStock');
require('./kibh/openDelistStock/openDelistStock');
require('./kibh/openBusinessAuthority/openBusinessAuthority');
require('./kibh/openFund/openFund');
require('./kibh/openHSFund/openHSFund');
require('./kibh/protocolSign/protocolSign');
require('./kibh/stockRiskTest/stockRiskTest');
require('./kibh/fundRiskTest/fundRiskTest');
require('./kibh/otcRiskTest/otcRiskTest');
require('./kibh/depositoryBusiness/depositoryBusiness');
require('./kibh/delegateMethod/delegateMethod');

var AngularSeedSpm = angular.module('ASS', [
    //'ngAnimate',
    'ngCookies',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.utils',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ASS.service',
    'ASS.directive',
    'ASS.filter',

    'ASS.template',
    'ASS.index',
    'ASS.zindex',
    'ASS.login',
    'ASS.register',
    'ASS.prdlist',
    'ASS.detail',
    'ASS.scart',
    'ASS.confirmorder',
    'ASS.orderpay',
    'ASS.paysuccess',
    'ASS.notice',
    'ASS.account',
    'ASS.pwrecovery',
    'ASS.help',
    'ASS.placeOrder',

    'ASS.idx',
    'ASS.openAccount',
    'ASS.accountInfo',
    'ASS.accountFrozen',
    'ASS.accountUnfrozen',
    'ASS.modifyTradePwd',
    'ASS.modifyMoneyPwd',
    'ASS.customerInfo',
    'ASS.openHKStock',
    'ASS.openGEMBoard',
    'ASS.openRiskStock',
    'ASS.openDelistStock',
    'ASS.openBusinessAuthority',
    'ASS.openFund',
    'ASS.openHSFund',
    'ASS.protocolSign',
    'ASS.stockRiskTest',
    'ASS.fundRiskTest',
    'ASS.otcRiskTest',
    'ASS.depositoryBusiness',
    'ASS.delegateMethod'
])
    .value('myRoot', '/kfps/')
    .value('kibhRoot', '/kibh_service/')
    .value('kibhFile', '/kibh_file/')
    .value('SMVC', true)

    .config(['$sceProvider', 'paginationConfig', 'datepickerPopupConfig', function ($sceProvider, paginationConfig, datepickerPopupConfig) {
        $sceProvider.enabled(false);

        paginationConfig.lastText = '尾页';
        paginationConfig.firstText = '首页';
        paginationConfig.nextText = '下一页';
        paginationConfig.previousText = '上一页';
        datepickerPopupConfig.clearText = '清空';
        datepickerPopupConfig.closeText = '关闭';
        datepickerPopupConfig.currentText = '今日';

        Date.prototype.format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };

            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }

            return fmt;
        };
    }]).controller('baseCtrl', ['$scope', '$rootScope', '$http', '$window', '$state', '$localStorage', 'myAlert', 'myConfirm', 'accountService', 'kibhSystem', function ($scope, $rootScope, $http, $window, $state, $localStorage, myAlert, myConfirm, accountService, kibhSystem) {
        $scope.$state = $state;
        $localStorage.hasLoginAlert = false;
        $http.get("./data/menu.json").then(function (resp) {
            $scope.menuconfig = resp.data;
        })

        var reg = /iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/;
        var browser = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        var userAgent = navigator.userAgent.toLowerCase();
        var rwebkit = /(webkit)\/([\w.]+)/, ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/, rmsie = /(msie) ([\w.]+)/, rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
        var match = rwebkit.exec(userAgent) || ropera.exec(userAgent) || rmsie.exec(userAgent) || userAgent.indexOf("compatible") < 0 && rmozilla.exec(userAgent) || [];

        /*获得浏览器的名称及版本信息*/
        $.browser = {
            version: match[2] || "0",
            safari: /version.+safari/.test(userAgent),
            chrome: /chrome/.test(userAgent),
            firefox: /firefox/.test(userAgent),
            msie: /msie/.test(userAgent),
            opera: /opera/.test(userAgent),
            mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
        };
        $.browser.msie10 = $.browser.msie && /msie 10\.0/i.test(userAgent);
        $.browser.msie9 = $.browser.msie && /msie 9\.0/i.test(userAgent);
        $.browser.msie8 = $.browser.msie && /msie 8\.0/i.test(userAgent);
        $.browser.msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
        $.browser.msie6 = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(userAgent);
        
        kibhSystem.getBizMenu().then(function (data) {
            var m, allmenu = data[0];
            for (var i in allmenu) {
                m = allmenu[i];
                switch (m.MENU_ID) {
	            	case "21":
	            		// 电子签名约定书签署
	            		$rootScope.protocolSignId = m.MENU_LEVEL;
	                	break;
					case "22":
						// 风险测评
						$rootScope.stockRiskTestId = m.MENU_LEVEL;
	                	break;
					case "30":
						// 场外基金开户
						$rootScope.openFundId = m.MENU_LEVEL;
						break;
	            }
            }
        });

        $rootScope.global = {
            isLogin: false
        };
        $rootScope.ie8 = $.browser.msie8;
        $rootScope.protocolHeight = "400px";

        $rootScope.bj = function (a, b, c) { //并集
            var compareObject = function (o1, o2) {
                if (typeof o1 != typeof o2) return false;
                if (typeof o1 == 'object') {
                    for (var o in o1) {
                        if (typeof o2[o] == 'undefined') return false;
                        if (!compareObject(o1[o], o2[o])) return false;
                    }
                    return true;
                } else {
                    return o1 === o2;
                }
            };

            var qc = function (a, b) { //去重
                var r = [];
                for (var i = 0; i < a.length; i++) {
                    var flag = true;
                    var temp = a[i];
                    var o1 = angular.copy(a[i]);
                    for (var k = 0; k < b.length; k++) {
                        delete o1[b[k]];
                    }
                    for (var j = 0; j < r.length; j++) {
                        var o2 = angular.copy(r[j]);
                        for (var k = 0; k < b.length; k++) {
                            delete o2[b[k]];
                        }
                        if (compareObject(o1, o2)) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        r.push(temp);
                    }
                }
                return r;
            };

            return qc(a.concat(b), c);
        };

        $rootScope.updateShoppingTip = function (flag) {
            var precount = $rootScope.shoppingtip ? $rootScope.shoppingtip.length : null;
            $rootScope.shoppingtip = [];
            if ($window.sessionStorage.shoppinglist) {
                var shoppingtip = [], shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                while (shoppinglist.length) {
                    var index = 0, temp = shoppinglist[index];
                    for (var i = 0; i < shoppinglist.length; i++) {
                        if (shoppinglist[i].CREATE_TIME > temp.CREATE_TIME) {
                            index = i;
                            temp = shoppinglist[index];
                        }
                    }
                    shoppinglist.splice(index, 1);
                    shoppingtip.push(temp);
                }
                $rootScope.shoppingtip = shoppingtip;
            }
            var folcount = $rootScope.shoppingtip.length;
            if (!flag && precount != null) {
                if (precount < folcount) {
                    myAlert("产品添加成功！");
                } else if (precount > folcount) {
                    myAlert("产品删除成功！");
                } else {
                    myAlert("购物车已存在此产品！");
                }
            }
        };

        $rootScope.logout = function (cfm) {
            var logout = function () {
                $window.sessionStorage.isLogin = '-1';
                $window.sessionStorage.removeItem("sessionid");
                $window.sessionStorage.removeItem("favorites");

                $rootScope.global && ($rootScope.global = {});
                $rootScope.beforeRechargeUrl && ($rootScope.beforeRechargeUrl = null);
                $rootScope.beforeRiskTestUrl && ($rootScope.beforeRiskTestUrl = null);
                $rootScope.beforeOpenFundUrl && ($rootScope.beforeOpenFundUrl = null);
                $rootScope.goBackTo && ($rootScope.goBackTo = null);

                $state.go("auth.login", {}, {location: "replace"});
            };

            if (cfm) {
                myConfirm("确定要退出系统吗？", function () {
                    logout();
                });
            } else {
                logout();
            }
        };

        $rootScope.refreshLoginUserInfo = function () {
            if ($window.sessionStorage.sessionid) {
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $window.sessionStorage.account = JSON.stringify(data[0][0]);
                        $rootScope.global = $rootScope.global || {};
                        $rootScope.global.isLogin = true;
                        if ($window.sessionStorage.account) {
                            $rootScope.global.account = JSON.parse($window.sessionStorage.account);
                        }
                    }
                });
            }
        };

        $rootScope.getMyFavorites = function (forceRefresh) {
            if ($window.sessionStorage.sessionid) {
                accountService.getMyFavorites({
                    oper_flag: "select",
                    need_detail: '1',
                    cur_page: -1
                }).then(function (data) {
                    if (data && data[0]) {
                        var favoritePrdIds = [];
                        for (var i = 0; i < data[0].length; i++) {
                            favoritePrdIds.push(data[0][i].PRO_ID);
                        }
                        $window.sessionStorage.favorites = favoritePrdIds.join(',');
                    }
                });
            }
        };

        $rootScope.getNoReadMessages = function (forceRefresh) {
            if ($window.sessionStorage.sessionid) {
                $rootScope.global = $rootScope.global || {};
                if (!$rootScope.global.noReadMessages || forceRefresh) {
                    $rootScope.global = $rootScope.global || {};
                    $rootScope.global.noReadMessages = [];
                    $rootScope.global.noReadMessages.totalCount = 0;
                    accountService.getMessages({
                        hasread: "未读",
                        cur_page: 1,
                        ret_rows: 3,
                        order_by: "CREATE_TIME DESC"
                    }).then(function (data) {
                        if (data[2] && "0" == data[2].ANS_MSG_HDR.MSG_CODE) {
                            $rootScope.global.noReadMessages = data[0] || [];
                            $rootScope.global.noReadMessages.totalCount = data[1] ? data[1] : 0;
                        }
                    });
                }
            }
        };

        $rootScope.global.hasBindRegAccount = false;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name && toState.name.indexOf('page.account') != -1
                && toState.name != 'auth.bindregaccount' && toState.name != 'auth.binddealaccount') {
                if (!$rootScope.global.hasBindRegAccount) {
                    event.preventDefault();
                }
                accountService.getLoginUserInfo().then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $rootScope.global.account = data[0][0];
                        if (!data[0][0].USER_ID) {
                            $rootScope.global.hasBindRegAccount = false;
                            if (fromState.name && fromState.name == 'auth.bindregaccount') {
                                myAlert("您尚未绑定注册户，无法使用个人中心");
                                $state.reload();
                            } else {
                                myConfirm("现在去绑定注册户吗？", function () {
                                    $state.go('auth.bindregaccount');
                                }, function () {
                                    $state.reload();
                                }, "您尚未绑定注册户，无法使用个人中心", "立即绑定");
                            }
                        } else {
                            $rootScope.global.hasBindRegAccount = true;
                            $state.go(toState.name, toParams);
                        }
                    }
                });
            }
        });

        var k = 547579;
        $rootScope.global.pageviews = k - 1000;
        setInterval(function () {
            if ($rootScope.global.pageviews <= k) {
                $rootScope.global.pageviews++;
            }
        }, Math.random() * 10000);

    }]);

angular.bootstrap(document, ['ASS']);