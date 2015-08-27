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