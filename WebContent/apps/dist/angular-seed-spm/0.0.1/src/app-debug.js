define("angular-seed-spm/0.0.1/src/app-debug", [], function(require, exports, module){
'use strict';

require("angular-seed-spm/0.0.1/src/components/service/service-debug");
require("angular-seed-spm/0.0.1/src/components/directive/directive-debug");
require("angular-seed-spm/0.0.1/src/components/filter/filter-debug");

require("angular-seed-spm/0.0.1/src/template/template-debug");
require("angular-seed-spm/0.0.1/src/index/index-debug");
require("angular-seed-spm/0.0.1/src/zindex/zindex-debug");
require("angular-seed-spm/0.0.1/src/login/login-debug");
require("angular-seed-spm/0.0.1/src/register/register-debug");
require("angular-seed-spm/0.0.1/src/prdlist/prdlist-debug");
require("angular-seed-spm/0.0.1/src/detail/detail-debug");
require("angular-seed-spm/0.0.1/src/scart/scart-debug");
require("angular-seed-spm/0.0.1/src/confirmorder/confirmorder-debug");
require("angular-seed-spm/0.0.1/src/orderpay/orderpay-debug");
require("angular-seed-spm/0.0.1/src/paysuccess/paysuccess-debug");
require("angular-seed-spm/0.0.1/src/notice/notice-debug");
require("angular-seed-spm/0.0.1/src/account/account-debug");
require("angular-seed-spm/0.0.1/src/pwrecovery/pwrecovery-debug");
require("angular-seed-spm/0.0.1/src/help/help-debug");
require("angular-seed-spm/0.0.1/src/placeOrder/placeOrder-debug");

require("angular-seed-spm/0.0.1/src/kibh/index/index-debug");
require("angular-seed-spm/0.0.1/src/kibh/openAccount/openAccount-debug");
require("angular-seed-spm/0.0.1/src/kibh/accountInfo/accountInfo-debug");
require("angular-seed-spm/0.0.1/src/kibh/accountFrozen/accountFrozen-debug");
require("angular-seed-spm/0.0.1/src/kibh/accountUnfrozen/accountUnfrozen-debug");
require("angular-seed-spm/0.0.1/src/kibh/modifyTradePwd/modifyTradePwd-debug");
require("angular-seed-spm/0.0.1/src/kibh/modifyMoneyPwd/modifyMoneyPwd-debug");
require("angular-seed-spm/0.0.1/src/kibh/customerInfo/customerInfo-debug");
require("angular-seed-spm/0.0.1/src/kibh/openHKStock/openHKStock-debug");
require("angular-seed-spm/0.0.1/src/kibh/openGEMBoard/openGEMBoard-debug");
require("angular-seed-spm/0.0.1/src/kibh/openRiskStock/openRiskStock-debug");
require("angular-seed-spm/0.0.1/src/kibh/openDelistStock/openDelistStock-debug");
require("angular-seed-spm/0.0.1/src/kibh/openBusinessAuthority/openBusinessAuthority-debug");
require("angular-seed-spm/0.0.1/src/kibh/openFund/openFund-debug");
require("angular-seed-spm/0.0.1/src/kibh/openHSFund/openHSFund-debug");
require("angular-seed-spm/0.0.1/src/kibh/protocolSign/protocolSign-debug");
require("angular-seed-spm/0.0.1/src/kibh/stockRiskTest/stockRiskTest-debug");
require("angular-seed-spm/0.0.1/src/kibh/fundRiskTest/fundRiskTest-debug");
require("angular-seed-spm/0.0.1/src/kibh/otcRiskTest/otcRiskTest-debug");
require("angular-seed-spm/0.0.1/src/kibh/depositoryBusiness/depositoryBusiness-debug");
require("angular-seed-spm/0.0.1/src/kibh/delegateMethod/delegateMethod-debug");

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
});
define("angular-seed-spm/0.0.1/src/components/service/service-debug", [], function(require, exports, module){
'use strict';

require("angular-seed-spm/0.0.1/src/components/service/default/uiLoad-debug");
require("angular-seed-spm/0.0.1/src/components/service/default/myHttp-debug");
require("angular-seed-spm/0.0.1/src/components/service/default/kibhHttp-debug");
require("angular-seed-spm/0.0.1/src/components/service/default/myAlert-debug");
require("angular-seed-spm/0.0.1/src/components/service/default/myConfirm-debug");
require("angular-seed-spm/0.0.1/src/components/service/default/rsa-debug");

require("angular-seed-spm/0.0.1/src/components/service/custom/adnotService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/detailService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/infoPrdService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/exclusiveService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/prdlistService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/scartService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/accountService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/loginService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/registerService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/pwrecoveryService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/orderpayService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/accountSafetyService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/confirmorderService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/electronicContractSevice-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/prdCommonService-debug");
require("angular-seed-spm/0.0.1/src/components/service/custom/orderService-debug");


require("angular-seed-spm/0.0.1/src/components/service/kibh/kibhSystem-debug");
require("angular-seed-spm/0.0.1/src/components/service/kibh/kibhAccount-debug");
require("angular-seed-spm/0.0.1/src/components/service/kibh/kibhCustomer-debug");

var service = angular.module('ASS.service', [
/********************default*********************/
    'ASS.service.uiLoad',
    'ASS.service.myHttp',
    'ASS.service.kibhHttp',
    'ASS.service.myAlert',
    'ASS.service.myConfirm',
    'ASS.service.rsa',

/********************kfps*********************/
    'ASS.service.adnotService', // 广告公告
    'ASS.service.detailService', // 产品明细
    'ASS.service.exclusiveService', // 专区产品
    'ASS.service.prdlistService', // 专区产品
    'ASS.service.infoPrdService', // 资讯产品
    'ASS.service.scartService', // 购物车
    'ASS.service.accountService', // 我的账户
    'ASS.service.loginService', // 登录
    'ASS.service.registerService', // 注册
    'ASS.service.pwrecoveryService', //找回密码
    'ASS.service.orderpayService', //订单支付
    'ASS.service.accountSafetyService', //账户安全
    'ASS.service.confirmorderService', //订单确认
    'ASS.service.electronicContractSevice', //电子合同业务
    'ASS.service.prdCommonService', // 产品公共方法
    'ASS.service.orderService', // 订单


/********************kibh*********************/
    'ASS.service.kibhSystem',
    'ASS.service.kibhAccount',
    'ASS.service.kibhCustomer'

]);

module.exports = service;
});
define("angular-seed-spm/0.0.1/src/components/service/default/uiLoad-debug", [], function(require, exports, module){
'use strict';

var uiLoad = angular.module('ASS.service.uiLoad', [])
    .service('uiLoad', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {
        var loaded = [];
        var promise = false;
        var deferred = $q.defer();

        /**
         * Chain loads the given sources
         * @param srcs array, script or css
         * @returns {*} Promise that will be resolved once the sources has been loaded.
         */
        this.load = function (srcs) {
            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
            var self = this;
            if (!promise) {
                promise = deferred.promise;
            }
            angular.forEach(srcs, function (src) {
                promise = promise.then(function () {
                    return src.indexOf('.css') >= 0 ? self.loadCSS(src) : self.loadScript(src);
                });
            });
            deferred.resolve();
            return promise;
        }

        /**
         * Dynamically loads the given script
         * @param src The url of the script to load dynamically
         * @returns {*} Promise that will be resolved once the script has been loaded.
         */
        this.loadScript = function (src) {
            if (loaded[src]) return loaded[src].promise;

            var deferred = $q.defer();
            var script = $document[0].createElement('script');
            script.src = src;
            script.onload = function (e) {
                $timeout(function () {
                    deferred.resolve(e);
                });
            };
            script.onerror = function (e) {
                $timeout(function () {
                    deferred.reject(e);
                });
            };
            $document[0].body.appendChild(script);
            loaded[src] = deferred;

            return deferred.promise;
        };

        /**
         * Dynamically loads the given CSS file
         * @param href The url of the CSS to load dynamically
         * @returns {*} Promise that will be resolved once the CSS file has been loaded.
         */
        this.loadCSS = function (href) {
            if (loaded[href]) return loaded[href].promise;

            var deferred = $q.defer();
            var style = $document[0].createElement('link');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = href;
            style.onload = function (e) {
                $timeout(function () {
                    deferred.resolve(e);
                });
            };
            style.onerror = function (e) {
                $timeout(function () {
                    deferred.reject(e);
                });
            };
            $document[0].head.appendChild(style);
            loaded[href] = deferred;

            return deferred.promise;
        };
    }]);

module.exports = uiLoad;

});
define("angular-seed-spm/0.0.1/src/components/service/default/myHttp-debug", [], function(require, exports, module){
'use strict';

var myHttp = angular.module('ASS.service.myHttp', [])
    .factory('myHttp', [ '$rootScope', '$http', '$state', '$window', '$localStorage', '$q', 'myRoot', 'myAlert', function ($rootScope, $http, $state, $window, $localStorage, $q, myRoot, myAlert) {
        return {
            post: function (param) {
                if ("object" !== $.type(arguments[0])) throw new Error("请求参数不合法，请检查调用参数！");

                var service_id = param.req.service;

                var getReqHead = function (sReq) {
                    return {
                        "OP_WAY": '1',
                        "OP_LANGUAGE": '1',
                        "OP_PROGRAM": '',
                        "SERVER_ID": sReq.service,
                        "MSG_ID": sReq.service,
                        "SESSION_ID": sReq.session_id || $window.sessionStorage.sessionid ? $window.sessionStorage.sessionid : ""
                    };
                };

                var makeJsonRequest = function (req) {
                    var reqJson = [];
                    req = $.isArray(req) ? req : [req];

                    $.each(req, function () {
                        reqJson.push({
                            REQ_MSG_HDR: getReqHead(this),
                            REQ_COMM_DATA: this
                        });
                    });

                    return JSON.stringify({
                        REQUESTS: reqJson
                    });
                };

                var deferred = $q.defer();
                var kencKey, url = (param.root ? param.root : myRoot) + (param.url || ("kjdp_ajax?returnType=json"));

                param.req = $.isArray(param.req) ? param.req : [param.req];
                param.req.session_id = $window.sessionStorage.sessionid ? $window.sessionStorage.sessionid : "";

                var jsontxt = makeJsonRequest(param.req);
                $http.post(url, $.des.encrypt(jsontxt, kencKey)).then(function (data) {
                    try {
                        data = data.data;
                        var ANSWERS = data.ANSWERS[0];
                        var ANS_MSG_HDR = ANSWERS.ANS_MSG_HDR;
                        var ANS_COMM_DATA = ANSWERS.ANS_COMM_DATA;

                        if (ANS_MSG_HDR.MSG_CODE == 0) {
                            if (service_id == 890015) {
                                var d = ANS_COMM_DATA[0][0];
                                switch (d.CODE) {
                                    case "0":
                                        ANS_COMM_DATA[0][0].BUSI_LOG_NO = d.TEXT;
                                        deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                                        break;
                                    case "1":
                                        myAlert(d.TEXT, function () {
                                        	$localStorage.loginByFund = true;
                                            $state.go("auth.login");
                                        }, function () {
                                        	$localStorage.loginByFund = true;
                                            $state.go("auth.login");
                                        });
                                        break;
                                    case "2":
                                    	myAlert(d.TEXT);
                                        break;
                                    case "3":
                                    	myAlert("此业务请在" + d.openTime + "时间段内办理!");
                                        break;
                                    case "4":
                                        myAlert(d.TEXT, function () {
                                        	$rootScope.beforeProtocolSignUrl = window.location.href;
                                            $state.go("kibh.biz.protocolSign", {businessId: $rootScope.protocolSignId});
                                        }, function () {
                                        	$rootScope.beforeProtocolSignUrl = window.location.href;
                                            $state.go("kibh.biz.protocolSign", {businessId: $rootScope.protocolSignId});
                                        });
                                        break;
                                    case "5":
                                    	myAlert(d.TEXT, function () {
                                            $state.go("auth.register");
                                        }, function () {
                                            $state.go("auth.register");
                                        });
                                        break;
                                    default:
                                    	ANS_COMM_DATA[0][0].BUSI_LOG_NO = d.TEXT;
                                    	deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                                }
                            } else if (service_id == 860024 || service_id == 860027) {
                            	var d = ANS_COMM_DATA[0][0];
                            	if (!d) {
                            		deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                            	} else {
                            		switch (d.CODE) {
	                                    case "0":
	                                        deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
	                                        break;
	                                    case "1":
	                                        myAlert(d.TEXT, function () {
	                                        	$localStorage.loginByFund = true;
	                                            $state.go("auth.login");
	                                        }, function () {
	                                        	$localStorage.loginByFund = true;
	                                            $state.go("auth.login");
	                                        });
	                                        break;
	                                    case "5":
	                                    	myAlert(d.TEXT, function () {
	                                            $state.go("auth.register");
	                                        }, function () {
	                                            $state.go("auth.register");
	                                        });
	                                        break;
	                                    default:
	                                    	deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
	                                }
                            	}
                            } else {
                                deferred.resolve([ANS_COMM_DATA[0], ANS_MSG_HDR.DATA_ROWS, ANSWERS]);
                            }
                        } else if (ANS_MSG_HDR.MSG_CODE == -2 || ANS_MSG_HDR.MSG_CODE == 10000) {
                            if (!$localStorage.hasLoginAlert) {
                                $localStorage.hasLoginAlert = true;
                                $rootScope.logout();
                                myAlert("您还未登录或会话超时！", function () {
                                    $localStorage.hasLoginAlert = false;
                                    $state.go("auth.login");
                                }, function () {
                                    $localStorage.hasLoginAlert = false;
                                    $state.go("auth.login");
                                });
                            }
                        } else {
                            deferred.resolve([null, null, ANSWERS]);
                            if (ANS_MSG_HDR.MSG_CODE != -130011) {
                            	var alertText = ANS_MSG_HDR.MSG_TEXT;
                            	if (ANS_MSG_HDR.MSG_TEXT && ANS_MSG_HDR.MSG_TEXT.indexOf("错误信息：") != -1) {
                                    alertText = ANS_MSG_HDR.MSG_TEXT.slice(ANS_MSG_HDR.MSG_TEXT.indexOf("错误信息：") + 5);
                                }
                            	$http.get("./data/busierror.json").then(function (result) {
                            		var busierror = "", intererror = "", deferror = "";
                            		if (result.data[service_id]) {
                            			angular.forEach(result.data[service_id], function (d) {
                            				if (d.msg_code == ANS_MSG_HDR.MSG_CODE) {
                            					busierror = d.msg_desc;
                            					intererror = d.msg_text;
                            				} else if (d.msg_code == "defualt") {
                            					deferror = d.msg_desc;
                            				}
                            			});
                            		}
                            		if (intererror) {
                            			alertText = "【" + service_id + "】" + intererror;
                            		} else {
                            			alertText = "【" + service_id + "】" + alertText;
                            		}
                            		if (busierror) {
                            			alertText = '<div class="line-dashed b-b m-l-xs"><h3>' + busierror + '</h3></div><div class="m-t-xs">' + alertText + '</div>';
                            		} else if (deferror) {
                            			alertText = '<div class="line-dashed b-b m-l-xs"><h3>' + deferror + '</h3></div><div class="m-t-xs">' + alertText + '</div>';
                            		}
                            		myAlert(alertText);
                            		throw new Error("\n\n\n【功能号】->" + service_id + "\n\n" + ANS_MSG_HDR.MSG_TEXT + "\n\n\n");
                            	});
                            }
                        }
                    } catch (e) {
                        throw new Error(e.message);
                    }
                }, function (data) {
                    deferred.reject(data);
                })
                return deferred.promise;
            }
        }
    } ]);

module.exports = myHttp;
});
define("angular-seed-spm/0.0.1/src/components/service/default/kibhHttp-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.kibhHttp', [])
    .factory('kibhHttp', [ 'myHttp', '$state', '$q', '$localStorage', '$modal', 'myAlert', 'kibhRoot', function (myHttp, $state, $q, $localStorage, $modal, myAlert, kibhRoot) {
        return {
            post: function (param) {
                var level = $localStorage.bizsconfig[param.req.BUSINESS_ID].SECURITY_LEVEL;

                var mobilecode = level && level.indexOf("1") >= 0, mhttp, ms = true;
                var fundpwd = level && level.indexOf("2") >= 0, fhttp, fs = true;
                var video = level && level.indexOf("3") >= 0, vs = true;

                if (mobilecode) {
                    mhttp = myHttp.post({
                        root: kibhRoot,
                        req: {
                            service: "890018",
                            BUSINESS_ID: param.req.BUSINESS_ID,
                            BUSI_LOG_NO: param.req.BUSI_LOG_NO,
                            VERIFY_CODE: $localStorage.safelevel_code,
                            CODE_ID: $localStorage.safelevel_code_id
                        }
                    }).then(function (data) {
                        ms = data[0] != null;
                    });
                }

                if (fundpwd) {
                    fhttp = myHttp.post({
                        root: kibhRoot,
                        req: {
                            service: "870012",
                            BUSINESS_ID: param.req.BUSINESS_ID,
                            BUSI_LOG_NO: param.req.BUSI_LOG_NO,
                            FUND_PWD: $localStorage.safelevel_fundpwd
                        }
                    }).then(function (data) {
                        fs = data[0] != null;
                    });
                }
                param.root = kibhRoot;
                return $q.all([mhttp, fhttp]).then(function () {
                    if (ms && fs) {
                    	if(video) {
                    		var videoreq, rltdata = 0;
                    		
                    		var asyncGreet = function() {
                    			var deferred = $q.defer();
                    			$modal.open({
                                  	backdrop: "static",
                                  	size: 'lg',
                                  	templateUrl: 'apps/src/blocks/directivetpl/kibh/anyChatModal.html',
                                  	controller: ['$scope', '$state', '$modalInstance', 'myAlert', function ($scope, $state, $modalInstance, myAlert) {
                                  		$scope.bizid = param.req.BUSINESS_ID;
	                                  	$scope.busilogno = param.req.BUSI_LOG_NO;

                                  		$scope.success = function () {
                                          	$modalInstance.close();
                                      	};

                                      	$scope.failed = function () {
                                          	$modalInstance.dismiss('cancel');
                                      	};
                                      	
                                      	$scope.cancel = function() {
                                      		closeVideoServer();
                                      		$scope.failed();
	                                	};
                                      	
                                      	$modalInstance.result.then(function () {
                                  			myAlert("视频见证成功，点击下一步继续办理！", function() {
                                  				deferred.resolve(1);
                                  			})
                                      	}, function () {
                                      		myAlert("视频见证失败， 点击确定重新见证！", function() {
                                      			deferred.reject(0);
                                      		})
                                        });
                                  	}]
                      			});
                			   
                			  	return deferred.promise;  
                			}  
                    		
                    		return asyncGreet(0).then(function(data) {
                    			return myHttp.post(param);
                    		}, function(data) {
                    			return;
                    		});
                    	} else {
                    		return myHttp.post(param);
                    	}
                    }
                })
            }
        }
    } ]);
});
define("angular-seed-spm/0.0.1/src/components/service/default/myAlert-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.myAlert', [])
    .factory("myAlert", [ '$modal', function ($modal) {
        return function (content, ok, cancel, title, oktxt, titleico, okico) {
        	return $modal.open({
                backdrop: "static",
                templateUrl: 'apps/src/blocks/servicetpl/alert.html',
                controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.content = content;
                    $scope.title = title || "提示框";
                    $scope.oktxt = oktxt || "确定";
                    $scope.titleico = titleico || '<i class="fa fa-exclamation-circle m-r-xs text-md"></i>';
                    $scope.okico = okico || '<i class="fa fa-fw fa-check"></i>';

                    $modalInstance.result.then(function () {
                        typeof ok == "function" && ok();
                    }, function () {
                        typeof cancel == "function" && cancel();
                    });

                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                } ]
            });
        }
    } ]);
});
define("angular-seed-spm/0.0.1/src/components/service/default/myConfirm-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.myConfirm', [])
    .factory("myConfirm", [ '$modal', function ($modal) {
        return function (content, ok, cancel, title, oktxt, canceltxt, titleico, okico, cancelico) {
        	return $modal.open({
                backdrop: "static",
                templateUrl: 'apps/src/blocks/servicetpl/confirm.html',
                controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.content = content;
                    $scope.title = title || "确认提示框";
                    $scope.oktxt = oktxt || "确定";
                    $scope.canceltxt = canceltxt || "取消";
                    $scope.titleico = titleico || '<i class="fa fa-question-circle m-r-xs text-md"></i>';
                    $scope.okico = okico || '<i class="fa fa-fw fa-check"></i>';
                    $scope.cancelico = cancelico || '<i class="fa fa-fw fa-remove"></i>';

                    $modalInstance.result.then(function () {
                        typeof ok == "function" && ok();
                    }, function () {
                        typeof cancel == "function" && cancel();
                    });

                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                } ]
            });
        }
    } ]);
});
define("angular-seed-spm/0.0.1/src/components/service/default/rsa-debug", [], function(require, exports, module){
'use strict';

var rsa = angular.module('ASS.service.rsa', [])
    .factory("rsa", [ '$modal', function ($modal) {
        // Copyright (c) 2005  Tom Wu
        // All Rights Reserved.
        // See "LICENSE" for details.

        // Basic JavaScript BN library - subset useful for RSA encryption.

        // Bits per digit
        var dbits;

        // JavaScript engine analysis
        var canary = 0xdeadbeefcafe;
        var j_lm = ((canary & 0xffffff) == 0xefcafe);

        // (public) Constructor
        function BigInteger(a, b, c) {
            if (a != null)
                if ("number" == typeof a) this.fromNumber(a, b, c);
                else if (b == null && "string" != typeof a) this.fromString(a, 256);
                else this.fromString(a, b);
        }

        // return new, unset BigInteger
        function nbi() {
            return new BigInteger(null);
        }

        // am: Compute w_j += (x*this_i), propagate carries,
        // c is initial carry, returns final carry.
        // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
        // We need to select the fastest one that works in this environment.

        // am1: use a single mult and divide to get the high bits,
        // max digit bits should be 26 because
        // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
        function am1(i, x, w, j, c, n) {
            while (--n >= 0) {
                var v = x * this[i++] + w[j] + c;
                c = Math.floor(v / 0x4000000);
                w[j++] = v & 0x3ffffff;
            }
            return c;
        }
        // am2 avoids a big mult-and-extract completely.
        // Max digit bits should be <= 30 because we do bitwise ops
        // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
        function am2(i, x, w, j, c, n) {
            var xl = x & 0x7fff,
                xh = x >> 15;
            while (--n >= 0) {
                var l = this[i] & 0x7fff;
                var h = this[i++] >> 15;
                var m = xh * l + h * xl;
                l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
                c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
                w[j++] = l & 0x3fffffff;
            }
            return c;
        }
        // Alternately, set max digit bits to 28 since some
        // browsers slow down when dealing with 32-bit numbers.
        function am3(i, x, w, j, c, n) {
            var xl = x & 0x3fff,
                xh = x >> 14;
            while (--n >= 0) {
                var l = this[i] & 0x3fff;
                var h = this[i++] >> 14;
                var m = xh * l + h * xl;
                l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
                c = (l >> 28) + (m >> 14) + xh * h;
                w[j++] = l & 0xfffffff;
            }
            return c;
        }
        if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
            BigInteger.prototype.am = am2;
            dbits = 30;
        } else if (j_lm && (navigator.appName != "Netscape")) {
            BigInteger.prototype.am = am1;
            dbits = 26;
        } else { // Mozilla/Netscape seems to prefer am3
            BigInteger.prototype.am = am3;
            dbits = 28;
        }

        BigInteger.prototype.DB = dbits;
        BigInteger.prototype.DM = ((1 << dbits) - 1);
        BigInteger.prototype.DV = (1 << dbits);

        var BI_FP = 52;
        BigInteger.prototype.FV = Math.pow(2, BI_FP);
        BigInteger.prototype.F1 = BI_FP - dbits;
        BigInteger.prototype.F2 = 2 * dbits - BI_FP;

        // Digit conversions
        var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
        var BI_RC = new Array();
        var rr, vv;
        rr = "0".charCodeAt(0);
        for (vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
        rr = "a".charCodeAt(0);
        for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
        rr = "A".charCodeAt(0);
        for (vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

        function int2char(n) {
            return BI_RM.charAt(n);
        }

        function intAt(s, i) {
            var c = BI_RC[s.charCodeAt(i)];
            return (c == null) ? -1 : c;
        }

        // (protected) copy this to r
        function bnpCopyTo(r) {
            for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
            r.t = this.t;
            r.s = this.s;
        }

        // (protected) set from integer value x, -DV <= x < DV
        function bnpFromInt(x) {
            this.t = 1;
            this.s = (x < 0) ? -1 : 0;
            if (x > 0) this[0] = x;
            else if (x < -1) this[0] = x + this.DV;
            else this.t = 0;
        }

        // return bigint initialized to value
        function nbv(i) {
            var r = nbi();
            r.fromInt(i);
            return r;
        }

        // (protected) set from string and radix
        function bnpFromString(s, b) {
            var k;
            if (b == 16) k = 4;
            else if (b == 8) k = 3;
            else if (b == 256) k = 8; // byte array
            else if (b == 2) k = 1;
            else if (b == 32) k = 5;
            else if (b == 4) k = 2;
            else {
                this.fromRadix(s, b);
                return;
            }
            this.t = 0;
            this.s = 0;
            var i = s.length,
                mi = false,
                sh = 0;
            while (--i >= 0) {
                var x = (k == 8) ? s[i] & 0xff : intAt(s, i);
                if (x < 0) {
                    if (s.charAt(i) == "-") mi = true;
                    continue;
                }
                mi = false;
                if (sh == 0)
                    this[this.t++] = x;
                else if (sh + k > this.DB) {
                    this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                    this[this.t++] = (x >> (this.DB - sh));
                } else
                    this[this.t - 1] |= x << sh;
                sh += k;
                if (sh >= this.DB) sh -= this.DB;
            }
            if (k == 8 && (s[0] & 0x80) != 0) {
                this.s = -1;
                if (sh > 0) this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
            }
            this.clamp();
            if (mi) BigInteger.ZERO.subTo(this, this);
        }

        // (protected) clamp off excess high words
        function bnpClamp() {
            var c = this.s & this.DM;
            while (this.t > 0 && this[this.t - 1] == c) --this.t;
        }

        // (public) return string representation in given radix
        function bnToString(b) {
            if (this.s < 0) return "-" + this.negate().toString(b);
            var k;
            if (b == 16) k = 4;
            else if (b == 8) k = 3;
            else if (b == 2) k = 1;
            else if (b == 32) k = 5;
            else if (b == 4) k = 2;
            else return this.toRadix(b);
            var km = (1 << k) - 1,
                d, m = false,
                r = "",
                i = this.t;
            var p = this.DB - (i * this.DB) % k;
            if (i-- > 0) {
                if (p < this.DB && (d = this[i] >> p) > 0) {
                    m = true;
                    r = int2char(d);
                }
                while (i >= 0) {
                    if (p < k) {
                        d = (this[i] & ((1 << p) - 1)) << (k - p);
                        d |= this[--i] >> (p += this.DB - k);
                    } else {
                        d = (this[i] >> (p -= k)) & km;
                        if (p <= 0) {
                            p += this.DB;
                            --i;
                        }
                    }
                    if (d > 0) m = true;
                    if (m) r += int2char(d);
                }
            }
            return m ? r : "0";
        }

        // (public) -this
        function bnNegate() {
            var r = nbi();
            BigInteger.ZERO.subTo(this, r);
            return r;
        }

        // (public) |this|
        function bnAbs() {
            return (this.s < 0) ? this.negate() : this;
        }

        // (public) return + if this > a, - if this < a, 0 if equal
        function bnCompareTo(a) {
            var r = this.s - a.s;
            if (r != 0) return r;
            var i = this.t;
            r = i - a.t;
            if (r != 0) return (this.s < 0) ? -r : r;
            while (--i >= 0)
                if ((r = this[i] - a[i]) != 0) return r;
            return 0;
        }

        // returns bit length of the integer x
        function nbits(x) {
            var r = 1,
                t;
            if ((t = x >>> 16) != 0) {
                x = t;
                r += 16;
            }
            if ((t = x >> 8) != 0) {
                x = t;
                r += 8;
            }
            if ((t = x >> 4) != 0) {
                x = t;
                r += 4;
            }
            if ((t = x >> 2) != 0) {
                x = t;
                r += 2;
            }
            if ((t = x >> 1) != 0) {
                x = t;
                r += 1;
            }
            return r;
        }

        // (public) return the number of bits in "this"
        function bnBitLength() {
            if (this.t <= 0) return 0;
            return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ (this.s & this.DM));
        }

        // (protected) r = this << n*DB
        function bnpDLShiftTo(n, r) {
            var i;
            for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
            for (i = n - 1; i >= 0; --i) r[i] = 0;
            r.t = this.t + n;
            r.s = this.s;
        }

        // (protected) r = this >> n*DB
        function bnpDRShiftTo(n, r) {
            for (var i = n; i < this.t; ++i) r[i - n] = this[i];
            r.t = Math.max(this.t - n, 0);
            r.s = this.s;
        }

        // (protected) r = this << n
        function bnpLShiftTo(n, r) {
            var bs = n % this.DB;
            var cbs = this.DB - bs;
            var bm = (1 << cbs) - 1;
            var ds = Math.floor(n / this.DB),
                c = (this.s << bs) & this.DM,
                i;
            for (i = this.t - 1; i >= 0; --i) {
                r[i + ds + 1] = (this[i] >> cbs) | c;
                c = (this[i] & bm) << bs;
            }
            for (i = ds - 1; i >= 0; --i) r[i] = 0;
            r[ds] = c;
            r.t = this.t + ds + 1;
            r.s = this.s;
            r.clamp();
        }

        // (protected) r = this >> n
        function bnpRShiftTo(n, r) {
            r.s = this.s;
            var ds = Math.floor(n / this.DB);
            if (ds >= this.t) {
                r.t = 0;
                return;
            }
            var bs = n % this.DB;
            var cbs = this.DB - bs;
            var bm = (1 << bs) - 1;
            r[0] = this[ds] >> bs;
            for (var i = ds + 1; i < this.t; ++i) {
                r[i - ds - 1] |= (this[i] & bm) << cbs;
                r[i - ds] = this[i] >> bs;
            }
            if (bs > 0) r[this.t - ds - 1] |= (this.s & bm) << cbs;
            r.t = this.t - ds;
            r.clamp();
        }

        // (protected) r = this - a
        function bnpSubTo(a, r) {
            var i = 0,
                c = 0,
                m = Math.min(a.t, this.t);
            while (i < m) {
                c += this[i] - a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            if (a.t < this.t) {
                c -= a.s;
                while (i < this.t) {
                    c += this[i];
                    r[i++] = c & this.DM;
                    c >>= this.DB;
                }
                c += this.s;
            } else {
                c += this.s;
                while (i < a.t) {
                    c -= a[i];
                    r[i++] = c & this.DM;
                    c >>= this.DB;
                }
                c -= a.s;
            }
            r.s = (c < 0) ? -1 : 0;
            if (c < -1) r[i++] = this.DV + c;
            else if (c > 0) r[i++] = c;
            r.t = i;
            r.clamp();
        }

        // (protected) r = this * a, r != this,a (HAC 14.12)
        // "this" should be the larger one if appropriate.
        function bnpMultiplyTo(a, r) {
            var x = this.abs(),
                y = a.abs();
            var i = x.t;
            r.t = i + y.t;
            while (--i >= 0) r[i] = 0;
            for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
            r.s = 0;
            r.clamp();
            if (this.s != a.s) BigInteger.ZERO.subTo(r, r);
        }

        // (protected) r = this^2, r != this (HAC 14.16)
        function bnpSquareTo(r) {
            var x = this.abs();
            var i = r.t = 2 * x.t;
            while (--i >= 0) r[i] = 0;
            for (i = 0; i < x.t - 1; ++i) {
                var c = x.am(i, x[i], r, 2 * i, 0, 1);
                if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                    r[i + x.t] -= x.DV;
                    r[i + x.t + 1] = 1;
                }
            }
            if (r.t > 0) r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
            r.s = 0;
            r.clamp();
        }

        // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
        // r != q, this != m.  q or r may be null.
        function bnpDivRemTo(m, q, r) {
            var pm = m.abs();
            if (pm.t <= 0) return;
            var pt = this.abs();
            if (pt.t < pm.t) {
                if (q != null) q.fromInt(0);
                if (r != null) this.copyTo(r);
                return;
            }
            if (r == null) r = nbi();
            var y = nbi(),
                ts = this.s,
                ms = m.s;
            var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
            if (nsh > 0) {
                pm.lShiftTo(nsh, y);
                pt.lShiftTo(nsh, r);
            } else {
                pm.copyTo(y);
                pt.copyTo(r);
            }
            var ys = y.t;
            var y0 = y[ys - 1];
            if (y0 == 0) return;
            var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
            var d1 = this.FV / yt,
                d2 = (1 << this.F1) / yt,
                e = 1 << this.F2;
            var i = r.t,
                j = i - ys,
                t = (q == null) ? nbi() : q;
            y.dlShiftTo(j, t);
            if (r.compareTo(t) >= 0) {
                r[r.t++] = 1;
                r.subTo(t, r);
            }
            BigInteger.ONE.dlShiftTo(ys, t);
            t.subTo(y, y); // "negative" y so we can replace sub with am later
            while (y.t < ys) y[y.t++] = 0;
            while (--j >= 0) {
                // Estimate quotient digit
                var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
                if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
                    y.dlShiftTo(j, t);
                    r.subTo(t, r);
                    while (r[i] < --qd) r.subTo(t, r);
                }
            }
            if (q != null) {
                r.drShiftTo(ys, q);
                if (ts != ms) BigInteger.ZERO.subTo(q, q);
            }
            r.t = ys;
            r.clamp();
            if (nsh > 0) r.rShiftTo(nsh, r); // Denormalize remainder
            if (ts < 0) BigInteger.ZERO.subTo(r, r);
        }

        // (public) this mod a
        function bnMod(a) {
            var r = nbi();
            this.abs().divRemTo(a, null, r);
            if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r, r);
            return r;
        }

        // Modular reduction using "classic" algorithm
        function Classic(m) {
            this.m = m;
        }

        function cConvert(x) {
            if (x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
            else return x;
        }

        function cRevert(x) {
            return x;
        }

        function cReduce(x) {
            x.divRemTo(this.m, null, x);
        }

        function cMulTo(x, y, r) {
            x.multiplyTo(y, r);
            this.reduce(r);
        }

        function cSqrTo(x, r) {
            x.squareTo(r);
            this.reduce(r);
        }

        Classic.prototype.convert = cConvert;
        Classic.prototype.revert = cRevert;
        Classic.prototype.reduce = cReduce;
        Classic.prototype.mulTo = cMulTo;
        Classic.prototype.sqrTo = cSqrTo;

        // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
        // justification:
        //         xy == 1 (mod m)
        //         xy =  1+km
        //   xy(2-xy) = (1+km)(1-km)
        // x[y(2-xy)] = 1-k^2m^2
        // x[y(2-xy)] == 1 (mod m^2)
        // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
        // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
        // JS multiply "overflows" differently from C/C++, so care is needed here.
        function bnpInvDigit() {
            if (this.t < 1) return 0;
            var x = this[0];
            if ((x & 1) == 0) return 0;
            var y = x & 3; // y == 1/x mod 2^2
            y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
            y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
            y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
            // last step - calculate inverse mod DV directly;
            // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
            y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
            // we really want the negative inverse, and -DV < y < DV
            return (y > 0) ? this.DV - y : -y;
        }

        // Montgomery reduction
        function Montgomery(m) {
            this.m = m;
            this.mp = m.invDigit();
            this.mpl = this.mp & 0x7fff;
            this.mph = this.mp >> 15;
            this.um = (1 << (m.DB - 15)) - 1;
            this.mt2 = 2 * m.t;
        }

        // xR mod m
        function montConvert(x) {
            var r = nbi();
            x.abs().dlShiftTo(this.m.t, r);
            r.divRemTo(this.m, null, r);
            if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r, r);
            return r;
        }

        // x/R mod m
        function montRevert(x) {
            var r = nbi();
            x.copyTo(r);
            this.reduce(r);
            return r;
        }

        // x = x/R mod m (HAC 14.32)
        function montReduce(x) {
            while (x.t <= this.mt2) // pad x so am has enough room later
                x[x.t++] = 0;
            for (var i = 0; i < this.m.t; ++i) {
                // faster way of calculating u0 = x[i]*mp mod DV
                var j = x[i] & 0x7fff;
                var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
                // use am to combine the multiply-shift-add into one call
                j = i + this.m.t;
                x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
                // propagate carry
                while (x[j] >= x.DV) {
                    x[j] -= x.DV;
                    x[++j] ++;
                }
            }
            x.clamp();
            x.drShiftTo(this.m.t, x);
            if (x.compareTo(this.m) >= 0) x.subTo(this.m, x);
        }

        // r = "x^2/R mod m"; x != r
        function montSqrTo(x, r) {
            x.squareTo(r);
            this.reduce(r);
        }

        // r = "xy/R mod m"; x,y != r
        function montMulTo(x, y, r) {
            x.multiplyTo(y, r);
            this.reduce(r);
        }

        Montgomery.prototype.convert = montConvert;
        Montgomery.prototype.revert = montRevert;
        Montgomery.prototype.reduce = montReduce;
        Montgomery.prototype.mulTo = montMulTo;
        Montgomery.prototype.sqrTo = montSqrTo;

        // (protected) true iff this is even
        function bnpIsEven() {
            return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
        }

        // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
        function bnpExp(e, z) {
            if (e > 0xffffffff || e < 1) return BigInteger.ONE;
            var r = nbi(),
                r2 = nbi(),
                g = z.convert(this),
                i = nbits(e) - 1;
            g.copyTo(r);
            while (--i >= 0) {
                z.sqrTo(r, r2);
                if ((e & (1 << i)) > 0) z.mulTo(r2, g, r);
                else {
                    var t = r;
                    r = r2;
                    r2 = t;
                }
            }
            return z.revert(r);
        }

        // (public) this^e % m, 0 <= e < 2^32
        function bnModPowInt(e, m) {
            var z;
            if (e < 256 || m.isEven()) z = new Classic(m);
            else z = new Montgomery(m);
            return this.exp(e, z);
        }

        // protected
        BigInteger.prototype.copyTo = bnpCopyTo;
        BigInteger.prototype.fromInt = bnpFromInt;
        BigInteger.prototype.fromString = bnpFromString;
        BigInteger.prototype.clamp = bnpClamp;
        BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
        BigInteger.prototype.drShiftTo = bnpDRShiftTo;
        BigInteger.prototype.lShiftTo = bnpLShiftTo;
        BigInteger.prototype.rShiftTo = bnpRShiftTo;
        BigInteger.prototype.subTo = bnpSubTo;
        BigInteger.prototype.multiplyTo = bnpMultiplyTo;
        BigInteger.prototype.squareTo = bnpSquareTo;
        BigInteger.prototype.divRemTo = bnpDivRemTo;
        BigInteger.prototype.invDigit = bnpInvDigit;
        BigInteger.prototype.isEven = bnpIsEven;
        BigInteger.prototype.exp = bnpExp;

        // public
        BigInteger.prototype.toString = bnToString;
        BigInteger.prototype.negate = bnNegate;
        BigInteger.prototype.abs = bnAbs;
        BigInteger.prototype.compareTo = bnCompareTo;
        BigInteger.prototype.bitLength = bnBitLength;
        BigInteger.prototype.mod = bnMod;
        BigInteger.prototype.modPowInt = bnModPowInt;

        // "constants"
        BigInteger.ZERO = nbv(0);
        BigInteger.ONE = nbv(1);
        // prng4.js - uses Arcfour as a PRNG

        function Arcfour() {
            this.i = 0;
            this.j = 0;
            this.S = new Array();
        }

        // Initialize arcfour context from key, an array of ints, each from [0..255]
        function ARC4init(key) {
            var i, j, t;
            for (i = 0; i < 256; ++i)
                this.S[i] = i;
            j = 0;
            for (i = 0; i < 256; ++i) {
                j = (j + this.S[i] + key[i % key.length]) & 255;
                t = this.S[i];
                this.S[i] = this.S[j];
                this.S[j] = t;
            }
            this.i = 0;
            this.j = 0;
        }

        function ARC4next() {
            var t;
            this.i = (this.i + 1) & 255;
            this.j = (this.j + this.S[this.i]) & 255;
            t = this.S[this.i];
            this.S[this.i] = this.S[this.j];
            this.S[this.j] = t;
            return this.S[(t + this.S[this.i]) & 255];
        }

        Arcfour.prototype.init = ARC4init;
        Arcfour.prototype.next = ARC4next;

        // Plug in your RNG constructor here
        function prng_newstate() {
            return new Arcfour();
        }

        // Pool size must be a multiple of 4 and greater than 32.
        // An array of bytes the size of the pool will be passed to init()
        var rng_psize = 256;
        // Random number generator - requires a PRNG backend, e.g. prng4.js

        // For best results, put code like
        // <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
        // in your main HTML document.

        var rng_state;
        var rng_pool;
        var rng_pptr;

        // Mix in a 32-bit integer into the pool
        function rng_seed_int(x) {
            rng_pool[rng_pptr++] ^= x & 255;
            rng_pool[rng_pptr++] ^= (x >> 8) & 255;
            rng_pool[rng_pptr++] ^= (x >> 16) & 255;
            rng_pool[rng_pptr++] ^= (x >> 24) & 255;
            if (rng_pptr >= rng_psize) rng_pptr -= rng_psize;
        }

        // Mix in the current time (w/milliseconds) into the pool
        function rng_seed_time() {
            rng_seed_int(new Date().getTime());
        }

        // Initialize the pool with junk if needed.
        if (rng_pool == null) {
            rng_pool = new Array();
            rng_pptr = 0;
            var t;
            if (window.crypto && window.crypto.getRandomValues) {
                // Use webcrypto if available
                var ua = new Uint8Array(32);
                window.crypto.getRandomValues(ua);
                for (t = 0; t < 32; ++t)
                    rng_pool[rng_pptr++] = ua[t];
            }
            if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
                // Extract entropy (256 bits) from NS4 RNG if available
                var z = window.crypto.random(32);
                for (t = 0; t < z.length; ++t)
                    rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
            }
            while (rng_pptr < rng_psize) { // extract some randomness from Math.random()
                t = Math.floor(65536 * Math.random());
                rng_pool[rng_pptr++] = t >>> 8;
                rng_pool[rng_pptr++] = t & 255;
            }
            rng_pptr = 0;
            rng_seed_time();
            //rng_seed_int(window.screenX);
            //rng_seed_int(window.screenY);
        }

        function rng_get_byte() {
            if (rng_state == null) {
                rng_seed_time();
                rng_state = prng_newstate();
                rng_state.init(rng_pool);
                for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
                    rng_pool[rng_pptr] = 0;
                rng_pptr = 0;
                //rng_pool = null;
            }
            // TODO: allow reseeding after first request
            return rng_state.next();
        }

        function rng_get_bytes(ba) {
            var i;
            for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
        }

        function SecureRandom() {}

        SecureRandom.prototype.nextBytes = rng_get_bytes;
        // Depends on jsbn.js and rng.js

        // Version 1.1: support utf-8 encoding in pkcs1pad2

        // convert a (hex) string to a bignum object
        function parseBigInt(str, r) {
            return new BigInteger(str, r);
        }

        function linebrk(s, n) {
            var ret = "";
            var i = 0;
            while (i + n < s.length) {
                ret += s.substring(i, i + n) + "\n";
                i += n;
            }
            return ret + s.substring(i, s.length);
        }

        function byte2Hex(b) {
            if (b < 0x10)
                return "0" + b.toString(16);
            else
                return b.toString(16);
        }

        // PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
        function pkcs1pad2(s, n) {
            if (n < s.length + 11) { // TODO: fix for utf-8
                alert("Message too long for RSA");
                return null;
            }
            var ba = new Array();
            var i = s.length - 1;
            while (i >= 0 && n > 0) {
                var c = s.charCodeAt(i--);
                if (c < 128) { // encode using utf-8
                    ba[--n] = c;
                } else if ((c > 127) && (c < 2048)) {
                    ba[--n] = (c & 63) | 128;
                    ba[--n] = (c >> 6) | 192;
                } else {
                    ba[--n] = (c & 63) | 128;
                    ba[--n] = ((c >> 6) & 63) | 128;
                    ba[--n] = (c >> 12) | 224;
                }
            }
            ba[--n] = 0;
            var rng = new SecureRandom();
            var x = new Array();
            while (n > 2) { // random non-zero pad
                x[0] = 0;
                while (x[0] == 0) rng.nextBytes(x);
                ba[--n] = x[0];
            }
            ba[--n] = 2;
            ba[--n] = 0;
            return new BigInteger(ba);
        }

        var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64padchar="=";

        function hex2b64(h) {
            var i;
            var c;
            var ret = "";
            for(i = 0; i+3 <= h.length; i+=3) {
                c = parseInt(h.substring(i,i+3),16);
                ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
            }
            if(i+1 == h.length) {
                c = parseInt(h.substring(i,i+1),16);
                ret += b64map.charAt(c << 2);
            }
            else if(i+2 == h.length) {
                c = parseInt(h.substring(i,i+2),16);
                ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
            }
            while((ret.length & 3) > 0) ret += b64padchar;
            return ret;
        }

        // convert a base64 string to hex
        function b64tohex(s) {
            var ret = ""
            var i;
            var k = 0; // b64 state, 0-3
            var slop;
            for(i = 0; i < s.length; ++i) {
                if(s.charAt(i) == b64padchar) break;
                v = b64map.indexOf(s.charAt(i));
                if(v < 0) continue;
                if(k == 0) {
                    ret += int2char(v >> 2);
                    slop = v & 3;
                    k = 1;
                }
                else if(k == 1) {
                    ret += int2char((slop << 2) | (v >> 4));
                    slop = v & 0xf;
                    k = 2;
                }
                else if(k == 2) {
                    ret += int2char(slop);
                    ret += int2char(v >> 2);
                    slop = v & 3;
                    k = 3;
                }
                else {
                    ret += int2char((slop << 2) | (v >> 4));
                    ret += int2char(v & 0xf);
                    k = 0;
                }
            }
            if(k == 1)
                ret += int2char(slop << 2);
            return ret;
        }

        // convert a base64 string to a byte/number array
        function b64toBA(s) {
            //piggyback on b64tohex for now, optimize later
            var h = b64tohex(s);
            var i;
            var a = new Array();
            for(i = 0; 2*i < h.length; ++i) {
                a[i] = parseInt(h.substring(2*i,2*i+2),16);
            }
            return a;
        }

        // "empty" RSA key constructor
        function RSAKey() {
            this.n = null;
            this.e = 0;
            this.d = null;
            this.p = null;
            this.q = null;
            this.dmp1 = null;
            this.dmq1 = null;
            this.coeff = null;
        }

        // Set the public key fields N and e from hex strings
        function RSASetPublic(N, E) {
            if (N != null && E != null && N.length > 0 && E.length > 0) {
                this.n = parseBigInt(N, 16);
                this.e = parseInt(E, 16);
            } else
                alert("Invalid RSA public key");
        }

        // Perform raw public operation on "x": return x^e (mod n)
        function RSADoPublic(x) {
            return x.modPowInt(this.e, this.n);
        }

        // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
        function RSAEncrypt(text) {
            var m = pkcs1pad2(text, (this.n.bitLength() + 7) >> 3);
            if (m == null) return null;
            var c = this.doPublic(m);
            if (c == null) return null;
            var h = c.toString(16);
            if ((h.length & 1) == 0) return h;
            else return "0" + h;
        }

        // Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
        function RSAEncryptB64(text) {
            var h = this.encrypt(text);
            if(h) return hex2b64(h); else return null;
        }

        // protected
        RSAKey.prototype.doPublic = RSADoPublic;

        // public
        RSAKey.prototype.setPublic = RSASetPublic;
        RSAKey.prototype.encrypt = RSAEncrypt;
        RSAKey.prototype.encrypt_b64 = RSAEncryptB64;


        return {
            getPassword:function(password){
                var rsaKey = new RSAKey();
                rsaKey.setPublic("b02cfd123bd652c671fb9f58f47091a1deb88dbf95fc77ae530f213bb765099db04b9f68b83631ca76bcf63496f265f4677938111a753a6567fc83cfa6ee972aac7428dd5af8f9614b4e48fb71923582fdd9ee7f305722cb89da7a506c1aab77a227c831ab9793a55c27b9374f9daf66c8b234ab8bc0b1d1b493841bd203ffcb", "10001");

                return  rsaKey.encrypt_b64(password);
            }
        }
    } ]);
module.exports = rsa;
});
define("angular-seed-spm/0.0.1/src/components/service/custom/adnotService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.adnotService', [])
    .factory('adnotService', ['myHttp', function (myHttp) {
        return {
            /**
             * 查询广告公告
             * @param param
             *   - type      广告公告类型
             *   - type_val  广告公告类别
             *   - stat      状态（1启用 0停用）
             *   - id        ID
             *   - name      标题
             *   - ext_con   扩展条件
             *   - cur_page  当前页数
             *   - ret_rows  返回行数
             *   - order_by  排序字段
             * @returns {*}
             */
            getAdOrNote: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "730003",
                        type: param.type ? param.type : "",
                        type_val: param.type_val ? param.type_val : "",
                        stat: param.stat ? param.stat : "",
                        id: param.id ? param.id : "",
                        name: param.name ? param.name : "",
                        ext_con: param.ext_con ? param.ext_con : "",
                        cur_page: param.cur_page ? param.cur_page : "1",
                        ret_rows: param.ret_rows ? param.ret_rows : "10",
                        order_by: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            }

        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/detailService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.detailService', [])
    .factory('detailService', ['myHttp', function (myHttp) {
        return {
            getDetail: function (params) {//controller 统一传具体的业务参数对象
                var reqParams = {};
                reqParams.req = params;
                return myHttp.post(reqParams);
            },
            getList: function (params) {
                var reqParams = {};
                reqParams.req = params;
                return myHttp.post(reqParams);
            },

            /**
             * 查询产品公告。
             *
             * @param param
             *   - pro_id        产品编号
             *   - not_id        公告编号
             *   - type_id       公告类型
             *   - par_ type_id  父类型编号
             *   - qry_type      查询标识
             *   - cur_page      分页页码
             *   - ret_rows      每页数据条数
             *   - order_by      排序字段
             * @returns {*}
             */
            getPrdNoteFile: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710021',
                        pro_id: param.pro_id ? param.pro_id : '',
                        not_id: param.not_id ? param.not_id : '',
                        type_id: param.type_id ? param.type_id : '',
                        par_type_id: param.par_type_id ? param.par_type_id : '',
                        qry_type: param.qry_type ? param.qry_type : '',
                        cur_page: param.cur_page ? param.cur_page : '',
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品详情。
             *
             * @param param
             *   - pro_id    产品编号
             *   - pro_code  产品代码
             *
             * @returns {*}
             */
            getPrdDetail: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710013',
                        pro_id: param.pro_id ? param.pro_id : '',
                        pro_code: param.pro_code ? param.pro_code : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品投资组合（资产配置）。
             *
             * @param param
             * @returns {*}
             */
            getAssetAllocation: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710022',
                        pro_id: param.pro_id ? param.pro_id : '',
                        cur_page: param.cur_page ? param.cur_page : '',
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询组合产品详情。
             *
             * @param param
             *   - pro_id    产品编号
             *
             * @returns {*}
             */
            getZhcp: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710016",
                        pro_id: param.pro_id ? param.pro_id : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品净值。
             *
             * @param param
             *    - pro_id    产品编号
             *    - trd_date  净值日期
             *    - cur_page  分页页码
             *    - ret_rows  每页数据条数
             *    - order_by  排序字段
             * @returns {*}
             */
            getPrdPriceValue: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710019',
                        pro_id: param.pro_id ? param.pro_id : '',
                        trd_date: param.trd_date ? param.trd_date : '',
                        cur_page: param.cur_page ? param.cur_page : '',
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品分红信息。
             *
             * @param param
             *   - pro_id    产品编号
             *   - qry_type  查询标识
             *   - cur_page  分页页码
             *   - ret_rows  每页数据条数
             *   - order_by  排序字段
             * @returns {*}
             */
            getPrdBonus: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710020',
                        pro_id: param.pro_id ? param.pro_id : '',
                        qry_type: param.qry_type ? param.qry_type : '',
                        cur_page: param.cur_page ? param.cur_page : '1',
                        ret_rows: param.ret_rows ? param.ret_rows : '10'
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询组合产品配置详情。
             *
             * @param param
             *   - pack_pro_id    产品编号
             *   - pack_pro_code  产品代码
             *   - ext_con        扩展条件
             *   - cur_page       当前页数
             *   - ret_rows       返回行数
             *   - order_by       排序字段

             * @returns {*}
             */
            getZhcpAssetAllocation: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710017',
                        pack_pro_id: param.pack_pro_id ? param.pack_pro_id : '',
                        pack_pro_code: param.pack_pro_code ? param.pack_pro_code : '',
                        ext_con: param.ext_con ? param.ext_con : '',
                        cur_page: param.cur_page ? param.cur_page : -1,
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品费率结构。
             *
             * @param param
             *   - pro_id    产品编号
             *   - fee_type  收费类型
             *   - fee_mode  收费模式
             *   - ext_con   扩展条件
             *   - cur_page  当前页数
             *   - ret_rows  返回行数
             *   - order_by  排序字段

             * @returns {*}
             */
            getRateStructure: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710023',
                        pro_id: param.pro_id ? param.pro_id : '',
                        fee_type: param.fee_type ? param.fee_type : '',
                        fee_mode: param.fee_mode ? param.fee_mode : '',
                        ext_con: param.ext_con ? param.ext_con : '',
                        cur_page: param.cur_page ? param.cur_page : -1,
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询资讯产品价格
             *
             * @param param
             *   - PRO_ID
             *   - FEE_TYPE
             *   - FEE_MODE
             *   - CUR_PAGE
             *   - RET_ROWS
             *   - ORDER_BY

             * @returns {*}
             */
            getZxPrdPrice: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710025',
                        pro_id: param.pro_id ? param.pro_id : '',
                        fee_type: param.fee_type ? param.fee_type : '',
                        fee_mode: param.fee_mode ? param.fee_mode : '',
                        cur_page: param.cur_page ? param.cur_page : -1,
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 查询是否首次购买
             *
             * @param param
             *   - pro_sou 产品来源
             *   - inst_id 外部产品编号
             * @returns {*}
             */
            getIsOneBuy: function (pro_sou, inst_id) {
                var params = {
                    req: {
                        service: '740013',
                        pro_sou: pro_sou ? pro_sou : '',
                        inst_id: inst_id ? inst_id : ''
                    }
                };
                return myHttp.post(params);
            }

        };
    }]);


});
define("angular-seed-spm/0.0.1/src/components/service/custom/infoPrdService-debug", [], function(require, exports, module){
'use strict';
// 资讯产品
module.exports = angular.module('ASS.service.infoPrdService', [])
    .factory('infoPrdService', ['myHttp', function (myHttp) {
        return {
            getList: function (parms, page) {
                return myHttp.post({req: {service: "710012", sale_sta: parms.sale_sta, fee_type: parms.fee_type, fee_mode: parms.fee_mode,
                    sup_id: parms.sup_id, cur_page: page.currentpage, ret_rows: page.pagesize}})
            },
            recommendList: function () {
                return myHttp.post({req: {service: "710003", pref_type: 3, ret_rows: 4, cur_page: 1}})
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/exclusiveService-debug", [], function(require, exports, module){
'use strict';

// 专区（理财产品首页）service
module.exports = angular.module('ASS.service.exclusiveService', [])
    .factory('exclusiveService', ['myHttp', function (myHttp) {
        return {
            /**
             * 专区产品查询。
             *
             * @param param
             *     pref_id     专区编号
             *     pref_type   专区类型
             *     pro_type    产品类型
             *     inve_start  投资起点（元）
             *     cur_page    分页页码
             *     ret_rows    每页数据条数
             *     order_by    排序字段
             *     lvl2_type   产品二级分类
             *     ext_con     扩展条件
             * @returns {*}
             */
            getPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        pref_id: param.pref_id ? param.pref_id : "",
                        pref_type: param.pref_type ? param.pref_type : "",
                        lvl2_type: param.lvl2_type ? param.lvl2_type : "",
                        pro_type: param.pro_type ? param.pro_type : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        ext_con: param.ext_con ? param.ext_con : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "ORDER_BY"
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/prdlistService-debug", [], function(require, exports, module){
'use strict';

// 理财产品列表service
module.exports = angular.module('ASS.service.prdlistService', [])
    .factory('prdlistService', ['myHttp', function (myHttp) {
        return {
            getresultPrds: function (param) {
                param = param || {};

                var params = {
                    req: {
                        service: "710014",
                        pro_key: param.pro_key ? param.pro_key : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            },

            /*
             * 所有金融产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 投资期限（年）	invest_hori
             * 预期收益（%）	expe_yields
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getallPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710005",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 公募基金产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资类型	fund_pro_type
             * 实际发行规模	iss_amt
             * 基金公司	iss_code
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getgmjjPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710007",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        fund_pro_type: param.fund_pro_type ? param.fund_pro_type : "",
                        regi_org: param.regi_org ? param.regi_org : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 券商理财产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资类型	asset_pro_type
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getqslcPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710015",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",
                        asset_pro_type: param.asset_pro_type ? param.asset_pro_type : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : ""
                    }
                };

                return myHttp.post(params);
            },
            /*
             * 柜台市场产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资期限 invest_hori
             * 投资类型	asset_pro_type
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getgtscPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710015",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",
                        asset_pro_type: param.asset_pro_type ? param.asset_pro_type : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 按类型查询组合产品
             *
             * 组合类型	package_style
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             */
            getzhcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710018",
                        package_style: param,
                        cur_page: -1
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 资管产品（目前与券商理财相同）
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资类型	asset_pro_type
             * 投资期限 invest_hori
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getzgcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710006",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",
                        asset_pro_type: param.asset_pro_type ? param.asset_pro_type : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },
            /*
             * 基金公司
             *
             */
            getjjgsPrds: function () {
                var params = {
                    req: {
                        service: "730004",
                        cur_page: -1,
                        inst_org_types: "2",
                        org_src: "1",
                        order_by: "ext_ta_code"
                    }
                };

                return myHttp.post(params);
            },
            /*
             * 推荐产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资类型	asset_pro_type
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getrecmPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        pref_type: "3",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 4
                    }
                };
                return myHttp.post(params);
            },

            /*
             * 资讯产品
             *
             * 销售状态	sale_sta
             * 收费类型	fee_type
             * 收费模式	fee_mode
             * 资讯供应商	sup_id
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getzxcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710026",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        fee_type: param.fee_type ? param.fee_type : "",
                        fee_mode: param.fee_mode ? param.fee_mode : "",
                        sup_id: param.sup_id ? param.sup_id : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : ""
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 精选产品
             * @param param
             * @returns {*}
             */
            getjxcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "",

                        pref_type: "1"
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 新品专区
             * @param param
             * @returns {*}
             */
            getxpzqPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "",

                        pref_type: "4"
                    }
                };

                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/scartService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.scartService', [])
    .factory('scartService', ['myHttp', function (myHttp) {
        return {
            addScart: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740001",
                        cart_datas: param.cart_datas ? param.cart_datas : ""
                    }
                };
                return myHttp.post(params);
            },

            modifyScart: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740002",
                        cart_datas: param.cart_datas ? param.cart_datas : ""
                    }
                };
                return myHttp.post(params);
            },

            deleteScart: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740003",
                        pro_id: param.pro_id ? param.pro_id : ""
                    }
                };
                return myHttp.post(params);
            },

            getScart: function () {
                var params = {
                    req: {
                        service: "740004"
                    }
                };
                return myHttp.post(params);
            },
            orderConfim: function (payway, params) {
                var params = {
                    req: {
                        service: "740005",
                        pay_way: payway,
                        ord_datas: params
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/accountService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.accountService', [])
    .factory('accountService', ['myHttp', '$window', function (myHttp, $window) {
        return {
            /**
             * 获取登陆用户信息。
             *
             * @param param
             * @returns {*}
             */
            getLoginUserInfo: function () {
                var params = {
                    req: {
                        service: "720000"
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询账户资料。
             *
             * @param param
             * @returns {*}
             */
            getInfo: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720005",
                        SESSION_ID: param.session_id ? param.session_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的消息/系统消息。
             *
             * @param param
             * @returns {*}
             */
            getMessages: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720006",
                        OPER_FLAG: "select",
                        MESSAGE_TYPE: param.message_type ? param.message_type : "",
                        MESSAGE_ID: param.message_id ? param.message_id : "",
                        HASREAD: param.hasread ? param.hasread : "",
                        CUR_PAGE: param.cur_page ? param.cur_page : 1,
                        RET_ROWS: param.ret_rows ? param.ret_rows : 10,
                        ORDER_BY: param.order_by ? param.order_by : "CREATE_TIME DESC"
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 更新消息状态（未读变已读）。
             *
             * @param param
             * @returns {*}
             */
            updataMessage: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720006",
                        OPER_FLAG: "update",
                        MESSAGE_ID: param.message_id ? param.message_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 删除消息。
             *
             * @param param
             * @returns {*}
             */
            deleteMessagesById: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720006",
                        OPER_FLAG: "delete",
                        MESSAGE_TYPE: param.message_type ? param.message_type : "",
                        MESSAGE_ID: param.message_id ? param.message_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的收藏。
             *
             * @param param
             *   - NEED_DETAIL "0"表示要把收藏的产品详情查出来, "1"表示只查产品ID就可以。
             * @returns {*}
             */
            getMyFavorites: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720001",
                        OPER_FLAG: "select",
                        NEED_DETAIL: param.need_detail ? param.need_detail : '1',
                        PRO_ID: param.pro_id ? param.pro_id : "",
                        LVL2_TYPE: param.lvl2_type ? param.lvl2_type : "",
                        CUR_PAGE: param.cur_page ? param.cur_page : -1,
                        RET_ROWS: param.ret_rows ? param.ret_rows : "",
                        ORDER_BY: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            },


            /**
             * 删除我的收藏。
             *
             * @param param
             * @returns {*}
             */
            deleteMyFavorites: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720001",
                        OPER_FLAG: "delete",
                        PRO_ID: param.pro_id ? param.pro_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 加入到我的收藏。
             *
             * @param param
             * @returns {*}
             */
            addMyFavorite: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720001",
                        OPER_FLAG: "add",
                        PRO_ID: param.pro_id ? param.pro_id : "",
                        LVL2_TYPE: param.lvl2_type ? param.lvl2_type : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的订单。
             *
             * @param param
             * @returns {*}
             */
            getOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740006",
                        trd_sno: param.trd_sno ? param.trd_sno : "",
                        trd_sta: param.trd_sta ? param.trd_sta : "",
                        start_date: param.start_date ? param.start_date : "",
                        end_date: param.end_date ? param.end_date : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : "10",
                        order_by: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 删除我的订单(可批量)。
             *
             * @param param
             * @returns {*}
             */
            deleteOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740007",
                        app_sno: param.app_sno ? param.app_sno : ""
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 查询绑定的银行卡
             *
             * @param param
             * @returns {*}
             */
            getBankList: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721010"
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 新增绑定的银行卡
             *
             * @param param
             * @returns {*}
             */
            addBank: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721011",
                        bnk_id: param.bank_no ? param.bank_no : '',
                        acct_num: param.bank_account ? param.bank_account : '',
                        hld_name: param.user_name ? param.user_name : '',
                        cer_num: param.cardno ? param.cardno : '',
                        tel_num: param.user_phone ? param.user_phone : ''
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 移除绑定的银行卡
             *
             * @param param
             * @returns {*}
             */
            delBank: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721012",
                        bnk_id: param.bank_no ? param.bank_no : '',
                        acct_num: param.bank_account ? param.bank_account : '',
                        hld_name: param.user_name ? param.user_name : '',
                        cer_num: param.cardno ? param.cardno : '',
                        tel_num: param.user_phone ? param.user_phone : ''
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 撤销我的订单。
             *
             * @param param
             * @returns {*}
             */
            cancelOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740010",
                        ext_app_sno: param.EXT_APP_SNO ? param.EXT_APP_SNO : "",
                        trd_id: param.TRD_ID ? param.TRD_ID : "",
                        pro_sou: param.PRO_SOU ? param.PRO_SOU : "",
                        app_date: param.APP_DATE ? param.APP_DATE : "",
                        ta_code: param.TA_CODE ? param.TA_CODE : "",
                        trans_acct: param.TRANS_ACCT ? param.TRANS_ACCT : "",
                        order_date: param.ORDER_DATE ? param.ORDER_DATE : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的产品。
             *
             * @param param
             *   - pro_type  产品类型（'4'表示资管产品，'6'基金, '486'柜台）
             *   - inst_id     (集中交易产品代码)（otc产品编号）
             * @returns {*}
             */
            getMyProducts: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740011",
                        pro_type: param.lvl2_type ? param.lvl2_type : "",
                        inst_id: param.inst_id ? param.inst_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 赎回我的产品。
             *
             * @param param
             *   - pro_sou     来源
             *   - inst_id     (集中交易产品代码)（otc产品编号）
             *   - trd_qty     赎回金额
             *   - charge_cls  收费方式（集中交易产品有，otc没有）
             *   - ta_code     登记机构
             *   - trans_acct  交易账号
             * @returns {*}
             */
            redeemMyProduct: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740012",
                        pro_sou: param.pro_sou ? param.pro_sou : "",
                        inst_id: param.inst_id ? param.inst_id : "",
                        trd_qty: param.trd_qty ? param.trd_qty : "",
                        charge_cls: param.charge_cls ? param.charge_cls : "",
                        ta_code: param.TA_CODE ? param.TA_CODE : "",
                        trans_acct: param.TRANS_ACCT ? param.TRANS_ACCT : ""
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 绑定新账户。
             *
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            addBindAccount: function (name, password) {
                return myHttp.post({
                    req: {
                        service: "721009",
                        fundsacct_code: name,
                        trdpwd: password
                    }
                });
            },
            /**
             * 验证资金账号
             * @param login_name 资金账号
             * @param user_password 交易密码
             * @returns {*}
             */
            checkAccount: function (login_name, user_password) {
                return myHttp.post({
                    req: {
                        service: "721008",
                        login_type: 3,
                        login_name: login_name,
                        user_password: user_password
                    }
                });
            },

            /**
             * 查询客户可取资金。
             *
             * @param param
             *   - fundid     资金账号
             *   - moneytype  货币代码
             * @returns {*}
             */
            getMaxDraw: function(param) {
                param = param || {};
                var params = {
                    req : {
                        service: '721018',
                        fundid: param.fundid ? param.fundid : '',
                        moneytype: param.moneytype ? param.moneytype : '',
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询银证转账信息
             * @returns {*}
             */
            getBankTransferInfo: function () {
                return myHttp.post({
                    req: {
                        service: "721013"
                    }
                });
            },
            /**
             * 银证转账
             * @param login_name 资金账号
             * @param user_password 交易密码
             * @returns {*}
             */
            banktransfer: function (param) {
                return myHttp.post({
                    req: {
                        service: "721014",
                        bankpwd : param.bankpwd ? param.bankpwd : '',
                        fundpwd : param.fundpwd ? param.fundpwd : '',
                        banktrantype : param.banktrantype ? param.banktrantype : '',
                        tranamt : param.transfer_money ? param.transfer_money : 0
                    }
                });
            },
            /**
             * 查询银证转账记录
             * @returns {*}
             */
            getTransferList: function () {
                return myHttp.post({
                    req: {
                        service: "721015"
                    }
                });
            },
            /**
             * 检查资金账号
             *
             * @param sessionid          session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            chkAcct: function (name, password) {
                return myHttp.post({
                    req: {
                        service: "721016",
                        fundsacct_code: name,
                        trdpwd: password
                    }
                });
            },
            /**
             * 检查手机验证码是否正确
             *
             * @param sessionid          session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            chkmobilecode: function (param) {
                return myHttp.post({
                    req: {
                        service: "721017",
                        mobile_code: param.code,
                        mobile: param.mobile
                    }
                });
            },
            /*获取手机验证码*/
            getReCode: function (phoneNo) {
                return myHttp.post({req: {service: "720002", phone_no: phoneNo, biz_type: "getDealCode"}});
            }


        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/loginService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.loginService', [])
    .factory('loginService', ['myHttp', function (myHttp) {
        return {

            /**
             * 用户登录
             *
             * @param login_type          登录类型
             * @param login_name          用户名
             * @param user_password      密码
             * @param validator_code       验证码
             * @returns {*}
             */
            subLogin: function (loginuser) {
                return myHttp.post({
                    req: {
                        service: "721003",
                        uuid: loginuser.uuid,
                        validator_code: loginuser.regcode,
                        login_type: loginuser.logintype,
                        login_name: loginuser.username,
                        user_password: loginuser.userpassword
                    }
                });
            },
            /**
             * 检查资金账号 绑定注册账户手机号 是否重复
             * @param sessionid          session_id
             * @returns {*}
             */
            checkmobile: function (mobile) {
                return myHttp.post({
                    req: {
                        service: "721005",
                        phone_no: mobile
                    }
                });
            },

            /**
             * 检查资金账号 绑定注册账户手机号
             *
             * @param sessionid          session_id
             * @param mobile          手机号
             * @param code          验证码
             * @param code_id       验证码id
             * @returns {*}
             */
            bindbyCode: function (mobile, code, uuid) {
                return myHttp.post({
                    req: {
                        service: "721006",
                        bind_type: '2',
                        phone_no: mobile,
                        uuid: uuid,
                        validator_code: code
                    }
                });
            },
            /**
             * 检查资金账号 绑定注册账户手机号
             *
             * @param bing_type          绑定类型
             * @param mobile          手机号
             * @param password          密码
             * @returns {*}
             */
            bindbyPw: function (mobile, password,bind_type) {
                return myHttp.post({
                    req: {
                        service: "721006",
                        bind_type:bind_type,
                        phone_no: mobile,
                        user_password: password
                    }
                });
            },
            /**
             * 检查绑定注册账户手机号
             *
             * @param sessionid          session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            bindbyDeal: function (name, password) {
                return myHttp.post({
                    req: {
                        service: "721004",
                        fundsacct_code: name,
                        trdpwd: password
                    }
                });
            },
            /**
             * 检查资金账号
             *
             * @param sessionid          session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            chkAcct: function (name, password) {
                return myHttp.post({
                    req: {
                        service: "721016",
                        fundsacct_code: name,
                        trdpwd: password
                    }
                });
            },
            /**
             * 检查手机验证码是否正确
             *
             * @param sessionid          session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            chkmobilecode: function (param) {
                return myHttp.post({
                    req: {
                        service: "721017",
                        mobile_code: param.code,
                        mobile: param.mobile
                    }
                });
            },
            /*获取手机验证码*/
            getReCode: function (phoneNo) {
                return myHttp.post({req: {service: "720002", phone_no: phoneNo, biz_type: "getDealCode"}});
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/registerService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.registerService', [])
    .factory('registerService', ['myHttp', function (myHttp) {
        return {
            /*获取手机验证码*/
            getReCode: function (phoneNo) {
                return myHttp.post({req: {service: "720002", phone_no: phoneNo, biz_type: "newreg"}});
            },
            /*获取手机验证码*/
            checkUserName: function (userName) {
                return myHttp.post({req: {service: "721002", user_name: userName}});
            },


            /**
             * 注册
             *
             * @param user_mobile    手机号
             * @param validator_code  验证码
             * @param user_name      用户名
             * @param user_password   用户密码
             * @param email      邮箱
             * @returns {*}
             */
            registerUser: function (pamarm) {
                return myHttp.post({
                    req: {
                        service: "721001",
                        user_mobile: pamarm.mobile,
                        validator_code: pamarm.code,
                        user_name: pamarm.name,
                        user_password: pamarm.password,
                        user_email: pamarm.email,
                        key: ""
                    }
                });
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/pwrecoveryService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.pwrecoveryService', [])
    .factory('pwrecoveryService', ['myHttp', function (myHttp) {
        return {
            /*获取手机验证码*/
            getReCode: function (phoneNo) {
                return myHttp.post({req: {service: "720002", phone_no: phoneNo, biz_type: "getlost"}});
            },

            /**
             * 验证手机
             *
             * @param phone_no    手机号
             * @param verify_code  验证码
             * @param code_id  验证码id
             * @returns {*}
             */
            checkMobile: function (pamarm) {
                return myHttp.post({
                    req: {
                        service: "720003",
                        phone_no: pamarm.mobile,
                        verify_code: pamarm.code,
                        code_id: pamarm.code_id
                    }
                });
            },

            /**
             * 重置密码
             *
             * @param safe_user_id   用户id
             * @param first_pwd  密码
             * @returns {*}
             */
            updatepw: function (pamarm) {
                return myHttp.post({
                    req: {
                        service: "720007",
                        safe_user_id: pamarm.safe_user_id,
                        first_pwd: pamarm.password
                    }
                });
            },
            /**
             * 邮箱重置密码验证
             *
             * @param safe_user_id   用户id
             * @param first_pwd  密码
             * @returns {*}
             */
            checkURLByEmail: function (uid, rtxt) {
                return myHttp.post({
                    req: {
                        service: "720009",
                        safe_random_code: rtxt,
                        safe_user_id: uid
                    }
                });
            },
            /**
             * 发送邮件
             *
             * @param mail_address   邮件地址
             * @returns {*}
             */
            sendEmail: function (email) {
                return myHttp.post({
                    req: {
                        service: "720004",
                        mail_address: email
                    }
                });
            }

        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/orderpayService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.orderpayService', [])
    .factory('orderpayService', ['myHttp', function (myHttp) {
        return {

            /**
             * 绑定账户
             *
             * @param login_name          用户名
             * @param user_password      密码
             * @param session_id      session_id
             * @returns {*}
             */
            bindaccount: function (user) {
                return myHttp.post({
                    req: {
                        service: "721003",
                        session_id: user.sessionid,
                        login_name: user.name,
                        user_password: user.userpassword
                    }
                });
            },
            /**
             * 获取订单信息
             *
             * @param trd_no         父订单号
             * @returns {*}
             */
            getOrderList: function (trd_no) {
                return myHttp.post({
                    req: {
                        service: "740006",
                        trd_sta: 1,
                        trd_sno: trd_no
                    }
                });
            },
            /**
             * 获取资金账号信息
             * @param
             * @returns {*}
             */
            getJZJYZJAccount: function () {
                return myHttp.post({
                    req: {
                        service: "770004"
                    }
                });
            },
            /**
             * 获取资金账号信息
             * @param
             * @returns {*}
             */
            getOTCZJAccount: function () {
                return myHttp.post({
                    req: {
                        service: "750013"
                    }
                });
            },
            /**
             * 验证资金账号
             * @param login_name 资金账号
             * @param user_password 交易密码
             * @returns {*}
             */
            checkAccount: function (login_name, user_password) {
                return myHttp.post({
                    req: {
                        service: "721008",
                        login_type: 3,
                        login_name: login_name,
                        user_password: user_password
                    }
                });
            },

            /**
             * 订单付款。
             *
             * @param param
             *   - trd_sno       父订单ID
             *   - browser_type  浏览器类型标记，如果为‘2‘，表示通过手机验证码下单，则phone_id,verify_code必须传入
             *   - phone_no      手机号
             *   - code_id       手机验证码ID
             * @returns {*}
             */
            subOrder: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740008",
                        pay_way: 1,
                        trd_sno: param.trd_sno ? param.trd_sno : '',
                        browser_type: param.browser_type ? param.browser_type : '',
                        phone_no: param.phone_no ? param.phone_no : '',
                        verify_code: param.verify_code ? param.verify_code : ''
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/accountSafetyService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.accountSafetyService', [])
    .factory('accountSafetyService', ['myHttp', '$window', function (myHttp, $window) {
        return {
            /**
             * 修改密码
             *
             * @param param
             * @returns {*}
             */
            updatePassword: function (param) {
                var params = {
                    req: {
                        service: "720008",
                        session_id: $window.sessionStorage.sessionid,
                        old_pwd: param.old_pwd,
                        first_pwd: param.first_pwd
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 修改绑定邮箱之发送邮件
             *
             * @param param
             * @returns {*}
             */
            sendEmail: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720012",
                        mail_address: param.mail_address ? param.mail_address : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 修改绑定邮箱之验证链接
             *
             * @param param
             * @returns {*}
             */
            checkEmail: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720010",
                        safe_user_id: param.safe_user_id ? param.safe_user_id : "",
                        safe_user_name: param.safe_user_name ? param.safe_user_name : "",
                        safe_random_code: param.safe_random_code ? param.safe_random_code : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 修改绑定手机
             *
             * @param param
             * @returns {*}
             */
            updateBindingPhone: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720011",
                        session_id: $window.sessionStorage.sessionid,
                        new_phone_no: param.new_phone_no ? param.new_phone_no : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 发送手机验证码
             *
             * @param param
             * @returns {*}
             */
            sendPhoneCertifyCode: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720002",
                        phone_no: param.phone_no ? param.phone_no : "",
                        biz_type: param.biz_type ? param.biz_type : "getlost"
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 验证手机验证码
             *
             * @param param
             * @returns {*}
             */
            checkPhoneCertifyCode: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720003",
                        phone_no: param.phone_no ? param.phone_no : "",
                        verify_code: param.verify_code ? param.verify_code : "",
                        code_id: param.code_id ? param.code_id : "",
                        biz_type: param.biz_type ? param.biz_type : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 验证资金账号交易密码
             *
             * @param param
             * @returns {*}
             */
            checkBexIdAndPwd: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721007",
                        fundsacct_code: param.fundsacct_code ? param.fundsacct_code : "",
                        trdpwd: param.trdpwd ? param.trdpwd : ""
                    }
                };
                return myHttp.post(params);
            }
        };
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/confirmorderService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.confirmorderService', [])
    .factory('confirmorderService', ['myHttp', 'kibhRoot', function (myHttp, kibhRoot) {
        return {

            // 根据业务ID获取问卷数据
            getTestInfo: function (param) {

                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890002",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 根据问卷ID获取问题集
            getQuestions: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890003",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 根据问卷ID获取答案集
            getAnswers: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890004",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },


            // 保存客户问卷答题
            saveTestInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890010",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : "",
                        ANSWER_RES: param.ANSWER_RES ? param.ANSWER_RES : ""
                    }
                };
                return myHttp.post(params);
            },

            // 检查客户产品风险情况
            checkType: function (ord_datas) {
                var params = {
                    req: {
                        service: "740009",
                        ord_datas: ord_datas
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/electronicContractSevice-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.electronicContractSevice', [])
    .factory('electronicContractSevice', ['myHttp', '$window', function (myHttp, $window) {
        return {
            /**
             * 电子合同文本查询。
             * @param param
             *   - Ectype   合同类型
             *       ‘1’理财产品电子合同
             *       ‘2’理财产品纸质合同
             *       ‘3’电子签名约定书
             *       ‘4’风险揭示书
             *   - Ecsno    合同编号
             * @returns {*}
             */
            getContract: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "770033",
                        ectype: param.ectype ? param.ectype : "",
                        ecsno: param.ecsno ? param.ecsno : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 电子签名约定书签约功能。
             * @param param
             *   - custid   客户代码
             *   - orgid    机构编码
             *   - ectype   合同类型
             *   - action   签约行为标志
             *       '3'证券业务电子签名约定书
             *       'A'表示增加记录，
             *       'D'标示取消记录。为'D'不是物理删除记录，而是将合同置取消标志。
             * @returns {*}
             */
            agreementSign: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "770029",
                        custid: param.custid ? param.custid : "",
                        orgid: param.orgid ? param.orgid : "",
                        ectype: param.ectype ? param.ectype : "",
                        action: param.action ? param.action : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             *客户电子合同签约功能。
             *
             * @param param
             *   - custid           客户代码
             *   - orgid            机构编码
             *   - fundcode         理财品种代码
             *   - signrisknotice   客户风险揭示书签署标志
             *   - action           签约行为标志
             *   - redeemcontract   现金类产品参与方式
             * @returns {*}
             */
            contractSign: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "770030",
                        inst_id: param.inst_id ? param.inst_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 签署电子签名约定书、客户电子合同。
             *
             * @param param
             *   - custid           客户代码
             *   - orgid            机构编码
             *   - fundcode         理财品种代码
             *   - signrisknotice   客户风险揭示书签署标志
             *   - action           签约行为标志
             *   - redeemcontract   现金类产品参与方式
             * @returns {*}
             */
            allAgreementsSign: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740014",
                        inst_id: param.inst_id ? param.inst_id : ""
                    }
                };
                return myHttp.post(params);
            }

        };
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/prdCommonService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.prdCommonService', [])
    .factory('prdCommonService', ['myHttp', '$window', function (myHttp, $window) {
        return {

            /**
             * 判断产品是否可以被购买。
             *
             * @param product
             * @returns {boolean} 返回true表示可购买
             */
            checkIfCanBuy: function (product) {
                product = product || {};
                if (!product.PAY_WAY) return false;
                else
                    return product.ALLOW_TRDS
                        ? (product.ALLOW_TRDS.indexOf('1100') != -1
                    || product.ALLOW_TRDS.indexOf('1101') != -1
                    || product.ALLOW_TRDS.indexOf('1102') != -1
                    || product.ALLOW_TRDS.indexOf('1110') != -1
                    || product.ALLOW_TRDS.indexOf('1111') != -1
                    || product.ALLOW_TRDS.indexOf('1112') != -1)
                        : false;
            },

            /**
             * 判断产品是否已被收藏。
             *
             * @param product
             * @returns {boolean} 返回true表示已被收藏
             */
            isMyFavorite: function (product) {
                product = product || {};
                if ($window.sessionStorage.favorites && product.PRO_ID) {
                    return $window.sessionStorage.favorites.indexOf(product.PRO_ID) != -1;
                }
                return false;
            },

            /**
             * 把product加入SessionStorage收藏列表。
             *
             * @param product
             */
            addToSessionFavorites: function (product) {
                product = product || {};
                $window.sessionStorage.favorites += ($window.sessionStorage.favorites ? ',' : '') + product.PRO_ID;
            },

            /**
             * 删除SessionStorage收藏列表中的product。
             *
             * @param product
             */
            removeFromSessionFavorites: function (product) {
                product = product || {};
                if ($window.sessionStorage.favorites) {
                    $window.sessionStorage.favorites = $window.sessionStorage.favorites.replace(new RegExp(product.PRO_ID, 'g'), '').replace(/,*([^,]+),+/g, '$1,').replace(/,$/, '');
                }
            }

        };
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/custom/orderService-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.orderService', [])
    .factory('orderService', ['myHttp', function (myHttp) {
        return {
            /**
             * 查询我的订单。
             *
             * @param param
             * @returns {*}
             */
            getOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740006",
                        trd_no: param.trd_no ? param.trd_no : "",
                        trd_sta: param.trd_sta ? param.trd_sta : "",
                        start_date: param.start_date ? param.start_date : "",
                        end_date: param.end_date ? param.end_date : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : "10",
                        order_by: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 删除我的订单(可批量)。
             *
             * @param param
             * @returns {*}
             */
            deleteOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740007",
                        app_sno: param.app_sno ? param.app_sno : ""
                    }
                };
                return myHttp.post(params);
            },


            /**
             * 下单。
             *
             * @param param
             *   - pay_way      支付方式
             *   - recommended  推荐人
             *   - ord_datas    订单（数组形式）
             * @returns {*}
             */
            orderApply: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740005",
                        pay_way: param.pay_way ? param.pay_way : "",
                        recommended: param.recommended ? param.recommended : "",
                        ord_datas: param.ord_datas ? param.ord_datas : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询是否为首次购买。
             *
             * @param param
             *   - pro_sou  产品来源
             *   - inst_id  机构编号
             * @returns {*}
             */
            isFirstPurchase: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '740013',
                        pro_sou: param.pro_sou ? param.pro_sou : '',
                        inst_id: param.inst_id ? param.inst_id : ''
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/kibh/kibhSystem-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.kibhSystem', [])
    .factory('kibhSystem', ['myHttp', 'kibhRoot', function (myHttp, kibhRoot) {
        return {
            // 获取登录用户信息
            getLogUserInfo: function () {
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890023"
                    }
                });
            },

            // 获取登录用户开通的权限状态
            getUserBizs: function (param) {
                param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "860024",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                });
            },

            // 获取登录用户风险测评
            getRiskTest: function () {
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "860027"
                    }
                });
            },

            // 获取登录用户风险测评是否过期
            getRiskTestRlt: function (param) {
            	param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "860027",
                        SURVEY_CLS: param.SURVEY_CLS ? param.SURVEY_CLS : "0"
                    }
                });
            },

            // 获取业务信息
            getBusinessInfo: function (param) {
                param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890001",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSINESS_CLS: param.BUSINESS_CLS ? param.BUSINESS_CLS : ""
                    }
                });
            },

            // 获取业务菜单
            getBizMenu: function () {
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890011"
                    }
                });
            },

            // 获取字典
            getDictInfo: function (param) {
                param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890020",
                        DICT_CODE: param.DICT_CODE ? param.DICT_CODE : ""
                    }
                });
            },

            // 根据业务ID获取问卷数据
            getTestInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890002",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        EXTERNAL_PAPER_NO: param.EXTERNAL_PAPER_NO ? param.EXTERNAL_PAPER_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 根据问卷ID获取问题集
            getQuestions: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890003",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 根据问卷ID获取答案集
            getAnswers: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890004",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取电子协议ID、名称、url
            getProtocolInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 查询客户电子协议签约结果
            getProtocolRlt: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890048",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        AGREEMENT_ID: param.AGREEMENT_ID ? param.AGREEMENT_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 保存客户签署协议
            saveProtocolSign: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890009",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        AGREEMENT_ID: param.AGREEMENT_ID ? param.AGREEMENT_ID : "",
                        SIGN_TYPE: param.SIGN_TYPE ? param.SIGN_TYPE : "",
                        SIGN_REMARK: param.SIGN_REMARK ? param.SIGN_REMARK : ""
                    }
                };
                return myHttp.post(params);
            },

            // 保存客户问卷答题
            saveTestInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890010",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : "",
                        ANSWER_RES: param.ANSWER_RES ? param.ANSWER_RES : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取流水号
            getBusiLogNo: function (bizid) {
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890015",
                        BUSINESS_ID: bizid ? bizid : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取手机验证码
            getMobileCode: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890017",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取新手机验证码
            getNewMobileCode: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890027",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        PHONE_NO: param.PHONE_NO ? param.PHONE_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 校验验证码
            checkVerifiCode: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890018",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CODE_ID: param.CODE_ID ? param.CODE_ID : "",
                        VERIFY_CODE: param.VERIFY_CODE ? param.VERIFY_CODE : "",
                        PHONE_NO: param.PHONE_NO ? param.PHONE_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 校验资金密码
            checkMoneyPwd: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870012",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        FUND_PWD: param.FUND_PWD ? param.FUND_PWD : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取创业板适当性
            checkGEMBoard: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890024",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取港股通适当性
            checkHKStock: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890025",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取退市整理板适当性
            checkDelistStock: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890026",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : ""
                    }
                };
                return myHttp.post(params);
            },

            // 基金账户开户
            openFundAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860038",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TA_CODE: param.TA_CODE ? param.TA_CODE : "",
                        BILL_MAIL_TYPE: param.BILL_MAIL_TYPE ? param.BILL_MAIL_TYPE : "",
                        DIV_METHOD: param.DIV_METHOD ? param.DIV_METHOD : ""
                    }
                };
                return myHttp.post(params);
            },

            // 基金账户查询
            getFundAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860039",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },
            
            // 机构信息查询
            getFundCompany: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860044",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        QUERY_FLAG: param.QUERY_FLAG ? param.QUERY_FLAG : ""
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/kibh/kibhAccount-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.kibhAccount', [])
    .factory('kibhAccount', ['myHttp', 'kibhHttp', 'kibhRoot', '$localStorage', function (myHttp, kibhHttp, kibhRoot, $localStorage) {
        return {
            // 修改交易密码
            modifyTradePwd: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860004",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        NEW_PWD: param.NEW_PWD ? param.NEW_PWD : "",
                        OLD_PWD: param.OLD_PWD ? param.OLD_PWD : "",
                        USE_SCOPE: "0"
                    }
                };
                return kibhHttp.post(params);
            },

            // 修改资金密码
            modifyMoneyPwd: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860004",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        NEW_PWD: param.NEW_PWD ? param.NEW_PWD : "",
                        OLD_PWD: param.OLD_PWD ? param.OLD_PWD : "",
                        USE_SCOPE: "1"
                    }
                };
                return kibhHttp.post(params);
            },

            // 资金查询
            getAssetInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870004",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 股份查询
            getStockInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 交割单查询
            getDeliveryOrder: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870006",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        STR_DATE: param.STR_DATE ? param.STR_DATE : "20140303",
                        END_DATE: param.END_DATE ? param.END_DATE : "20140503"
                    }
                };
                return myHttp.post(params);
            },

            // 对账单查询
            getCheckSheet: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870007",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        STR_DATE: param.STR_DATE ? param.STR_DATE : "20140303",
                        END_DATE: param.END_DATE ? param.END_DATE : "20140503"
                    }
                };
                return myHttp.post(params);
            },

            // 存管信息查询
            getDepositoryInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860121",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        CONTRACT_FLAG: param.CONTRACT_FLAG ? param.CONTRACT_FLAG : ""
                    }
                };
                return myHttp.post(params);
            },

            // 资产账户开户
            openAssetAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860022",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CURRENCY: param.CURRENCY ? param.CURRENCY : ""
                    }
                };
                return myHttp.post(params);
            },

            // 券商发起银证开户
            addBank: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860010",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CURRENCY: param.CURRENCY ? param.CURRENCY : "",
                        EXT_ORG: param.EXT_ORG ? param.EXT_ORG : "",
                        BANK_ACCT: param.BANK_ACCT ? param.BANK_ACCT : "",
                        MAIN_FLAG: param.MAIN_FLAG ? param.MAIN_FLAG : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : ""
                    }
                };
                return myHttp.post(params);
            },

            // 劵商发起银证销户
            deleteBank: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860011",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CURRENCY: param.CURRENCY ? param.CURRENCY : "",
                        EXT_ORG: param.EXT_ORG ? param.EXT_ORG : "",
                        BANK_ACCT: param.BANK_ACCT ? param.BANK_ACCT : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : ""
                    }
                };
                return myHttp.post(params);
            },

            /*操作类型	OPERATION_TYPE
             协议类型	CUST_AGMT_TYPE
             交易板块	STKBD
             交易账户	TRDACCT
             业务ID	BUSINESS_ID
             业务流水号	BUSI_LOG_NO
             */
            // 开通权限
            openRights: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860017",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        //STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        //TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                if (bizsconfig[param.BUSINESS_ID].RIGHT_LVL == 2) {
                	params.req.STKBD = param.STKBD ? param.STKBD : "";
                	params.req.TRDACCT = param.TRDACCT ? param.TRDACCT : "";
                }
                return myHttp.post(params);
            },

            // 开通港股通
            openHKStock: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860018",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 开通创业板
            openGEMBoard: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860171",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        GEM_TYPE: param.GEM_TYPE ? param.GEM_TYPE : ""
                    }
                };
                return myHttp.post(params);
            },

            // 开通退市整理板
            openDelistStock: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860172",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },
            
            // 开通风险警示板
            openRiskStock: function (param) {
            	param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860173",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取股东帐户
            getStockAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860029"
                    }
                };
                return myHttp.post(params);
            },

            // 获得客户业务请求审核表数据
            getAuditData: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890013",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 客户资料查询
            getUserAcctData: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860008",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 客户可操作渠道修改
            updateDelegateMethod: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860043",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CHANNELS: param.CHANNELS ? param.CHANNELS : ""
                    }
                };
                return kibhHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/service/kibh/kibhCustomer-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.service.kibhCustomer', [])
    .factory('kibhCustomer', ['myHttp', 'kibhHttp', 'kibhRoot', '$localStorage', function (myHttp, kibhHttp, kibhRoot, $localStorage) {
        return {
            // 发送影像到账户
            saveIdentityInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860002",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        ID_CODE: param.ID_CODE ? param.ID_CODE : ""
                    }
                };
                return myHttp.post(params);
            },

            // 用户手机号码修改
            modifyMobileInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        MOBILE_TEL: param.MOBILE_TEL ? param.MOBILE_TEL : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户普通资料修改
            modifyBasicInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        TEL: param.TEL ? param.TEL : "",
                        EMAIL: param.EMAIL ? param.EMAIL : "",
                        ADDRESS: param.ADDRESS ? param.ADDRESS : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户重要资料修改
            modifyVitalInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860006",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        ID_TYPE: param.ID_TYPE ? param.ID_TYPE : "",
                        ID_CODE: param.ID_CODE ? param.ID_CODE : "",
                        ID_ADDR: param.ID_ADDR ? param.ID_ADDR : "",
                        ID_ISS_AGCY: param.ID_ISS_AGCY ? param.ID_ISS_AGCY : "",
                        ID_BEG_DATE: param.ID_BEG_DATE ? param.ID_BEG_DATE : "",
                        ID_EXP_DATE: param.ID_EXP_DATE ? param.ID_EXP_DATE : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户拓展信息修改
            modifyOtherInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860126",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        OCCU_TYPE: param.OCCU_TYPE ? param.OCCU_TYPE : "",
                        TRADE: param.TRADE ? param.TRADE : "",
                        EDUCATION: param.EDUCATION ? param.EDUCATION : "",
                        OCCUPATION: param.OCCUPATION ? param.OCCUPATION : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户基本资料查询
            getBasicInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860007",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 用户拓展信息查询
            getOtherInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860037",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 联系人查询
            getContactInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860025",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 联系人修改
            modifyContactInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860026",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        LINKMAN_DELX: param.LINKMAN_DELX ? param.LINKMAN_DELX : "",
                        LINKMAN_TEL_DELX: param.LINKMAN_TEL_DELX ? param.LINKMAN_TEL_DELX : "",
                        LINKMAN_TEL_XXFS: param.LINKMAN_TEL_XXFS ? param.LINKMAN_TEL_XXFS : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 资产账户查询
            getAssetStatus: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860021",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 资产状态维护(冻结、解冻)
            setAssetStatus: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860015",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        CUACCT_STATUS: param.CUACCT_STATUS ? param.CUACCT_STATUS : "0",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // OCR
            doOcrReq: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860104",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        FILE_CON: param.FILE_CON ? param.FILE_CON : "",
                        FACE_MARK: param.FACE_MARK ? param.FACE_MARK : "FRONT"
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/directive-debug", [], function(require, exports, module){
'use strict';

require("angular-seed-spm/0.0.1/src/components/directive/default/setNgAnimate-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiBreadcrumb-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiButterbar-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiFocus-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiModule-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiNav-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiScroll-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiShift-debug");
require("angular-seed-spm/0.0.1/src/components/directive/default/uiToggleClass-debug");

require("angular-seed-spm/0.0.1/src/components/directive/custom/gtscPrds-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/hotPrds-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/infoPrds-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/infoPrdsList-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjPrds-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/recmPrds-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/bankPrdsList-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/trustPrdsList-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/filterCondition-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/slideAdvs-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/donut-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/zgPrds-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/rangeSlider-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjNav-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjNote-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/accountTopbar-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/accountSidebar-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjBonus-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjComgroup-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjFeeStructure-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/checkRePassWord-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjProinfo-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjManinfo-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/gtscProinfo-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/loginPanel-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/messagePanel-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/shoppingPanel-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/ngBlur-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/zgcpProinfo-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/zgcpManinfo-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/zhcpAssetChart-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/zhcpAssetAllocation-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/paywayImg-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/zgcpFeeStructure-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/detailBuyPanel-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/prdGraphPanel-debug");
require("angular-seed-spm/0.0.1/src/components/directive/custom/favoriteLabel-debug");

require("angular-seed-spm/0.0.1/src/components/directive/kibh/safeLevel-debug");
require("angular-seed-spm/0.0.1/src/components/directive/kibh/anyChat-debug");

var directive = angular.module('ASS.directive', [
/********************default*********************/
    'ASS.directive.setNgAnimate',
    'ASS.directive.uiBreadcrumb',
    'ASS.directive.uiButterbar',
    'ASS.directive.uiFocus',
    'ASS.directive.uiModule',
    'ASS.directive.uiNav',
    'ASS.directive.uiScroll',
    'ASS.directive.uiShift',
    'ASS.directive.uiToggleClass',

/********************kfps*********************/
    'ASS.directive.gtscPrds',
    'ASS.directive.hotPrds',
    'ASS.directive.infoPrds',
    'ASS.directive.infoPrdsList',
    'ASS.directive.gmjjPrds',
    'ASS.directive.recmPrds',
    'ASS.directive.bankPrdsList',
    'ASS.directive.trustPrdsList',
    'ASS.directive.filterCondition',
    'ASS.directive.slideAdvs',
    'ASS.directive.donut',
    'ASS.directive.zgPrds',
    'ASS.directive.rangeSlider',
    'ASS.directive.gmjjNav',
    'ASS.directive.gmjjNote',
    'ASS.directive.rangeSlider',
    'ASS.directive.accountTopbar',
    'ASS.directive.accountSidebar',
    'ASS.directive.gmjjBonus',
    'ASS.directive.gmjjComgroup',
    'ASS.directive.gmjjFeeStructure',
    'ASS.directive.gmjjBonus',
    'ASS.directive.checkRePassWord',
    'ASS.directive.gmjjProinfo',
    'ASS.directive.gmjjManinfo',
    'ASS.directive.gtscProinfo',
    'ASS.directive.loginPanel',
    'ASS.directive.messagePanel',
    'ASS.directive.shoppingPanel',
    'ASS.directive.ngBlur',
    "ASS.directive.zgcpProinfo",
    "ASS.directive.zgcpManinfo",
    "ASS.directive.zhcpAssetChart",
    "ASS.directive.zhcpAssetAllocation",
    "ASS.directive.paywayImg",
    "ASS.directive.zgcpFeeStructure",
    "ASS.directive.detailBuyPanel",
    "ASS.directive.prdGraphPanel",
    "ASS.directive.favoriteLabel",

/********************kibh*********************/
    "ASS.directive.safeLevel",
    "ASS.directive.anyChat"
]);

module.exports = directive;
});
define("angular-seed-spm/0.0.1/src/components/directive/default/setNgAnimate-debug", [], function(require, exports, module){
'use strict';

var setNgAnimate = angular.module('ASS.directive.setNgAnimate', [])
    .directive('setNgAnimate', ['$animate', function ($animate) {
        return {
            link: function ($scope, $element, $attrs) {
                $scope.$watch(function () {
                        return $scope.$eval($attrs.setNgAnimate, $scope)
                    },
                    function (valnew, valold) {
                        $animate.enabled(!!valnew, $element)
                    })
            }
        }
    }]);

module.exports = setNgAnimate;

});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiBreadcrumb-debug", [], function(require, exports, module){
'use strict';
function isAOlderThanB(scopeA, scopeB) {
    if (angular.equals(scopeA.length, scopeB.length)) {
        return scopeA > scopeB;
    } else {
        return scopeA.length > scopeB.length;
    }
}

function parseStateRef(ref) {
    var parsed = ref.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
    if (!parsed || parsed.length !== 4) {
        throw new Error("Invalid state ref '" + ref + "'");
    }
    return { state: parsed[1], paramExpr: parsed[3] || null };
}

function $Breadcrumb() {

    var $$options = {
        prefixStateName: null,
        template: 'bootstrap3',
        templateUrl: null,
        includeAbstract: false
    };

    this.setOptions = function (options) {
        angular.extend($$options, options);
    };

    this.$get = ['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {

        var $lastViewScope = $rootScope;

        // Early catch of $viewContentLoaded event
        $rootScope.$on('$viewContentLoaded', function (event) {
            // With nested views, the event occur several times, in "wrong" order
            if (isAOlderThanB(event.targetScope.$id, $lastViewScope.$id)) {
                $lastViewScope = event.targetScope;
            }
        });

        // Get the parent state
        var $$parentState = function (state) {
            // Check if state has explicit parent OR we try guess parent from its name
            var name = state.parent || (/^(.+)\.[^.]+$/.exec(state.name) || [])[1];
            // If we were able to figure out parent name then get this state
            return name;
        };

        // Add the state in the chain if not already in and if not abstract
        var $$addStateInChain = function (chain, stateRef) {
            var conf,
                parentParams,
                ref = parseStateRef(stateRef);

            for (var i = 0, l = chain.length; i < l; i += 1) {
                if (chain[i].name === ref.state) {
                    return;
                }
            }

            conf = $state.get(ref.state);
            if ((!conf.abstract || $$options.includeAbstract) && !(conf.ncyBreadcrumb && conf.ncyBreadcrumb.skip)) {
                if (ref.paramExpr) {
                    parentParams = $lastViewScope.$eval(ref.paramExpr);
                }

                conf.ncyBreadcrumbLink = $state.href(ref.state, parentParams || $stateParams || {});
                chain.unshift(conf);
            }
        };

        // Get the state for the parent step in the breadcrumb
        var $$breadcrumbParentState = function (stateRef) {
            var ref = parseStateRef(stateRef),
                conf = $state.get(ref.state);

            if (conf.ncyBreadcrumb && conf.ncyBreadcrumb.parent) {
                // Handle the "parent" property of the breadcrumb, override the parent/child relation of the state
                var isFunction = typeof conf.ncyBreadcrumb.parent === 'function';
                var parentStateRef = isFunction ? conf.ncyBreadcrumb.parent($lastViewScope) : conf.ncyBreadcrumb.parent;
                if (parentStateRef) {
                    return parentStateRef;
                }
            }

            return $$parentState(conf);
        };

        return {

            getTemplate: function (templates) {
                if ($$options.templateUrl) {
                    // templateUrl takes precedence over template
                    return null;
                } else if (templates[$$options.template]) {
                    // Predefined templates (bootstrap, ...)
                    return templates[$$options.template];
                } else {
                    return $$options.template;
                }
            },

            getTemplateUrl: function () {
                return $$options.templateUrl;
            },

            getStatesChain: function (exitOnFirst) { // Deliberately undocumented param, see getLastStep
                var chain = [];

                // From current state to the root
                for (var stateRef = $state.$current.self.name; stateRef; stateRef = $$breadcrumbParentState(stateRef)) {
                    $$addStateInChain(chain, stateRef);
                    if (exitOnFirst && chain.length) {
                        return chain;
                    }
                }

                // Prefix state treatment
                if ($$options.prefixStateName) {
                    $$addStateInChain(chain, $$options.prefixStateName);
                }

                return chain;
            },

            getLastStep: function () {
                var chain = this.getStatesChain(true);
                return chain.length ? chain[0] : undefined;
            },

            $getLastViewScope: function () {
                return $lastViewScope;
            }
        };
    }];
}

var getExpression = function (interpolationFunction) {
    if (interpolationFunction.expressions) {
        return interpolationFunction.expressions;
    } else {
        var expressions = [];
        angular.forEach(interpolationFunction.parts, function (part) {
            if (angular.isFunction(part)) {
                expressions.push(part.exp);
            }
        });
        return expressions;
    }
};

var registerWatchers = function (labelWatcherArray, interpolationFunction, viewScope, step) {
    angular.forEach(getExpression(interpolationFunction), function (expression) {
        var watcher = viewScope.$watch(expression, function () {
            step.ncyBreadcrumbLabel = interpolationFunction(viewScope);
        });
        labelWatcherArray.push(watcher);
    });

};

var deregisterWatchers = function (labelWatcherArray) {
    angular.forEach(labelWatcherArray, function (deregisterWatch) {
        deregisterWatch();
    });
    labelWatcherArray = [];
};

function BreadcrumbDirective($interpolate, $breadcrumb, $rootScope) {
    var $$templates = {
        bootstrap2: '<ul class="breadcrumb">' +
            '<li ng-repeat="step in steps" ng-switch="$last || !!step.abstract" ng-class="{active: $last}">' +
            '<a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a> ' +
            '<span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span>' +
            '<span class="divider" ng-hide="$last">/</span>' +
            '</li>' +
            '</ul>',
        bootstrap3: '<ol class="breadcrumb bg-white b-a m-b-none">' +
            '<li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract">' +
            '<a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a>' +
            '<span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span>' +
            '</li>' +
            '</ol>'
    };

    return {
        restrict: 'AE',
        replace: true,
        scope: {},
        template: $breadcrumb.getTemplate($$templates),
        templateUrl: $breadcrumb.getTemplateUrl(),
        link: {
            post: function postLink(scope) {
                var labelWatchers = [];

                var renderBreadcrumb = function () {
                    deregisterWatchers(labelWatchers);
                    var viewScope = $breadcrumb.$getLastViewScope();
                    scope.steps = $breadcrumb.getStatesChain();
                    angular.forEach(scope.steps, function (step) {
                        if (step.ncyBreadcrumb && step.ncyBreadcrumb.label) {
                            var parseLabel = $interpolate(step.ncyBreadcrumb.label);
                            step.ncyBreadcrumbLabel = parseLabel(viewScope);
                            // Watcher for further viewScope updates
                            registerWatchers(labelWatchers, parseLabel, viewScope, step);
                        } else {
                            step.ncyBreadcrumbLabel = step.name;
                        }
                    });
                };

                $rootScope.$on('$viewContentLoaded', function () {
                    renderBreadcrumb();
                });

                // View(s) may be already loaded while the directive's linking
                renderBreadcrumb();
            }
        }
    };
}
BreadcrumbDirective.$inject = ['$interpolate', '$breadcrumb', '$rootScope'];

function BreadcrumbLastDirective($interpolate, $breadcrumb, $rootScope) {

    return {
        restrict: 'A',
        scope: {},
        template: '{{ncyBreadcrumbLabel}}',
        compile: function (cElement, cAttrs) {

            // Override the default template if ncyBreadcrumbLast has a value
            var template = cElement.attr(cAttrs.$attr.ncyBreadcrumbLast);
            if (template) {
                cElement.html(template);
            }

            return {
                post: function postLink(scope) {
                    var labelWatchers = [];

                    var renderLabel = function () {
                        deregisterWatchers(labelWatchers);
                        var viewScope = $breadcrumb.$getLastViewScope();
                        var lastStep = $breadcrumb.getLastStep();
                        if (lastStep) {
                            scope.ncyBreadcrumbLink = lastStep.ncyBreadcrumbLink;
                            if (lastStep.ncyBreadcrumb && lastStep.ncyBreadcrumb.label) {
                                var parseLabel = $interpolate(lastStep.ncyBreadcrumb.label);
                                scope.ncyBreadcrumbLabel = parseLabel(viewScope);
                                // Watcher for further viewScope updates
                                // Tricky last arg: the last step is the entire scope of the directive !
                                registerWatchers(labelWatchers, parseLabel, viewScope, scope);
                            } else {
                                scope.ncyBreadcrumbLabel = lastStep.name;
                            }
                        }
                    };

                    $rootScope.$on('$viewContentLoaded', function () {
                        renderLabel();
                    });

                    // View(s) may be already loaded while the directive's linking
                    renderLabel();
                }
            };

        }
    };
}
BreadcrumbLastDirective.$inject = ['$interpolate', '$breadcrumb', '$rootScope'];

module.exports = angular.module('ASS.directive.uiBreadcrumb', ['ui.router.state'])
    .provider('$breadcrumb', $Breadcrumb)
    .directive('ncyBreadcrumb', BreadcrumbDirective)
    .directive('ncyBreadcrumbLast', BreadcrumbLastDirective);
});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiButterbar-debug", [], function(require, exports, module){
'use strict';

var uiButterbar = angular.module('ASS.directive.uiButterbar', [])
    .directive('uiButterbar', ['$rootScope', '$anchorScroll', function ($rootScope, $anchorScroll) {
        return {
            restrict: 'AC',
            template: '<span class="bar"></span>',
            link: function (scope, el, attrs) {
                el.addClass('butterbar hide');
                scope.$on('$stateChangeStart',
                    function (event) {
                        $anchorScroll();
                        el.removeClass('hide').addClass('active')
                    });
                scope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState) {
                        event.targetScope.$watch('$viewContentLoaded',
                            function () {
                                el.addClass('hide').removeClass('active')
                            })
                    })
            }
        }
    }]);

module.exports = uiButterbar;

});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiFocus-debug", [], function(require, exports, module){
'use strict';

var uiFocus = angular.module('ASS.directive.uiFocus', [])
    .directive('uiFocus', ['$timeout', '$parse', function ($timeout, $parse) {
        return {
            link: function (scope, element, attr) {
                var model = $parse(attr.uiFocus);
                scope.$watch(model,
                    function (value) {
                        if (value === true) {
                            $timeout(function () {
                                element[0].focus()
                            })
                        }
                    })
            }
        }
    }]);

module.exports = uiFocus;

});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiModule-debug", [], function(require, exports, module){
'use strict';

var uiModule = angular.module('ASS.directive.uiModule', [])
    .directive('uiModule', ['MODULE_CONFIG', 'uiLoad', '$compile', function (MODULE_CONFIG, uiLoad, $compile) {
        return {
            restrict: 'A',
            compile: function (el, attrs) {
                var contents = el.contents().clone();
                return function (scope, el, attrs) {
                    el.contents().remove();
                    uiLoad.load(MODULE_CONFIG[attrs.uiModule]).then(function () {
                        $compile(contents)(scope,
                            function (clonedElement, scope) {
                                el.append(clonedElement)
                            })
                    })
                }
            }
        }
    }]);

module.exports = uiModule;

});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiNav-debug", [], function(require, exports, module){
'use strict';

var uiNav = angular.module('ASS.directive.uiNav', [])
    .directive('uiNav', ['$timeout', function ($timeout) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                var _window = $(window),
                    _mb = 768,
                    wrap = $('.app-aside'),
                    next,
                    backdrop = '.dropdown-backdrop';
                el.on('click', 'a',
                    function (e) {
                        next && next.trigger('mouseleave.nav');
                        var _this = $(this);
                        _this.parent().siblings(".active").toggleClass('active');
                        _this.next().is('ul') && _this.parent().toggleClass('active') && e.preventDefault();
                        _this.next().is('ul') || ((_window.width() < _mb) && $('.app-aside').removeClass('show off-screen'))
                    });
                el.on('mouseenter', 'a',
                    function (e) {
                        next && next.trigger('mouseleave.nav');
                        $('> .nav', wrap).remove();
                        if (!$('.app-aside-fixed.app-aside-folded').length || (_window.width() < _mb) || $('.app-aside-dock').length) return;
                        var _this = $(e.target),
                            top,
                            w_h = $(window).height(),
                            offset = 50,
                            min = 150;
                        !_this.is('a') && (_this = _this.closest('a'));
                        if (_this.next().is('ul')) {
                            next = _this.next()
                        } else {
                            return
                        }
                        _this.parent().addClass('active');
                        top = _this.parent().position().top + offset;
                        next.css('top', top);
                        if (top + next.height() > w_h) {
                            next.css('bottom', 0)
                        }
                        if (top + min > w_h) {
                            next.css('bottom', w_h - top - offset).css('top', 'auto')
                        }
                        next.appendTo(wrap);
                        next.on('mouseleave.nav',
                            function (e) {
                                $(backdrop).remove();
                                next.appendTo(_this.parent());
                                next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
                                _this.parent().removeClass('active')
                            });
                        $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click',
                            function (next) {
                                next && next.trigger('mouseleave.nav')
                            })
                    });
                wrap.on('mouseleave',
                    function (e) {
                        next && next.trigger('mouseleave.nav');
                        $('> .nav', wrap).remove()
                    })
            }
        }
    }]);

module.exports = uiNav;

});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiScroll-debug", [], function(require, exports, module){
'use strict';

var uiScroll = angular.module('ASS.directive.uiScroll', [])
    .directive('uiScroll', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click',
                    function (e) {
                        $location.hash(attr.uiScroll);
                        $anchorScroll()
                    })
            }
        }
    }]);

module.exports = uiScroll;

});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiShift-debug", [], function(require, exports, module){
'use strict';

var uiShift = angular.module('ASS.directive.uiShift', [])
    .directive('uiShift', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, el, attr) {
                var _el = $(el),
                    _window = $(window),
                    prev = _el.prev(),
                    parent,
                    width = _window.width();
                !prev.length && (parent = _el.parent());
                function sm() {
                    $timeout(function () {
                        var method = attr.uiShift;
                        var target = attr.target;
                        _el.hasClass('in') || _el[method](target).addClass('in')
                    })
                }

                function md() {
                    parent && parent['prepend'](el);
                    !parent && _el['insertAfter'](prev);
                    _el.removeClass('in')
                }

                (width < 768 && sm()) || md();
                _window.resize(function () {
                    if (width !== _window.width()) {
                        $timeout(function () {
                            (_window.width() < 768 && sm()) || md();
                            width = _window.width()
                        })
                    }
                })
            }
        }
    }]);

module.exports = uiShift;

});
define("angular-seed-spm/0.0.1/src/components/directive/default/uiToggleClass-debug", [], function(require, exports, module){
'use strict';

var uiToggleClass = angular.module('ASS.directive.uiToggleClass', [])
    .directive('uiToggleClass', ['$timeout', '$document', function ($timeout, $document) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click',
                    function (e) {
                        e.preventDefault();
                        var classes = attr.uiToggleClass.split(','),
                            targets = (attr.target && attr.target.split(',')) || Array(el),
                            key = 0;
                        angular.forEach(classes,
                            function (_class) {
                                var target = targets[(targets.length && key)];
                                (_class.indexOf('*') !== -1) && magic(_class, target);
                                $(target).toggleClass(_class);
                                key++
                            });
                        $(el).toggleClass('active');
                        function magic(_class, target) {
                            var patt = new RegExp('\\s' + _class.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
                            var cn = ' ' + $(target)[0].className + ' ';
                            while (patt.test(cn)) {
                                cn = cn.replace(patt, ' ')
                            }
                            $(target)[0].className = $.trim(cn)
                        }
                    })
            }
        }
    }]);

module.exports = uiToggleClass;

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gtscPrds-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gtscPrds', [])
    .directive('gtscPrds', ['exclusiveService', 'prdCommonService', function (exclusiveService, prdCommonService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gtscPrds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                exclusiveService.getPrds({
                    pref_type: "3",
                    lvl2_type: "486",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.fastSoldPrds = data[0]; // 销售最快，暂定简单取前八条数据
                        $scope.prds = data[0].slice(0, 3); // 图形展示，前3条数据
                    }
                });
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/hotPrds-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.hotPrds', [])
    .directive('hotPrds', ['$rootScope', '$state', '$interval', '$window', 'exclusiveService', 'accountService', 'myAlert', 'myConfirm', 'prdCommonService',
        function ($rootScope, $state, $interval, $window, exclusiveService, accountService, myAlert, myConfirm, prdCommonService) {
            return {
                restrict: "EAC",
                replace: true,
                scope: {},
                templateUrl: 'apps/src/blocks/directivetpl/kfps/hotprds.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];

                    $scope.morePrds = 'xpzq';
                    $scope.toggleUrlOfMore = function (whichUrl) {
                        $scope.morePrds = whichUrl;
                        $scope.prds = 'jxcp' == whichUrl ? $scope.jxPrds : $scope.xpPrds;
                    };

                    exclusiveService.getPrds({
                        pref_type: "1",
                        cur_page: 1,
                        ret_rows: 4,
                        order_by: "ORDER_BY"
                    }).then(function (data) {
                        $scope.jxPrds = data[0];
                        for (var i = 0; i < $scope.jxPrds.length; i++) {
                            $scope.jxPrds[i].canBuy = prdCommonService.checkIfCanBuy($scope.jxPrds[i]);
                            $scope.jxPrds[i].isFavorite = prdCommonService.isMyFavorite($scope.jxPrds[i]);
                        }
                    });

                    exclusiveService.getPrds({
                        pref_type: "4",
                        cur_page: 1,
                        ret_rows: 4,
                        order_by: "ORDER_BY"
                    }).then(function (data) {
                        $scope.xpPrds = data[0];
                        for (var i = 0; i < $scope.xpPrds.length; i++) {
                            $scope.xpPrds[i].canBuy = prdCommonService.checkIfCanBuy($scope.xpPrds[i]);
                            $scope.xpPrds[i].isFavorite = prdCommonService.isMyFavorite($scope.xpPrds[i]);
                        }

                        $scope.prds = $scope.xpPrds;
                    });

                }
            }
        }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/infoPrds-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.infoPrds', [])
    .directive('infoPrds', ['$rootScope', '$state', '$window', 'exclusiveService', 'accountService', 'myAlert', 'myConfirm', 'prdCommonService',
        function ($rootScope, $state, $window, exclusiveService, accountService, myAlert, myConfirm, prdCommonService) {
            return {
                restrict: 'EAC',
                replace: true,
                scope: {},
                templateUrl: 'apps/src/blocks/directivetpl/kfps/infoprds.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    exclusiveService.getPrds({
                        pref_type: '5',
                        cur_page: 1,
                        ret_rows: 12
                    }).then(function (data) {
                        if (data && data[0]) {
                            for (var i = 0; i < data[0].length; i++) {
                                data[0][i].isFavorite = prdCommonService.isMyFavorite(data[0][i]);
                            }
                            $scope.prds = [data[0].slice(0, 4), data[0].slice(4, 8), data[0].slice(8, 13)];
                        }
                    });

                    $scope.addToMyFavorite = function (products, index) {
                        if ($window.sessionStorage.sessionid) {
                            accountService.addMyFavorite({
                                pro_id: products[index].PRO_ID,
                                lvl2_type: products[index].LVL2_TYPE
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    products[index].isFavorite = true;
                                    prdCommonService.addToSessionFavorites(products[index]);
                                }
                            });
                        } else {
                            myConfirm('现在登录吗？', function () {
                                $rootScope.beforeLoginUrl = $state.current.name;
                                $state.go('auth.login');
                            }, '', '您需要登录后才能收藏产品', '登录');
                        }
                    };

                    $scope.deleteMyFavorites = function (products, index) {
                        myConfirm('确定取消收藏该产品吗？', function () {
                            accountService.deleteMyFavorites({
                                pro_id: products[index].PRO_ID
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    products[index].isFavorite = false;
                                    prdCommonService.removeFromSessionFavorites(products[index]);
                                }
                            });
                        });
                    };

                }
            }
        }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/infoPrdsList-debug", [], function(require, exports, module){
'use strict';


module.exports = angular.module('ASS.directive.infoPrdsList', [])
    .directive('infoPrdsList', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/infoprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: 50,
                    currentpage: 1
                };
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjPrds-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjPrds', [])
    .directive('gmjjPrds', ['exclusiveService', 'prdCommonService', function (exclusiveService, prdCommonService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjPrds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                $scope.prdsGroup = [];

                // 公募基金下小类: 股票型、混合型、债券型、货币型、指数型、保本型、QDII型

                // 股票型
                exclusiveService.getPrds({
                    pref_type: "3",
                    lvl2_type: "6",
                    pro_type: "399",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[0] = {
                            label: "股票型",
                            fastSold: data[0], // 销售最快，暂定简单取前八条数据
                            prd: data[0].slice(0, 3) // 图形展示，前3条数据
                        };
                    }
                });

                // 混合型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "400",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[1] = {
                            label: "混合型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 债券型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "401",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[2] = {
                            label: "债券型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 货币型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "403",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[3] = {
                            label: "货币型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 指数型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "404",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[4] = {
                            label: "指数型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // 保本型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "405",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[5] = {
                            label: "保本型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

                // QDII型
                exclusiveService.getPrds({
                    pref_type: 3,
                    lvl2_type: 6,
                    pro_type: "406",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.prdsGroup[6] = {
                            label: "QDII型",
                            fastSold: data[0],
                            prd: data[0].slice(0, 3)
                        };
                    }
                });

            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/recmPrds-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.recmPrds', [])
    .directive('recmPrds', ['$rootScope', '$state', '$window', 'prdlistService', 'accountService', 'myAlert', 'myConfirm', 'prdCommonService',
        function ($rootScope, $state, $window, prdlistService, accountService, myAlert, myConfirm, prdCommonService) {
            return {
                restrict: "EAC",
                replace: true,
                scope: {},
                templateUrl: 'apps/src/blocks/directivetpl/kfps/recmprds.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    $scope.cols = 4;
                    if ($state.current.name.indexOf('page.account') != -1) {
                        $scope.cols = 3;
                    }

                    $scope.n = 1;
                    var totalcount = 0;

                    $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                    $scope.refresh = function () {
                        if (totalcount > 0 && $scope.n < Math.ceil(totalcount / $scope.cols)) {
                            $scope.n++;
                        } else {
                            $scope.n = 1;
                        }
                    };

                    $scope.$watch("n", function () {
                        prdlistService["getrecmPrds"]({
                            cur_page: $scope.n,
                            ret_rows: $scope.cols
                        }).then(function (data) {
                            $scope.prds = data[0];
                            for (var i = 0; i < $scope.prds.length; i++) {
                                $scope.prds[i].canBuy = prdCommonService.checkIfCanBuy($scope.prds[i]);
                                $scope.prds[i].isFavorite = prdCommonService.isMyFavorite($scope.prds[i]);
                            }
                            totalcount = data[1];
                        });
                        if (totalcount < $scope.cols) {
                            $scope.n = 1;
                        }
                    });

                    $scope.addToMyFavorite = function (products, index) {
                        if ($window.sessionStorage.sessionid) {
                            accountService.addMyFavorite({
                                pro_id: products[index].PRO_ID,
                                lvl2_type: products[index].LVL2_TYPE
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    products[index].isFavorite = true;
                                    prdCommonService.addToSessionFavorites(products[index]);
                                }
                            });
                        } else {
                            myConfirm('现在登录吗？', function () {
                                $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink;
                                $state.go('auth.login');
                            }, '', '您需要登录后才能收藏产品', '登录');
                        }
                    };

                    $scope.deleteMyFavorites = function (products, index) {
                        myConfirm('确定取消收藏该产品吗？', function () {
                            accountService.deleteMyFavorites({
                                pro_id: products[index].PRO_ID
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    products[index].isFavorite = false;
                                    prdCommonService.removeFromSessionFavorites(products[index]);
                                }
                            });
                        });
                    };

                }
            }
        }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/bankPrdsList-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.bankPrdsList', [])
    .directive('bankPrdsList', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/bankprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: 50,
                    currentpage: 1
                };
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/trustPrdsList-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.trustPrdsList', [])
    .directive('trustPrdsList', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/trustprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: 50,
                    currentpage: 1
                };
                $scope.tuijlist =
                    [
                        {
                            img: 'public/images/mall-prd-info-pic2.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1910"
                        },
                        {
                            img: 'public/images/mall-prd-info-pic2.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1900"
                        },
                        {
                            img: 'public/images/mall-prd-info-pic3.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1900"
                        },
                        {
                            img: 'public/images/mall-prd-info-pic1.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1900"
                        }
                    ];
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/filterCondition-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.filterCondition', [])
    .directive('filterCondition', [ '$http', 'prdlistService', function ($http, prdlistService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {
                condition: "="
            },
            templateUrl: 'apps/src/blocks/directivetpl/kfps/filtercondition.html',
            link: function ($scope, $element, attrs, model) {
                $http.get("./data/condition.json").then(function (result) {
                    $scope.firstchoice = {};
                    $scope.conditions = result.data[attrs.ctype];
                    angular.forEach($scope.conditions, function (i) {
                        if (i.key == 'regi_org') {
                            prdlistService.getjjgsPrds().then(function (data) {
                                i.list = [];
                                i.list.push({"key": "", "value": "全部"});
                                angular.forEach(data[0], function (j) {
                                    i.list.push({"key": j.EXT_TA_CODE, "value": j.INST_ORG_SNAME});
                                });

                                $scope.condition[i.key] = i.list[0].key;
                                $scope.firstchoice[i.key] = i.list[0].key;
                            });
                        } else {
                            $scope.condition[i.key] = i.list[0].key;
                            $scope.firstchoice[i.key] = i.list[0].key;
                        }

                        if ($scope.firstchoice[i.key]) {
                            $scope.selt(i.key, i.list[0]);
                        }
                    })
                });

                $scope.selected = {};
                $scope.count = function () {
                    var t = typeof $scope.selected;
                    if (t == 'string') {
                        return $scope.selected.length;
                    } else if (t == 'object') {
                        var n = 0;
                        for (var i in $scope.selected) {
                            n++;
                        }
                        return n;
                    }
                    return 0;
                }

                $scope.selt = function (key, i) {
                    $scope.condition[key] = i.key;
                    if (i.key != "") {
                        i.ty = key;
                        $scope.selected[key] = i;
                    } else {
                        delete $scope.selected[key];
                    }
                }

                $scope.clear = function (i) {
                    if (i) {
                        $scope.condition[i] = $scope.firstchoice[i];
                        if ($scope.condition[i] == "") {
                            delete $scope.selected[i];
                        } else {
                            angular.forEach($scope.conditions, function (element) {
                                if (element.key == i && $scope.selected[i].key != element.list[0].key) {
                                    $scope.selt(i, element.list[0]);
                                }
                            });
                        }
                    } else {
                        $scope.selected = {};
                        angular.forEach($scope.conditions, function (i) {
                            $scope.condition[i.key] = i.list[0].key;
                        })
                    }
                };
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/slideAdvs-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.slideAdvs', [])
    .directive('slideAdvs', ['adnotService', function (adnotService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/slideadvs.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                adnotService.getAdOrNote({
                    type: "1",
                    type_val: attrs.typeVal,
                    stat: "1",
                    cur_page: 1,
                    ret_rows: 6,
                    order_by: "ORDER_BY asc"
                }).then(function (data) {
                    $scope.slides = [];
                    for (var i = 0; i < data[0].length; i++) {
                        $scope.slides[i] = {
                            IMG: data[0][i].ATTR1_INFO ? data[0][i].ATTR1_INFO.split("|")[0] : "",
                            LINK: data[0][i].LINK
                        };
                    }
                });
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/donut-debug", [], function(require, exports, module){
'use strict';

/*
 * 使用方法：
 * id：节点id
 * width：宽度
 * height：高度
 *<div donut id="donut" width="350px" height="240px"></div>
 */
var donut = angular.module('ASS.directive.donut', [])
    .directive('donut', function () {
        return {
            restrict: 'EA',
            link: function ($scope, $attrs) {
                var element = {
                    id: $attrs.attr("id") || "donut",
                    width: $attrs.attr("width") || "100%",
                    height: $attrs.attr("height") || "100%"
                };
                drawDonut(element, $scope.assetAllocation.donut());
            }
        };
    });


//highcharts 环形图
var highChartsDonut = function (element, data) {
    return new Highcharts.Chart({
        chart: {
            renderTo: element.id,
            width: element.width.indexOf("px") > 0 ? element.width.slice(0, element.width.indexOf("px")) : null,
            height: element.height.indexOf("px") > 0 ? element.height.slice(0, element.height.indexOf("px")) : null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },

        title: {
            text: ""
        },

        credits: {
            enabled: false
        },

        tooltip: {
            hideDelay: 0,
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>'
                },
                showInLegend: true
            }
        },

        series: [
            {
                type: 'pie',
                name: '比例',
                data: data,
                innerSize: '35%'
            }
        ]
    });
};

// 绘制图
var drawDonut = function (element, data) {
    data = data ? data : [];
    return highChartsDonut(element, data);
};


module.exports = donut;
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/zgPrds-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.zgPrds', [])
    .directive('zgPrds', ['exclusiveService', 'prdCommonService', function (exclusiveService, prdCommonService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zgprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                exclusiveService.getPrds({
                    pref_type: "3",
                    lvl2_type: "4",
                    cur_page: 1,
                    ret_rows: 8
                }).then(function (data) {
                    if (data && data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            data[0][i].canBuy = prdCommonService.checkIfCanBuy(data[0][i]);
                        }
                        $scope.fastSoldPrds = data[0]; // 销售最快，暂定简单取前八条数据
                        $scope.prds = data[0].slice(0, 3); // 图形展示，前3条数据
                    }
                });
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/rangeSlider-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.rangeSlider', [])
    .directive('rangeSlider', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            template: '<div id="slider"></div>',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
                var now = new Date();
                $("#slider").dateRangeSlider({
                    step: {
                        days: 1
                    },
                    bounds: {
                        min: (function () {
                            var before = angular.copy(now);
                            before.setFullYear(now.getFullYear() - 1);
                            return before;
                        })(),
                        max: now
                    },
                    defaultValues: {
                        min: (function () {
                            var before = angular.copy(now);
                            before.setMonth(now.getMonth() - 1);
                            return before;
                        })(),
                        max: now
                    },
                    scales: [
                        {
                            first: function (value) {
                                return value;
                            },
                            end: function (value) {
                                return value;
                            },
                            next: function (value) {
                                var next = new Date(value);
                                return new Date(next.setMonth(value.getMonth() + 1));
                            },
                            label: function (value) {
                                return months[value.getMonth()];
                            },
                            format: function (tickContainer, tickStart, tickEnd) {
                                tickContainer.addClass("myCustomClass");
                            }
                        }
                    ]
                });
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjNav-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjNav', [])
    .directive('gmjjNav', ['$state', '$window', 'detailService', 'prdlistService', 'myAlert', function ($state, $window, detailService, prdlistService, myAlert) {
        return {
            restrict: "EAC",
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjNav.html',
            scope: true,
            link: function ($scope, $element, attrs, model) {
                $scope.showType = 1;

                $scope.quryObject = {
                    pro_id: attrs.proid,
                    startDate: (function () {
                        var temp = angular.copy(new Date());
                        temp.setMonth(temp.getMonth() - 6);
                        return temp;
                    })(),
                    endDate: new Date(),
                    trd_date: "",
                    cur_page: "",
                    ret_rows: ""
                };
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.openStartDate = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.startDateOpened = !$scope.startDateOpened;
                    $scope.endDateOpened = false;
                };
                $scope.openEndDate = function ($event) {
                    $event.preventDefault();
                    $event.stopPropagation();
                    $scope.endDateOpened = !$scope.endDateOpened;
                    $scope.startDateOpened = false;
                };

                // 查询历史净值下拉框选项
                var searchGmjj = function () {
                    if (attrs.partype == 'gmjj') {
                        prdlistService.getgmjjPrds({cur_page: -1}).then(function (data) {
                            $scope.gmjjListoption = data[0];
                        });
                    } else if (attrs.partype == 'zgcp') {
                        prdlistService.getzgcpPrds({cur_page: -1}).then(function (data) {
                            $scope.gmjjListoption = data[0];
                        });
                    }
                };
                searchGmjj();


                var preProId = $scope.quryObject.pro_id;
                $scope.searchFirst = function () {
                    if (!$scope.quryObject.startDate) {
                        myAlert("起始日期不能为空！");
                        return;
                    }
                    if (!$scope.quryObject.endDate) {
                        myAlert("结束日期不能为空！");
                        return;
                    }
                    if ($scope.quryObject.startDate.format("yyyyMMdd") > $scope.quryObject.endDate.format("yyyyMMdd")) {
                        $scope.quryObject.startDate = params.endDate;
                        myAlert("起始日期不能大于结束日期！");
                        return;
                    }

                    // 包含结束日期，因为接口不会包含，所以这里把结束日期改为下一天
                    var trd_date = "";
                    if ($scope.quryObject.startDate || $scope.quryObject.endDate) {
                        var endDate = (function () {
                            var temp = $scope.quryObject.endDate;
                            temp.setDate(temp.getDate() + 1);
                            return temp;
                        })();
                        trd_date = $scope.quryObject.startDate.format("yyyyMMdd") + "," + endDate.format("yyyyMMdd");
                    }
                    $scope.quryObject.trd_date = trd_date;

                    if (preProId && preProId != $scope.quryObject.pro_id) {
                        $window.sessionStorage.toNavTab = 'yes';
                        $state.go("kfps.detail", {"id": $scope.quryObject.pro_id, type: attrs.partype});
                        return;
                    }

                    search();
                };

                var search = function () {
                    detailService.getPrdPriceValue({
                        pro_id: $scope.quryObject.pro_id,
                        trd_date: $scope.quryObject.trd_date,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize,
                        order_by: ""
                    }).then(function (data) {
                        $scope.gmjjNav = data[0];
                        $scope.pagination.totalcount = data[1];
                    });
                };

                $scope.drawChart = function () {
                    var p = angular.copy($scope.quryObject);
                    p['cur_page'] = -1;
                    detailService.getPrdPriceValue(p).then(function (data) {
                        if (data[0]) {
                            var categories = [], nav = [], acc = [];
                            for (var i = data[0].length - 1; i >= 0; i--) {
                                categories.push(data[0][i].TRD_DATE);
                                nav.push(parseFloat(data[0][i].NAV_VAL));
                                acc.push(parseFloat(data[0][i].ACC_VAL));
                            }

                            var len = categories.length;
                            var positions = [],
                                increment = Math.floor((len - 1) / (len > 5 ? 4 : len - 1));
                            if (!isNaN(increment) && increment > 0) {
                                for (var tick = 0; tick <= len - 1; tick += increment) {
                                    positions.push(tick);
                                    if (positions.length == 4) {
                                        break;
                                    }
                                }
                            }
                            if (positions.length < 5) {
                                positions.push(len - 1);
                            }

                            var lines = [];
                            for (var i = 0; i < positions.length; i++) {
                                lines.push({
                                    color: '#D8D8D8',
                                    dashStyle: 'longdashdot',
                                    value: positions[i],
                                    width: 1
                                });
                            }

                            $('#container').highcharts({
                                credits: false,
                                title: null,
                                xAxis: {
                                    categories: categories,
                                    tickLength: 0,
                                    tickPositions: positions,
                                    plotLines: lines
                                },
                                yAxis: {
                                    title: {
                                        text: '净值 (元)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '元',
                                    shared: true,
                                    crosshairs: {
                                        color: 'green',
                                        width: 1
                                    }
                                },
                                legend: {
                                    verticalAlign: 'top'
                                },
                                series: [{
                                    name: '单位净值',
                                    data: nav
                                }, {
                                    name: '累计净值',
                                    data: acc
                                }]
                            });
                        }
                    });
                };
                $scope.drawChart();

                $scope.$watch("pagination.currentpage", function () {
                    if ($scope.pagination.currentpage <= 0) return;
                    search();
                });
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjNote-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjNote', [])
    .directive('gmjjNote', ['$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjNote.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {

                var search = function () {
                    detailService.getPrdNoteFile({
                        pro_id: attrs.proid,
                        par_type_id: attrs.partype,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize,
                        order_by: "not_type desc"
                    }).then(function (data) {
                        var newobj = function () {
                            var mubobj1 = {
                                NOT_TYPE_DESC: "",
                                NOT_TYPE: "",
                                list: []
                            };
                            return mubobj1;
                        };
                        var endobj = [];
                        var mubobj = newobj();
                        var note_type = "";

                        if (angular.isArray(data[0])) {
                            note_type = data[0][0].NOT_TYPE;
                            mubobj.NOT_TYPE = note_type;
                            mubobj.NOT_TYPE_DESC = data[0][0].NOT_TYPE_DESC;
                        }
                        angular.forEach(data[0], function (item) {
                            var temnotetyp = item.NOT_TYPE;
                            if (temnotetyp == note_type) {
                                mubobj.list.push(item);
                            } else {
                                endobj.push(mubobj);
                                note_type = item.NOT_TYPE;
                                mubobj = newobj();
                                mubobj.NOT_TYPE = note_type;
                                mubobj.NOT_TYPE_DESC = item.NOT_TYPE_DESC;
                                mubobj.list.push(item);
                            }
                        });
                        if (mubobj.NOT_TYPE != '') {
                            endobj.push(mubobj);
                        }
                        $scope.gmjjNote = endobj;
                        $scope.gmjjNoteys = data[0];
                        $scope.pagination.totalcount = data[1];
                    });
                };

                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.$watch("pagination.currentpage", function () {
                    if ($scope.pagination.currentpage == 0) return;
                    search();
                });

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/accountTopbar-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.accountTopbar', [])
    .directive('accountTopbar', [function () {
        return {
            restrict: "A",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/accountTopbar.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
            }
        };
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/accountSidebar-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.accountSidebar', [])
    .directive('accountSidebar', ['$state', function ($state) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/accountSidebar.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.sideLinks = [
                    {
                        name: '个人资料',
                        url: 'page.account.info',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png)"
                        }
                    },
                    {
                        name: '我的账户',
                        url: 'page.account.myaccount',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 44px"
                        }
                    },
                    {
                        name: '我的产品',
                        url: 'page.account.products',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 88px"
                        }
                    },
                    /*{  name: '我的银行',
                        url: 'page.account.mybank',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 66px"
                        }
                    },*/
                    {  name: '银证转账',
                        url: 'page.account.transfer',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 22px"
                        }
                    },
                    {
                        name: '我的订单',
                        url: 'page.account.orders',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 176px"
                        }
                    },
                    {
                        name: '我的收藏',
                        url: 'page.account.favorites',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 154px"
                        }
                    },
                    {
                        name: '我的消息',
                        url: 'page.account.messages',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 132px"
                        }
                    },
                    {
                        name: '安全设置',
                        url: 'page.account.security.start',
                        iconUrl: {
                            width: "22px",
                            height: "22px",
                            background: "url(public/images/myaccount-icons2.png) 0 110px"
                        }
                    }
                ];
                $scope.$state = $state;

                $scope.isActive = function (url) {
                    var classValue = "";
                    if (url == $state.current.name ||
                        (url == 'page.account.security.start' && $state.current.name.indexOf('page.account.security.') != -1) ||
                        (url == 'page.account.messages' && $state.current.name.indexOf('page.account.message') != -1) ||
                        (url == 'page.account.products' && $state.current.name.indexOf('page.account.product') != -1) ||
                        (url == 'page.account.info' && $state.current.name.indexOf('page.account.info') != -1)) {
                        classValue = "active";
                    }
                    return classValue;
                };

                $scope.checkIfRefresh = function (url) {
                    if (url == $state.current.name) {
                        $state.reload();
                    }
                };
            }
        };
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjBonus-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjBonus', [])
    .directive('gmjjBonus', ['$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjBonus.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                $scope.pagination1 = {
                    pagesize: 12,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.pagination2 = {
                    pagesize: 12,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.$watch("pagination1.currentpage", function () {
                    if ($scope.pagination1.currentpage <= 0) return;
                    search1();
                });

                $scope.$watch("pagination2.currentpage", function () {
                    if ($scope.pagination2.currentpage <= 0) return;
                    search2();
                });

                // 分红
                var search1 = function () {
                    detailService.getPrdBonus({
                        pro_id: attrs.proid,
                        qry_type: "0",
                        cur_page: $scope.pagination1.currentpage,
                        ret_rows: $scope.pagination1.pagesize
                    }).then(function (data) {
                        $scope.gmjjDiv = data[0];
                        $scope.pagination1.totalcount = data[1];
                    });
                };

                // 拆分
                var search2 = function () {
                    detailService.getPrdBonus({
                        pro_id: attrs.proid,
                        qry_type: "1",
                        cur_page: $scope.pagination2.currentpage,
                        ret_rows: $scope.pagination2.pagesize
                    }).then(function (data) {
                        $scope.gmjjBonus = data[0];
                        $scope.pagination2.totalcount = data[1];
                    });
                };

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjComgroup-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjComgroup', [])
    .directive('gmjjComgroup', ['$http', 'detailService', function ($http, detailService) {
        return {
            restrict: 'EAC',
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjComgroup.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {

                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                //var COMB_CLASS_DESC = {
                //    1: '报告期末基金资产组合情况',
                //    2: '报告期末按行业分类的股票投资组合',
                //    3: '报告期末按公允价值占基金资产净值比例大小排序的前10名股票投资明细'
                //};

                var search = function () {
                    detailService.getAssetAllocation({
                        pro_id: attrs.proid,
                        cur_page: '-1',
                        ret_rows: '',
                        order_by: ''
                    }).then(function (data) {
                        if (data && data[0]) {
                            $scope.assetAllocation = {
                                '1': {
                                    total: {
                                        comb_type: '100',
                                        val: {}
                                    },
                                    list: []
                                },
                                '2': {
                                    total: {
                                        comb_type: '1',
                                        val: {}
                                    },
                                    list: []
                                },
                                '3': {
                                    list: []
                                }
                            };
                            for (var i = 0; i < data[0].length; i++) {
                                if (data[0][i].COMB_CLASS) {
                                    if (!$scope.assetAllocation[data[0][i].COMB_CLASS]) $scope.assetAllocation[data[0][i].COMB_CLASS] = [];

                                    if ($scope.assetAllocation[data[0][i].COMB_CLASS].total
                                        && (data[0][i].COMB_TYPE == $scope.assetAllocation[data[0][i].COMB_CLASS].total.comb_type || '合计' == data[0][i].COMB_TYPE_DESC)) {
                                        $scope.assetAllocation[data[0][i].COMB_CLASS].total.val = data[0][i];
                                    } else {
                                        $scope.assetAllocation[data[0][i].COMB_CLASS].list.push(data[0][i]);
                                    }
                                }
                            }
                        }

                    });
                };

                search();
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjFeeStructure-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjFeeStructure', [])
    .directive('gmjjFeeStructure', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjFeeStructure.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                $scope.fees = {};
                detailService.getRateStructure({
                    pro_id: attrs.proid,
                    fee_type: "",
                    fee_mode: "",
                    ext_con: "",
                    cur_page: -1,
                    ret_rows: "",
                    order_by: "FEE_TYPE"
                }).then(function (data) {
                    if (data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            if (!$scope.fees[data[0][i].FEE_TYPE]) $scope.fees[data[0][i].FEE_TYPE] = [];
                            $scope.fees[data[0][i].FEE_TYPE].push(data[0][i]);
                        }
                    }
                });

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/checkRePassWord-debug", [], function(require, exports, module){
'use strict';
module.exports = angular.module('ASS.directive.checkRePassWord', [])
    .directive('checkRePassWord', [ function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.checkRePassWord;

                elem.on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjProinfo-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjProinfo', [])
    .directive('gmjjProinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjProinfo.html',
            // scope:{}, 使用父控制器scope
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gmjjManinfo-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gmjjManinfo', [])
    .directive('gmjjManinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjManinfo.html',
            // scope:{}, 使用父控制器scope
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/gtscProinfo-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.gtscProinfo', [])
    .directive('gtscProinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gtscProinfo.html',
            // scope:{}, 使用父控制器scope
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/loginPanel-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.loginPanel', [])
    .directive('loginPanel', ['$rootScope', '$window', 'accountService', function ($rootScope, $window, accountService) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/loginPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if ('1' == $window.sessionStorage.isLogin) {
                    $rootScope.global.isLogin = true;
                    accountService.getLoginUserInfo().then(function (data) {
                        if (data && data[0] && data[0][0]) {
                            $rootScope.global.account = data[0][0];
                        }
                    });
                } else {
                    $rootScope.global.isLogin = false;
                }
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/messagePanel-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.messagePanel', [])
    .directive('messagePanel', ['$rootScope', '$window', function ($rootScope, $window) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/messagePanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if ($window.sessionStorage.sessionid) {
                    $rootScope.getNoReadMessages();
                }
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/shoppingPanel-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.shoppingPanel', [])
    .directive('shoppingPanel', ['$rootScope', '$window', 'scartService', function ($rootScope, $window, scartService) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/shoppingPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if ($window.sessionStorage.sessionid) {
                    scartService.getScart().then(function (data) {
                        if ($window.sessionStorage.shoppinglist) {
                            if (data[0] && data[0].length > 0) {
                                var shoppinglist = JSON.parse($window.sessionStorage.shoppinglist);
                                $window.sessionStorage.shoppinglist = JSON.stringify($rootScope.bj(shoppinglist, data[0], ["user_id", "CREATE_TIME"]));
                            }
                        } else {
                            if (data[0] && data[0].length > 0) {
                                $window.sessionStorage.shoppinglist = JSON.stringify(data[0]);
                            }
                        }
                        $rootScope.updateShoppingTip(true);
                    });
                } else {
                    $rootScope.updateShoppingTip(true);
                }
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/ngBlur-debug", [], function(require, exports, module){
'use strict';

/*
 *
 */
module.exports = angular.module('ASS.directive.ngBlur', [])
    .directive('ngBlur', function ($document) {
        return {
            link: function (scope, element, attrs) {
                $(element).bind('blur', function (e) {
                    scope.$apply(attrs.ngBlur);
                });
            }
        }
    });
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/zgcpProinfo-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.zgcpProinfo', [])
    .directive('zgcpProinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zgcpProinfo.html',
            // scope:{}, 使用父控制器scope
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/zgcpManinfo-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.zgcpManinfo', [])
    .directive('zgcpManinfo', [ '$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zgcpManinfo.html',
            // scope:{}, 使用父控制器scope
            link: function ($scope, $element, attrs, model) {

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/zhcpAssetChart-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.zhcpAssetChart', [])
    .directive('zhcpAssetChart', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zhcpAssetChart.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                detailService.getZhcpAssetAllocation({
                    pack_pro_id: attrs.proid,
                    cur_page: -1
                }).then(function (data) {
                        var categories = [];

                        angular.forEach(data[0], function (item) {
                            var items = [];
                            items.push(item.SHT_NAME);
                            items.push(parseFloat(item.PRO_RATIO));
                            categories.push(items);
                        });

                        $('#container').highcharts({
                            credits: false,
                            chart: {
                                type: 'pie',
                                options3d: {
                                    enabled: true,
                                    alpha: 45
                                }
                            },
                            title: {
                                text: '组合内各资产配置',
                                style: {
                                    fontWeight: 'bold'
                                }
                            },
                            colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
                                '#f15c80', '#e4d354', '#8085b8', '#8d4653', '#91e8e1',
                                '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce',
                                '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a',
                                '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
                                '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
                            tooltip: {
                                valueSuffix: '%'
                            },
                            plotOptions: {
                                pie: {
                                    innerSize: 100,
                                    depth: 45
                                }
                            },
                            series: [
                                {
                                    name: '所占比例',
                                    data: categories
                                }
                            ]
                        });
                    }
                )

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/zhcpAssetAllocation-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.zhcpAssetAllocation', [])
    .directive('zhcpAssetAllocation', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zhcpAssetAllocation.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.$watch("pagination.currentpage", function () {
                    if ($scope.pagination.currentpage <= 0) return;
                    search();
                });

                var search = function () {
                    detailService.getZhcpAssetAllocation({
                        pack_pro_id: attrs.proid,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize
                    }).then(function (data) {
                        $scope.zhcpAssetAllocation = data[0] || [];
                        $scope.pagination.totalcount = data[1];
                    })
                };

            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/paywayImg-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.paywayImg', [])
    .directive('paywayImg', [function () {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/paywayImg.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if (attrs.payWay && attrs.payWay.length > 0) {
                    $scope.payway = attrs.payWay.split(",");

                    $scope.paywayDesc = [];
                    if (attrs.payWayDesc && attrs.payWayDesc.length > 0) {
                        $scope.paywayDesc = attrs.payWayDesc.split(",");
                    }
                    $scope.payWays = [];
                    for (var i = 0; i < $scope.payway.length; i++) {
                        $scope.payWays.push({
                            way: $scope.payway[i],
                            desc: $scope.paywayDesc[i] ? $scope.paywayDesc[i] : ""
                        })
                    }
                }
            }
        }
    }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/custom/zgcpFeeStructure-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.zgcpFeeStructure', [])
    .directive('zgcpFeeStructure', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zgcpFeeStructure.html',
            scope: true,
            link: function ($scope, $element, attrs, model) {
                $scope.fees = {
                    '1241': [], // 管理费
                    '1251': [], // 托管费
                    '1271': [], // 参与费用
                    '1273': []  // 退出费用
                };
                detailService.getRateStructure({
                    pro_id: attrs.proid,
                    fee_type: "",
                    fee_mode: "",
                    ext_con: "",
                    cur_page: -1,
                    ret_rows: "",
                    order_by: ""
                }).then(function (data) {
                    if (data[0]) {
                        angular.forEach(data[0], function (item) {
                            if ($scope.fees[item.FEE_TYPE]) {
                                $scope.fees[item.FEE_TYPE].push(item);
                            }
                        });
                    }
                });
            }
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/detailBuyPanel-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.detailBuyPanel', [])
    .directive('detailBuyPanel', [function () {
        return {
            restrict: "EAC",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/detailBuyPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
            }
        };
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/prdGraphPanel-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.prdGraphPanel', [])
    .directive('prdGraphPanel', [function () {
        return {
            restrict: "A",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/prdGraphPanel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                $scope.bg2OfRiskLvl = ['bg2-lvl0', 'bg2-lvl1', 'bg2-lvl2', 'bg2-lvl3', 'bg2-lvl4'];
                $scope.img = attrs.img;
                $scope.cols = attrs.cols;
            }
        };
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/custom/favoriteLabel-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.favoriteLabel', [])
    .directive('favoriteLabel', ['$rootScope', '$state', '$window', 'accountService', 'myConfirm', 'prdCommonService', function ($rootScope, $state, $window, accountService, myConfirm, prdCommonService) {
        return {
            restrict: "A",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/favoriteLabel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.addToMyFavorite = function (products, index) {
                    if (!$window.sessionStorage.sessionid) {
                        myConfirm('现在登录吗？', function () {
                            $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink ? $state.current.ncyBreadcrumbLink : $state.current.name;
                            $state.go('auth.login');
                        }, '', '您需要登录后才能收藏产品', '登录');
                    } else {
                        accountService.getLoginUserInfo().then(function (data) {
                            if (data && data[0] && data[0][0]) {
                                $rootScope.global.account = data[0][0];
                                if (!$rootScope.global.account.USER_ID) {
                                    myConfirm('现在去绑定注册户吗？', function () {
                                        $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink ? $state.current.ncyBreadcrumbLink : $state.current.name;
                                        $state.go('auth.bindregaccount');
                                    }, '', '您需要绑定注册户后才能收藏产品', '立即绑定', '暂不绑定');
                                } else {
                                    accountService.addMyFavorite({
                                        pro_id: products[index].PRO_ID,
                                        lvl2_type: products[index].LVL2_TYPE
                                    }).then(function (data) {
                                        if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                            products[index].isFavorite = true;

                                            // 收藏操作要更新当前页所有产品的收藏状态
                                            if ('kfps.index' == $state.current.name) {
                                                var sibling = $scope.morePrds == 'jxcp' ? $scope.xpPrds : $scope.jxPrds;
                                                for (var i = 0; i < sibling.length; i++) {
                                                    if (sibling[i].PRO_ID == products[index].PRO_ID) {
                                                        sibling[i].isFavorite = true;
                                                    }
                                                }
                                            }
                                            prdCommonService.addToSessionFavorites(products[index]);
                                        }
                                    });
                                }
                            }
                        });
                    }
                };

                $scope.deleteMyFavorites = function (products, index) {
                    myConfirm('确定取消收藏该产品吗？', function () {
                        accountService.deleteMyFavorites({
                            pro_id: products[index].PRO_ID
                        }).then(function (data) {
                            if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                products[index].isFavorite = false;

                                if ('kfps.index' == $state.current.name) {
                                    var sibling = $scope.morePrds == 'jxcp' ? $scope.xpPrds : $scope.jxPrds;
                                    for (var i = 0; i < sibling.length; i++) {
                                        if (sibling[i].PRO_ID == products[index].PRO_ID) {
                                            sibling[i].isFavorite = false;
                                        }
                                    }
                                }
                                prdCommonService.removeFromSessionFavorites(products[index]);
                            }
                        });
                    });
                };

            }
        };
    }]);

});
define("angular-seed-spm/0.0.1/src/components/directive/kibh/safeLevel-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.safeLevel', [])
    .directive('safeLevel', ['$rootScope', '$localStorage', '$timeout', 'kibhSystem', 'SMVC',
        function ($rootScope, $localStorage, $timeout, kibhSystem, SMVC) {
            return {
                restrict: "EAC",
                replace: true,
                scope: {
                    bizid: "=",
                    busilogno: "=",
                    code: "=",
                    fundpwd: "="
                },
                templateUrl: 'apps/src/blocks/directivetpl/kibh/safeLevel.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    var bizsconfig = $localStorage.bizsconfig;
                    var level = bizsconfig[$scope.bizid].SECURITY_LEVEL;

                    $scope.$watch("code", function () {
                        $localStorage.safelevel_code = $scope.code;
                        $localStorage.safelevel_code_id = $scope.codeid;
                    });

                    $scope.$watch("fundpwd", function () {
                        $localStorage.safelevel_fundpwd = $scope.fundpwd;
                    });

                    $scope.safelevel = {};
                    if (level) {
                        level = level.split(",");
                        for (var i in level) {
                            if (level[i]) $scope.safelevel[level[i]] = true;
                        }
                    }

                    if (!$scope.safelevel[1]) $scope.code = "111111";
                    if (!$scope.safelevel[2]) $scope.fundpwd = "111111";

                    /*获取验证码*/
                    var wait = 120;
                    $scope.codetip = "获取验证码";
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
                                kibhSystem.getMobileCode({
                                    BUSINESS_ID: $scope.bizid,
                                    BUSI_LOG_NO: $scope.busilogno
                                }).then(function (data) {
                                    if (data[0] == null) {
                                        $scope.codetip = "获取验证码";
                                        wait = 120;
                                    } else {
                                        if (SMVC && data[0][0]) {
                                            $scope.code = data[0][0].VERIFY_CODE;
                                            $scope.codeid = data[0][0].CODE_ID;
                                        }
                                        $scope.codetip = "重新发送(" + wait + ")";
                                        wait--;
                                        $timeout(function () {
                                            $scope.getcode(true);
                                        }, 1000);
                                    }
                                });
                            }
                        }
                    };

                    // 兼容IE
                    if ($.browser.msie && $.browser.version <= 9) {
                        $('input, textarea').placeholder();
                    }
                }
            }
        }]);
});
define("angular-seed-spm/0.0.1/src/components/directive/kibh/anyChat-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.directive.anyChat', [])
    .directive('anyChat', ['$ocLazyLoad', 'kibhSystem', '$window', 'myAlert', 'myConfirm',
        function ($ocLazyLoad, kibhSystem, $window, myAlert, myConfirm) {
            return {
                restrict: "EAC",
                replace: true,
                scope : {
                	busilogno: "=",
                	bizid: "=",
                	success: "=",
                	failed: "="
        		},
                templateUrl: 'apps/src/blocks/directivetpl/kibh/anyChat.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                	if (typeof(initSDKRetCode) == "undefined") {
                		$ocLazyLoad.load([ "public/vendors/bower_components/anychat/src/javascript/anychatsdk.js",
                		                   "public/vendors/bower_components/anychat/src/javascript/anychatevent.js",
                		                   /*"public/vendors/bower_components/anychat/src/javascript/advanceset.js",
                		                   "public/vendors/bower_components/anychat/src/javascript/videocall.js",*/
                		                   "public/vendors/bower_components/anychat/src/javascript/logicfunc.js"
						]).then(function() {
							LogicInit();
							/*$scope.$watch("busilogno", function() {
								if($scope.busilogno) {
									kibhSystem.getLogUserInfo().then(function(data) {
										var user = data[0][0];
										LogicInit(user.PHONE_NO, $scope.bizid, $window.sessionStorage.sessionid, user.USER_ID, "1008111432109581762");
									});
								}
							});*/
						});
                	} else {
                		if (initSDKRetCode == GV_ERR_SUCCESS) {
                			connectVideoServer();
                		} else {
                			LogicInit();
                		}
                	}
                	
                	$scope.changeVideoCp = function() {
                		BRAC_SelectVideoCapture(BRAC_DEVICE_VIDEOCAPTURE, $scope.vc);
                	};
                	
                	$scope.record = function() {
                		setVideoRecord();
                	};
                	
                	$scope.again = function() {
                		myConfirm("您确定要重新录制吗？", function() {
                			setVideoRecord();
                		});
                	};
                	
                	$scope.play = function() {
                		setVideoPlay();
                	};
                }
            }
        }]);
});
define("angular-seed-spm/0.0.1/src/components/filter/filter-debug", [], function(require, exports, module){
'use strict';
require("angular-seed-spm/0.0.1/src/components/filter/kfps/moneyFomat-debug");
require("angular-seed-spm/0.0.1/src/components/filter/kfps/transtype-debug");
require("angular-seed-spm/0.0.1/src/components/filter/kfps/transTypeName-debug");
require("angular-seed-spm/0.0.1/src/components/filter/kfps/timeInterval-debug");
require("angular-seed-spm/0.0.1/src/components/filter/kfps/fieldCover-debug");
require("angular-seed-spm/0.0.1/src/components/filter/kfps/escapeSequence-debug");


require("angular-seed-spm/0.0.1/src/components/filter/kibh/mobileCover-debug");
require("angular-seed-spm/0.0.1/src/components/filter/kibh/moneyDivide-debug");

var filter = angular.module('ASS.filter', [

/********************kfps*********************/
    'ASS.filter.transtype',
    'ASS.filter.moneyFomat',
    'ASS.filter.transTypeName',
    'ASS.filter.timeInterval',
    'ASS.filter.fieldCover',
    'ASS.filter.escapeSequence',

/********************kibh*********************/
    'ASS.filter.mobileCover',
    'ASS.filter.moneyDivide'
]);

module.exports = filter;

});
define("angular-seed-spm/0.0.1/src/components/filter/kfps/moneyFomat-debug", [], function(require, exports, module){
'use strict';
var moneyFomat = angular.module('ASS.filter.moneyFomat', [])
    .filter('moneyFomat', function () {
        function formatFilter(s, n, par) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r + " " + par;
        }

        return function (input, params) {
            var args = Array.prototype.slice.call(arguments);
            //console.log("arguments=", args.length);
            var n = 0;
            n = args.length >= 2 ? args[1] : 2; //小数点位
            if (isNaN(n)) {//参数异常 小数点位数必须为数字
                //console.log("参数返回"+n);
                return input;
            }
            if (input != '' && !isNaN(input)) { //返回格式化 数据
                //console.log(n+"正常"+input);
                //var t=(parseFloat(input)*10000).toFixed(4);
                var t = (parseFloat(input)).toFixed(4);
                if (t >= 100000000) {
                    return formatFilter(t / 100000000, n, '亿元');
                } else if (t >= 10000) {
                    return formatFilter(t / 10000, n, '万元');
                } else {
                    return formatFilter(t, n, '元');
                }
            } else {
                //console.log("元数据"+input);
                return input;
            }

        }
    });

module.exports = moneyFomat;


});
define("angular-seed-spm/0.0.1/src/components/filter/kfps/transtype-debug", [], function(require, exports, module){
'use strict';
var transtype = angular.module('ASS.filter.transtype', [])
    .filter('transtype', function () {
        return function (input) {
            var keyv = { //数据库类型 与菜单 类型编码对照
                "486": "gtsc",
                "38": "zxcp",
                "6": "gmjj",
                "500": "zhcp",
                "4": "zgcp"
            };
            if (input != '' && keyv[input]) { //返回格式化 数据
                //console.info("类型过滤:"+input +" 过滤后："+keyv[input]);
                return keyv[input];

            } else {
                //console.log("元数据"+input);
                return input;
            }

        }
    });

module.exports = transtype;


});
define("angular-seed-spm/0.0.1/src/components/filter/kfps/transTypeName-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.filter.transTypeName', [])
    .filter('transTypeName', ['$http', function ($http) {
        return function (input, params) {
            var typetoname = {
                "all": "所有理财产品",
                "gmjj": "公募基金",
                "gtsc": "柜台市场产品",
                "zgcp": "资管产品",
                "zxcp": "资讯产品",
                "zhcp": "组合产品",
                "jxcp": "精选产品",
                "xpzq": "新品专区"
            };
            return typetoname[input];
        }
    }]);

});
define("angular-seed-spm/0.0.1/src/components/filter/kfps/timeInterval-debug", [], function(require, exports, module){
'use strict';

var timeInterval = angular.module('ASS.filter.timeInterval', [])
    .filter('timeInterval', function () {
        return function (input, params) {
            var ptime = Date.parse(input.substring(0, 19).replace(/-/g, "/"));
            var ctime = new Date().getTime();
            var secondDif = (ctime - ptime) / 1000;
            switch (true) {
                case secondDif < 60:
                    secondDif = parseInt(secondDif) + ' 秒前';
                    break;
                case secondDif < 120:
                    secondDif = '1 分钟前';
                    break;
                case secondDif < 3600:
                    secondDif = parseInt(secondDif / 60) + ' 分钟前';
                    break;
                case secondDif < 86400:
                    secondDif = parseInt(secondDif / 3600) + ' 小时前';
                    break;
                case secondDif < 172800:
                    secondDif = '昨天';
                    break;
                case secondDif < 2592000:
                    secondDif = parseInt(secondDif / 86400) + ' 天前';
                    break;
                default:
                    secondDif = parseInt(secondDif / 2592000) + ' 月前';
                    break;
            }
            return secondDif;
        }
    });

module.exports = timeInterval;

});
define("angular-seed-spm/0.0.1/src/components/filter/kfps/fieldCover-debug", [], function(require, exports, module){
'use strict';

var fieldCover = angular.module('ASS.filter.fieldCover', [])
    .filter('fieldCover', function () {
        return function (input, params) {
            if (input) {
                var toShow = "", toCover = input;
                if (params) {
                    if (input.length >= params) {
                        toShow = input.substring(0, input.length - params);
                        toCover = input.substring(input.length - params);
                    }
                }
                toCover = toCover.replace(/./g, "*");
                return toShow + toCover;
            }
        }
    });

module.exports = fieldCover;

});
define("angular-seed-spm/0.0.1/src/components/filter/kfps/escapeSequence-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.filter.escapeSequence', [])
    .filter('escapeSequence', function () {
        return function (input) {
            var esc = [{
                real: ' ',
                esc: '&nbsp;'
            }, {
                real: '<',
                esc: '&lt;'
            }, {
                real: '>',
                esc: '&gt;'
            }, {
                real: '&',
                esc: '&amp;'
            }, {
                real: '"',
                esc: '&quot;'
            }, {
                real: '<br>',
                esc: '\r'
            }];
            if (input) {
                var output = input;
                for (var i = 0; i < esc.length; i++) {
                    output = output.replace(new RegExp(esc[i].esc, 'g'), esc[i].real);
                }
                return output;
            }
        }
    });
});
define("angular-seed-spm/0.0.1/src/components/filter/kibh/mobileCover-debug", [], function(require, exports, module){
'use strict';

var mobileCover = angular.module('ASS.filter.mobileCover', [])
    .filter('mobileCover', function () {
        return function (input, param1, param2) {
            if (input) {
                var head = "", cover = input, tail = "";
                if (param2) {
                    head = input.substring(0, param1);
                    cover = input.substring(param1, input.length - param2);
                    tail = input.substring(input.length - param2);
                } else if (param1) {
                    head = input.substring(0, param1);
                    cover = input.substring(param1);
                }
                cover = cover.replace(/[0-9]/g, "*");
                return head + cover + tail;
            }
        }
    });

module.exports = mobileCover;

});
define("angular-seed-spm/0.0.1/src/components/filter/kibh/moneyDivide-debug", [], function(require, exports, module){
'use strict';

var moneyDivide = angular.module('ASS.filter.moneyDivide', [])
    .filter('moneyDivide', function () {
        return function (input, params) {
            if (input) {
                if (input.indexOf(".") == 0) {
                    input = "0" + input;
                }
                var position = params ? params : 3, toDivide = input, toSave = "", index = input.indexOf(".");
                if (index >= 0) {
                    toDivide = input.substring(0, index);
                    toSave = input.substring(index);
                }
                for (var i = toDivide.length - position; i > 0; i = i - position) {
                    if (i == 1 && !angular.isNumber(toDivide.charAt(0))) break;
                    toDivide = toDivide.substring(0, i) + "," + toDivide.substring(i);
                }
                return toDivide + toSave;
            }
        }
    });

module.exports = moneyDivide;

});
define("angular-seed-spm/0.0.1/src/template/template-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.template', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/page/index');
        $urlRouterProvider.when('/', '/page/index');
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('404', {
                url: '/404',
                templateUrl: 'apps/src/template/404.html'
            }).state('page', {
                abstract: true,
                url: '/page',
                templateUrl: 'apps/src/template/kfps.html',
                controller: 'templateCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/template/templateController.js' ]);
                    }]
                }
            }).state('kfps', {
                abstract: true,
                url: '/kfps',
                templateUrl: 'apps/src/template/kfps.html',
                controller: 'templateCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/template/templateController.js' ]);
                    }]
                }
            }).state('kibh', {
                abstract: true,
                url: '/kibh',
                templateUrl: 'apps/src/template/kibh.html',
                controller: 'templateCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/template/templateController.js' ]);
                    }]
                }
            }).state('kibh.biz', {
                abstract: true,
                url: '/biz',
                templateUrl: 'apps/src/template/biz.html',
                controller: 'bizCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/template/bizController.js' ]);
                    }]
                }
            }).state('auth', {
                abstract: true,
                url: '/auth',
                templateUrl: 'apps/src/template/auth.html',
                controller: 'templateCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/template/templateController.js' ]);
                    }]
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/index/index-debug", [], function(require, exports, module){
'use strict';
module.exports = angular.module('ASS.index', ['ui.router', 'oc.lazyLoad'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page.index', {
            url: '/index',
            templateUrl: 'apps/src/index/' + (WEB_CUST ? WEB_CUST : 'main') + '.html',
            controller: 'IndexCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/index/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '首页'
            }
        });
}]);
});
define("angular-seed-spm/0.0.1/src/zindex/zindex-debug", [], function(require, exports, module){
'use strict';

var zindex = angular.module('ASS.zindex', ['ui.router', 'oc.lazyLoad']);

zindex.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.index', {
            url: '/index',
            templateUrl: 'apps/src/zindex/main.html',//template: require('./main.html'),
            controller: 'ZindexCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/zindex/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '商城首页'
            }
        });
}]);

module.exports = zindex;
});
define("angular-seed-spm/0.0.1/src/login/login-debug", [], function(require, exports, module){
'use strict';

var login = angular.module('ASS.login', ['ui.router', 'oc.lazyLoad']);

login.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth.login', {
            url: '/login',
            templateUrl: 'apps/src/login/main.html',//template: require('./main.html'),
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/controller.js' ]);
                }]
            }
        })
        .state('auth.binddealaccount', {
            url: '/binddealaccount',
            templateUrl: 'apps/src/login/binddealaccount.html',//template: require('./main.html'),
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/controller.js' ]);
                }]
            }
        })

        .state('auth.bindregaccount', {
            url: '/bindregaccount',
            templateUrl: 'apps/src/login/bindregaccount.html',//template: require('./main.html'),
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/controller.js' ]);
                }]
            }
        })
        .state('auth.checkLogin', {
            url: '/checkLogin',
            templateUrl: 'apps/src/login/checkLogin.html',//template: require('./main.html'),
            controller: 'checkLoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/checkLoginController.js' ]);
                }]
            }
        });
}]);

module.exports = login;
});
define("angular-seed-spm/0.0.1/src/register/register-debug", [], function(require, exports, module){
'use strict';

var register = angular.module('ASS.register', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap']);

register.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth.register', {
            url: '/register',
            templateUrl: 'apps/src/register/main.html',//template: require('./main.html'),
            controller: 'RegisterCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/register/controller.js' ]);
                }]
            }
        })
        .state('auth.regsuc', {
            url: '/regsuc',
            templateUrl: 'apps/src/register/success.html',//template: require('./success.html'),
            controller: 'RegisterCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/register/controller.js' ]);
                }]
            }
        });
}]);

module.exports = register;
});
define("angular-seed-spm/0.0.1/src/prdlist/prdlist-debug", [], function(require, exports, module){
'use strict';

var prdlist = angular.module('ASS.prdlist', ['ui.router', 'oc.lazyLoad']);

prdlist.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.prdlist', {
            url: '/prdlist/:type',
            templateUrl: 'apps/src/prdlist/main.html', //template: require('./main.html'),
            controller: 'prdlistCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/prdlist/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '{{type | transTypeName}}',
                parent: 'kfps.index'
            }
        }).state('kfps.searchprds', {
            url: '/searchprds/:type/:key',
            templateUrl: 'apps/src/prdlist/main.html', //template: require('./main.html'),
            controller: 'prdlistCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/prdlist/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '搜索产品',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = prdlist;
});
define("angular-seed-spm/0.0.1/src/detail/detail-debug", [], function(require, exports, module){
'use strict';

var detail = angular.module('ASS.detail', ['ui.router', 'oc.lazyLoad']);

detail.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.detail', {
            url: '/detail/:id/:type',
            templateUrl: function ($stateParams) {
                var type = $stateParams.type;
                var temurl = 'apps/src/detail/main.html';
                var keyv = { //数据库类型 与菜单 类型编码对照
                    "gtsc": "apps/src/detail/gtsc.html",
                    "zxcp": "apps/src/detail/zxcp.html",
                    "gmjj": "apps/src/detail/main.html",
                    "zhcp": "apps/src/detail/zhcp.html",
                    "zgcp": "apps/src/detail/zgcp.html"
                };
                if (type && keyv[type]) {
                    return  keyv[type];
                } else {
                    return  'apps/src/detail/main.html';
                }
            },
            controller: 'DetailCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'public/vendors/bower_components/highstock-release/highstock.js', 'public/vendors/bower_components/highstock-release/highcharts-3d.js', 'apps/src/detail/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '{{prd.SHT_NAME}}',
                parent: "kfps.prdlist({type: type})"
            }
        })
        .state('kfps.proNotice', {
            url: '/proNotice/:id',
            templateUrl: 'apps/src/detail/pronotice.html',//template: require('./main.html'),
            controller: 'DetailCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/detail/noticeController.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '产品公告',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = detail;
});
define("angular-seed-spm/0.0.1/src/scart/scart-debug", [], function(require, exports, module){
'use strict';

var scart = angular.module('ASS.scart', ['ui.router', 'oc.lazyLoad']);

scart.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.scart', {
            url: '/scart',
            templateUrl: 'apps/src/scart/main.html',//template: require('./main.html'),
            controller: 'ScartCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/scart/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '我的购物车',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = scart;
});
define("angular-seed-spm/0.0.1/src/confirmorder/confirmorder-debug", [], function(require, exports, module){
'use strict';

var confirmorder = angular.module('ASS.confirmorder', ['ui.router', 'oc.lazyLoad']);

confirmorder.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.confirmorder', {
            url: '/confirmorder',
            templateUrl: 'apps/src/confirmorder/main.html',
            controller: 'ConfirmorderCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/confirmorder/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '订单',
                parent: 'kfps.index'
            }
        })
        .state('kfps.bindaccount', {
            url: '/bindaccount',
            templateUrl: 'apps/src/confirmorder/binddealaccount.html',
            controller: 'OrderpayCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/confirmorder/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '绑定资金账户',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = confirmorder;
});
define("angular-seed-spm/0.0.1/src/orderpay/orderpay-debug", [], function(require, exports, module){
'use strict';

var orderpay = angular.module('ASS.orderpay', ['ui.router', 'oc.lazyLoad']);

orderpay.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.orderpay', {
            url: '/orderpay',
            templateUrl: 'apps/src/orderpay/main.html',//template: require('./main.html'),
            controller: 'OrderpayCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/orderpay/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '订单支付',
                parent: 'kfps.index'
            }
        })
}]);

module.exports = orderpay;
});
define("angular-seed-spm/0.0.1/src/paysuccess/paysuccess-debug", [], function(require, exports, module){
'use strict';

var paysuccess = angular.module('ASS.paysuccess', ['ui.router', 'oc.lazyLoad']);

paysuccess.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.paysuccess', {
            url: '/paysuccess',
            templateUrl: 'apps/src/paysuccess/main.html',//template: require('./main.html'),
            controller: 'PaysuccessCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/paysuccess/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '完成订单支付',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = paysuccess;
});
define("angular-seed-spm/0.0.1/src/notice/notice-debug", [], function(require, exports, module){
'use strict';

var notice = angular.module('ASS.notice', ['ui.router', 'oc.lazyLoad']);

notice.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page.notice', {
            url: '/notice',
            templateUrl: 'apps/src/notice/main.html',//template: require('./main.html'),
            controller: 'NoticeCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/notice/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '公告',
                parent: 'page.index'
            }
        })
        .state('page.noticeDetail', {
            url: '/noticeDetail/:id',
            templateUrl: 'apps/src/notice/detail.html',//template: require('./main.html'),
            controller: 'DetailCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/notice/detailController.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '公告详情',
                parent: 'page.notice'
            }
        });
}]);

module.exports = notice;
});
define("angular-seed-spm/0.0.1/src/account/account-debug", [], function(require, exports, module){
'use strict';

var account = angular.module('ASS.account', ['ui.router', 'oc.lazyLoad']);

account.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page.account', {
            abstract: true,
            url: '/account',
            templateUrl: 'apps/src/account/main.html',
            controller: 'AccountCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/controller.js']);
                }]
            }
        })
        .state('page.account.info', {
            url: '/info',
            templateUrl: 'apps/src/account/info/info.html',
            controller: 'InfoCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/infoController.js']);
                }]
            }
        })
        .state('page.account.myaccount', {
            url: '/myaccount',
            templateUrl: 'apps/src/account/myaccount/myaccount.html',
            controller: 'MyaccountCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/myaccount/myaccountController.js']);
                }]
            }
        })
        .state('page.account.infoUpdate', {
            url: '/infoUpdate',
            templateUrl: 'apps/src/account/info/infoUpdate.html',
            controller: 'InfoCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/infoController.js']);
                }]
            }
        })
        .state('page.account.investment', {
            url: '/investment',
            templateUrl: 'apps/src/account/investment/investment.html',
            controller: 'InvestmentCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/investment/investmentController.js']);
                }]
            }
        })
        .state('page.account.redeem', {
            url: '/products',
            templateUrl: 'apps/src/account/products/account.html',
            controller: 'ProductsCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/products/productsController.js']);
                }]
            }
        })
        .state('page.account.products', {
            url: '/products/:type',
            templateUrl: 'apps/src/account/products/products.html',
            controller: 'ProductsCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/products/productsController.js']);
                }]
            }
        })
        .state('page.account.productRedeem', {
            url: '/productRedeem/:type/:id',
            templateUrl: 'apps/src/account/products/productRedeem.html',
            controller: 'ProductRedeemCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/products/productRedeemController.js']);
                }]
            }
        })
        .state('page.account.orders', {
            url: '/orders/:order_type',
            templateUrl: 'apps/src/account/orders/orders.html',
            controller: 'OrdersCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('public/vendors/bower_components/jquery-ui/jquery-ui.min.js').then(function () {
                        return $ocLazyLoad.load(['public/vendors/bower_components/jQRangeSlider/jQAllRangeSliders-withRuler-min.js',
                            'public/vendors/bower_components/jQRangeSlider/css/classic-min.css',
                            'apps/src/account/orders/ordersController.js']);
                    });
                }]
            }
        })
        .state('page.account.favorites', {
            url: '/favorites',
            templateUrl: 'apps/src/account/favorites/favorites.html',
            controller: 'FavoritesCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/favorites/favoritesController.js']);
                }]
            }
        })
        .state('page.account.messages', {
            url: '/messages/:message_type',
            templateUrl: 'apps/src/account/messages/messages.html',
            controller: 'MessagesCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/messages/messagesController.js']);
                }]
            }
        })
        .state('page.account.messageDetail', {
            url: '/messageDetail/:message_type/:message_id',
            templateUrl: 'apps/src/account/messages/messageDetail.html',
            controller: 'MessageDetailCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/messages/messageDetailController.js']);
                }]
            }
        })
        .state('page.account.security', {
            abstract: true,
            url: '/security',
            templateUrl: 'apps/src/account/security/main.html'
        })
        .state('page.account.security.start', {
            url: '/start',
            templateUrl: 'apps/src/account/security/start.html',
            controller: 'SecurityCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/securityController.js']);
                }]
            }
        })
        .state('page.account.security.emailcertify', {
            url: '/emailcertify',
            templateUrl: 'apps/src/account/security/emailcertify/emailCertify.html',
            controller: 'EmailCertifyCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/emailcertify/controller.js']);
                }]
            }
        })
        .state('page.emailCertifyConfirm', {
            url: '/emailCertifyConfirm/:safe_user_id/:safe_user_name/:safe_random_code/:session_id',
            templateUrl: 'apps/src/account/security/emailcertify/result.html',
            controller: 'EmailCertifyResultCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/emailcertify/resultController.js']);
                }]
            },
            ncyBreadcrumb: {
                label: '邮箱验证',
                parent: 'page.index'
            }
        })
        .state('page.account.security.pwupdate', {
            url: '/pwupdate',
            abstract: true,
            templateUrl: 'apps/src/account/security/pwupdate/main.html'
        })
        .state('page.account.security.pwupdate.input', {
            url: '/input',
            templateUrl: 'apps/src/account/security/pwupdate/input.html',
            controller: 'PasswordUpdateCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/pwupdate/controller.js']);
                }]
            }
        })
        .state('page.account.security.pwupdate.success', {
            url: '/success',
            templateUrl: 'apps/src/account/security/pwupdate/success.html',
            controller: 'PasswordUpdateCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/pwupdate/controller.js']);
                }]
            }
        })
        .state('page.account.security.phoneupdate', {
            url: '/phoneupdate',
            templateUrl: 'apps/src/account/security/phoneupdate/phoneUpdate.html',
            controller: 'PhoneUpdateCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/phoneupdate/controller.js']);
                }]
            }
        })
        .state('page.account.mybank', {
            url: '/success',
            templateUrl: 'apps/src/account/mybank/mybank.html',
            controller: 'MybankCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/mybank/mybankController.js']);
                }]
            }
        })
        .state('page.account.transfer', {
            url: '/transfer/:transfer_type',
            templateUrl: 'apps/src/account/transfer/transfer.html',
            controller: 'TransferCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/transfer/transferController.js']);
                }]
            }
        })
}]);

module.exports = account;
});
define("angular-seed-spm/0.0.1/src/pwrecovery/pwrecovery-debug", [], function(require, exports, module){
'use strict';

var pwrecovery = angular.module('ASS.pwrecovery', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap']);

pwrecovery.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth.repwstart', {
            url: '/repwstart',
            templateUrl: 'apps/src/pwrecovery/main.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }

        })
        .state('auth.repwset', {
            url: '/repwset',
            templateUrl: 'apps/src/pwrecovery/repw.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        })
        .state('auth.repwsuccess', {
            url: '/repwsuccess',
            templateUrl: 'apps/src/pwrecovery/success.html',//template: require('./success.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        })
        .state('auth.checkemail', {
            url: '/checkemail/:uid/:rtxt',
            templateUrl: 'apps/src/pwrecovery/repw.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        })
        .state('auth.sendemailsuccess', {
            url: '/sendemailsuccess',
            templateUrl: 'apps/src/pwrecovery/sendemailsuccess.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        });
}]);

module.exports = pwrecovery;
});
define("angular-seed-spm/0.0.1/src/help/help-debug", [], function(require, exports, module){
'use strict';

var help = angular.module('ASS.help', ['ui.router', 'oc.lazyLoad']);

help.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page.help', {
            url: '/help/:type',
            templateUrl: 'apps/src/help/main.html',//template: require('./main.html'),
            controller: 'HelpCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/help/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '帮助中心',
                parent: 'page.index'
            }
        });
}]);

module.exports = help;
});
define("angular-seed-spm/0.0.1/src/placeOrder/placeOrder-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.placeOrder', ['ui.router', 'oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        $stateProvider
            .state('kfps.orderCheck', {
                url: '/orderCheck',
                templateUrl: 'apps/src/placeOrder/orderCheck.html',
                controller: 'OrderCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['apps/src/placeOrder/controller.js']);
                    }]
                },
                ncyBreadcrumb: {
                    label: '订单检查',
                    parent: 'kfps.index'
                }
            })
            .state('kfps.orderApply', {
                url: '/orderApply',
                templateUrl: 'apps/src/placeOrder/orderApply.html',
                controller: 'OrderCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['apps/src/placeOrder/controller.js']);
                    }]
                },
                ncyBreadcrumb: {
                    label: '订单申请',
                    parent: 'kfps.index'
                }
            });
    }]);

});
define("angular-seed-spm/0.0.1/src/kibh/index/index-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.idx', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.index', {
                url: '/index',
                templateUrl: 'apps/src/kibh/index/index.html',
                controller: 'indexCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/index/indexController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '网上营业厅'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/openAccount/openAccount-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openAccount', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openAccount', {
                url: '/openAccount/:businessId',
                templateUrl: 'apps/src/kibh/openAccount/openAccount.html',
                controller: 'openAccountCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openAccount/openAccountController.js' ]);
                    }]
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/accountInfo/accountInfo-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.accountInfo', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.accountInfo', {
                url: '/accountInfo/:businessId',
                templateUrl: 'apps/src/kibh/accountInfo/accountInfo.html',
                controller: 'accountInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/accountInfo/accountInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户信息'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/accountFrozen/accountFrozen-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.accountFrozen', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.accountFrozen', {
                url: '/accountFrozen/:businessId',
                templateUrl: 'apps/src/kibh/accountFrozen/accountFrozen.html',
                controller: 'accountFrozenCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/accountFrozen/accountFrozenController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户冻结'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/accountUnfrozen/accountUnfrozen-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.accountUnfrozen', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.accountUnfrozen', {
                url: '/accountUnfrozen/:businessId',
                templateUrl: 'apps/src/kibh/accountUnfrozen/accountUnfrozen.html',
                controller: 'accountUnfrozenCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/accountUnfrozen/accountUnfrozenController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户解冻'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/modifyTradePwd/modifyTradePwd-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.modifyTradePwd', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.modifyTradePwd', {
                url: '/modifyTradePwd/:businessId',
                templateUrl: 'apps/src/kibh/modifyTradePwd/modifyTradePwd.html',
                controller: 'modifyTradePwdCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/modifyTradePwd/modifyTradePwdController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '交易密码修改'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/modifyMoneyPwd/modifyMoneyPwd-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.modifyMoneyPwd', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.modifyMoneyPwd', {
                url: '/modifyMoneyPwd/:businessId',
                templateUrl: 'apps/src/kibh/modifyMoneyPwd/modifyMoneyPwd.html',
                controller: 'modifyMoneyPwdCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/modifyMoneyPwd/modifyMoneyPwdController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '资金密码修改'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/customerInfo/customerInfo-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.customerInfo', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.customerInfo', {
                url: '/customerInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户资料'
                }
            })
            .state('kibh.biz.modifyBasicInfo', {
                url: '/modifyBasicInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '基本资料修改'
                }
            })
            .state('kibh.biz.modifyIdentityInfo', {
                url: '/modifyIdentityInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    	return $ocLazyLoad.load('public/vendors/bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js').then(function () {
                            return $ocLazyLoad.load([ 'public/vendors/bower_components/jquery-file-upload/js/jquery.iframe-transport.js',
                                                      'public/vendors/bower_components/jquery-file-upload/js/jquery.fileupload.js',
                                                      'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                        });
                    }]
                },
                ncyBreadcrumb: {
                    label: '身份信息修改'
                }
            })
            .state('kibh.biz.modifyOtherInfo', {
                url: '/modifyOtherInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '其他信息修改'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/openHKStock/openHKStock-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openHKStock', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openHKStock', {
                url: '/openHKStock/:businessId',
                templateUrl: 'apps/src/kibh/openHKStock/openHKStock.html',
                controller: 'openHKStockCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openHKStock/openHKStockController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '港股通开通'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/openGEMBoard/openGEMBoard-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openGEMBoard', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openGEMBoard', {
                url: '/openGEMBoard/:businessId',
                templateUrl: 'apps/src/kibh/openGEMBoard/openGEMBoard.html',
                controller: 'openGEMBoardCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openGEMBoard/openGEMBoardController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '创业板开通'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/openRiskStock/openRiskStock-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openRiskStock', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openRiskStock', {
                url: '/openRiskStock/:businessId',
                templateUrl: 'apps/src/kibh/openRiskStock/openRiskStock.html',
                controller: 'openRiskStockCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openRiskStock/openRiskStockController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '风险警示板股票开通'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/openDelistStock/openDelistStock-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openDelistStock', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openDelistStock', {
                url: '/openDelistStock/:businessId',
                templateUrl: 'apps/src/kibh/openDelistStock/openDelistStock.html',
                controller: 'openDelistStockCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openDelistStock/openDelistStockController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '退市整理板股票开通'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/openBusinessAuthority/openBusinessAuthority-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openBusinessAuthority', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openBusinessAuthority', {
                url: '/openBusinessAuthority/:businessId',
                templateUrl: 'apps/src/kibh/openBusinessAuthority/openBusinessAuthority.html',
                controller: 'openBusinessAuthorityCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openBusinessAuthority/openBusinessAuthorityController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '业务权限开通'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/openFund/openFund-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openFund', ['oc.lazyLoad'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kibh.biz.openFund', {
			url : '/openFund/:businessId',
			templateUrl: 'apps/src/kibh/openFund/openFund.html',
			controller: 'openFundCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/kibh/openFund/openFundController.js' ]);
                }]
            },
            ncyBreadcrumb: {
    			label: '场外基金开户'
    		}
		});
}]);
});
define("angular-seed-spm/0.0.1/src/kibh/openHSFund/openHSFund-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.openHSFund', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openHSFund', {
                url: '/openHSFund/:businessId',
                templateUrl: 'apps/src/kibh/openHSFund/openHSFund.html',
                controller: 'openHSFundCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openHSFund/openHSFundController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '沪深开放式基金开户'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/protocolSign/protocolSign-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.protocolSign', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.protocolSign', {
                url: '/protocolSign/:businessId',
                templateUrl: 'apps/src/kibh/protocolSign/protocolSign.html',
                controller: 'protocolSignCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/protocolSign/protocolSignController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '电子协议书签审'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/stockRiskTest/stockRiskTest-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.stockRiskTest', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.stockRiskTest', {
                url: '/stockRiskTest/:businessId',
                templateUrl: 'apps/src/kibh/stockRiskTest/stockRiskTest.html',
                controller: 'stockRiskTestCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/stockRiskTest/stockRiskTestController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '证券风险测评'
                }
            })

            .state('kibh.biz.riskTest', {
                url: '/riskTest/:businessId/:paperno',
                templateUrl: 'apps/src/kibh/stockRiskTest/stockRiskTest.html',
                controller: 'stockRiskTestCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/stockRiskTest/stockRiskTestController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '证券风险测评'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/fundRiskTest/fundRiskTest-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.fundRiskTest', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.fundRiskTest', {
                url: '/fundRiskTest/:businessId',
                templateUrl: 'apps/src/kibh/fundRiskTest/fundRiskTest.html',
                controller: 'fundRiskTestCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/fundRiskTest/fundRiskTestController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '基金风险测评'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/otcRiskTest/otcRiskTest-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.otcRiskTest', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.otcRiskTest', {
                url: '/otcRiskTest/:businessId',
                templateUrl: 'apps/src/kibh/otcRiskTest/otcRiskTest.html',
                controller: 'otcRiskTestCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/otcRiskTest/otcRiskTestController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: 'OTC风险测评'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/depositoryBusiness/depositoryBusiness-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.depositoryBusiness', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.depositoryBusiness', {
                url: '/depositoryBusiness/:businessId',
                templateUrl: 'apps/src/kibh/depositoryBusiness/depositoryBusiness.html',
                controller: 'depositoryBusinessCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/depositoryBusiness/depositoryBusinessController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '存管业务'
                }
            });
    }]);
});
define("angular-seed-spm/0.0.1/src/kibh/delegateMethod/delegateMethod-debug", [], function(require, exports, module){
'use strict';

module.exports = angular.module('ASS.delegateMethod', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.delegateMethod', {
                url: '/delegateMethod/:businessId',
                templateUrl: 'apps/src/kibh/delegateMethod/delegateMethod.html',
                controller: 'delegateMethodCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/delegateMethod/delegateMethodController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '全部业务'
                }
            });
    }]);
});
