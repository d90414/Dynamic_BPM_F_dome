'use strict';

module.exports = angular.module('ASS.openHSFund', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openHSFund', {
                url: '/openHSFund/:businessId',
                templateUrl: 'apps/src/kibh/openHSFund/openHSFund.html',
                controller: 'openHSFundCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openHSFund/openHSFundController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '沪深开放式基金开户'
                }
            });
    }]);