'use strict';

module.exports = angular.module('ASS.openBusinessAuthority', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openBusinessAuthority', {
                url: '/openBusinessAuthority/:businessId',
                templateUrl: 'apps/src/kibh/openBusinessAuthority/openBusinessAuthority.html',
                controller: 'openBusinessAuthorityCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openBusinessAuthority/openBusinessAuthorityController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '业务权限开通'
                }
            });
    }]);