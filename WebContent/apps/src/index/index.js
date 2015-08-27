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