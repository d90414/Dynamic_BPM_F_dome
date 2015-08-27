'use strict';

module.exports = angular.module('ASS.delegateMethod', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.delegateMethod', {
                url: '/delegateMethod/:businessId',
                templateUrl: 'apps/src/kibh/delegateMethod/delegateMethod.html',
                controller: 'delegateMethodCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/delegateMethod/delegateMethodController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '全部业务'
                }
            });
    }]);