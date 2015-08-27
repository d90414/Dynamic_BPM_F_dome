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