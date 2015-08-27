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