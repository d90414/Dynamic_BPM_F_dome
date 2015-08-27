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