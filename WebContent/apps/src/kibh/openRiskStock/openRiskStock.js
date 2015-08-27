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