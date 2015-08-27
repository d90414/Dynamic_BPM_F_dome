'use strict';

module.exports = angular.module('ASS.idx', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.index', {
                url: '/index',
                templateUrl: 'apps/src/kibh/index/index.html',
                controller: 'indexCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/index/indexController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '网上营业厅'
                }
            });
    }]);