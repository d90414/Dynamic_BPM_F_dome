'use strict';

angular.module('ASS.idx').controller('indexCtrl', ['$rootScope', '$scope', '$window', '$state', '$localStorage', 'kibhSystem', 'myAlert', 'myConfirm', function ($rootScope, $scope, $window, $state, $localStorage, kibhSystem, myAlert, myConfirm) {
    if (!angular.isDefined($localStorage.menulist)) {
        kibhSystem.getBizMenu().then(function (data) {
            var m, allmenu = data[0], menubiz = {}, menulist = {tree: {}, list: []};
            for (var i = 0; i < allmenu.length; i++) {
                m = allmenu[i];
                m.MENU_URL_OLD = m.MENU_URL;
                if (m.MENU_LEVEL) {
                    m.MENU_URL = m.MENU_URL + "({businessId: '" + m.MENU_LEVEL + "'})";
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
                }
            }

            $localStorage.menubiz = menubiz;
            $localStorage.menulist = menulist;
            $scope.allBizs = $localStorage.menulist.tree;
            $scope.commonBizs = $localStorage.menulist.list;
        });
    } else {
        $scope.allBizs = $localStorage.menulist.tree;
        $scope.commonBizs = $localStorage.menulist.list;
    }

    if (angular.isDefined($window.sessionStorage.sessionid)) {
        $scope.hasLogin = true;
        $scope.usertest = [];

        /*kibhSystem.getUserBizs().then(function (data) {
            if (data && data[0]) {
            	var userbizs = [];
                angular.forEach(data[0], function (d) {
                    var biz = $localStorage.bizsconfig[d.BUSINESS_ID];
                    if (biz) {
                        d.BUSINESS_NAME = biz.BUSINESS_NAME;
                        d.BUSI_DESC = biz.BUSI_DESC;
                    }
                    userbizs.push(d);
                });
                $scope.userbizs = userbizs;*/
                kibhSystem.getDictInfo({
                    DICT_CODE: "SURVEY_CLS"
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $scope.surveycls = data[0];
                        kibhSystem.getRiskTest().then(function (data) {
                            if (data && data[0] && data[0][0]) {
                                $scope.usertest = data[0];
                                kibhSystem.getRiskTestRlt().then(function (data) {
                                    if (data && data[0] && data[0][0]) {
                                        if (data[0][0].IS_EXP != 0) {
                                            myConfirm("您的证券风险评测已过期，要重新评测吗？", function () {
                                            	$rootScope.beforeRiskTestUrl = $state.current.name;
                                                $state.go("kibh.biz.stockRiskTest", {businessId: $rootScope.stockRiskTestId});
                                            });
                                        }
                                    }
                                });
                            } else {
                            	myAlert("请先进行风险测评！", function () {
                            		$rootScope.beforeRiskTestUrl = $state.current.name;
                                    $state.go("kibh.biz.stockRiskTest", {businessId: $rootScope.stockRiskTestId});
                                }, function () {
                                	$rootScope.beforeRiskTestUrl = $state.current.name;
                                    $state.go("kibh.biz.stockRiskTest", {businessId: $rootScope.stockRiskTestId});
                                });
                            }
                        });
                    }
                });
            /*}
        });*/
    }
}]);
