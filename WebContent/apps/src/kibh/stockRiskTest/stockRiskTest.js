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