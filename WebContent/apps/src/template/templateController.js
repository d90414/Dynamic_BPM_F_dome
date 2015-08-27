'use strict';

angular.module('ASS.template').controller('templateCtrl', ['$scope', '$window', '$state', '$localStorage', 'prdlistService', 'kibhSystem', 'adnotService', function ($scope, $window, $state, $localStorage, prdlistService, kibhSystem, adnotService) {
    $scope.topsearch = function () {
        var topkey = angular.element('[name=topsearch]').val();
        var lvl2types = {
            "486": "gtsc",
            "38": "zxcp",
            "6": "gmjj",
            "500": "zhcp",
            "4": "zgcp"
        };
        prdlistService.getresultPrds({pro_key: topkey, ret_rows: 2}).then(function (data) {
            var totalcount = data[1];

            if (totalcount == 1 && data[0]) {
                $state.go("kfps.detail", {"id": data[0][0].PRO_ID, "type": lvl2types[data[0][0].LVL2_TYPE]});
            } else {
                $state.go("kfps.searchprds", {"type": "result", "key": topkey});
            }
        });
    };

    if ($state.includes('page.index') || $state.includes('kfps.index')) {
        adnotService.getAdOrNote({
            type: "1",
            type_val: $state.includes('kfps.index') ? 1 : 2,
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

    if ($state.includes('kibh') || $state.includes('page.index')) {
        kibhSystem.getBizMenu().then(function (data) {
            var m, allmenu = data[0], menubiz = {}, menutitle = {}, menulist = {tree: {}, list: []};
            for (var i in allmenu) {
                m = allmenu[i];
                if (m.MENU_LEVEL) {
                    m.ISHREF = m.MENU_URL.indexOf("\/") >= 0;
                    m.MENU_URL_OLD = angular.copy(m.MENU_URL);
                    m.MENU_URL = m.MENU_LEVEL == "101008" ? "kibh.biz.openAccount" : (m.MENU_URL + "({businessId: '" + m.MENU_LEVEL + "'})");
                    var prefix = m.MENU_LEVEL.substr(0, 3);
                    if (!menulist.tree["a_" + prefix]) {
                        menulist.tree["a_" + prefix] = {root: null, menuitem: []};
                    }

                    if (m.MENU_LEVEL == prefix) {
                        menulist.tree["a_" + prefix].root = m
                    } else {
                        menulist.tree["a_" + prefix].menuitem.push(m);
                    }

                    menulist.list.push(m);
                    menubiz[m.MENU_LEVEL] = m.MEN_BUSI_IDS;
                    menutitle[m.MENU_LEVEL] = m.MENU_NAME;
                }
            }

            $localStorage.menubiz = menubiz;
            $localStorage.menutitle = menutitle;
            $localStorage.menulist = menulist;
            $scope.bizmenus = $localStorage.menulist.tree;
        });

        kibhSystem.getBusinessInfo().then(function (data) {
            var temp = {}, bizsconfig = data[0];
            for (var i = 0; i < bizsconfig.length; i++) {
                temp[bizsconfig[i].BUSINESS_ID] = bizsconfig[i];
            }

            $localStorage.bizsconfig = temp;
        });
    }

    // 兼容IE
    $scope.initPlaceholder = function () {
        if ($.browser.msie && $.browser.version <= 9) {
            if ($.browser.version <= 8) $('label').removeClass('i-checks i-checks-sm i-checks-lg');
            $('input, textarea').placeholder();
        }
    };
}]);