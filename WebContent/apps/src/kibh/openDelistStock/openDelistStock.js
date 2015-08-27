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