'use strict';

module.exports = angular.module('ASS.fundRiskTest', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.fundRiskTest', {
                url: '/fundRiskTest/:businessId',
                templateUrl: 'apps/src/kibh/fundRiskTest/fundRiskTest.html',
                controller: 'fundRiskTestCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/fundRiskTest/fundRiskTestController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '基金风险测评'
                }
            });
    }]);