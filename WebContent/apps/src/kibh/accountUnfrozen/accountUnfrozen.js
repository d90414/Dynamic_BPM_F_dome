'use strict';

module.exports = angular.module('ASS.accountUnfrozen', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.accountUnfrozen', {
                url: '/accountUnfrozen/:businessId',
                templateUrl: 'apps/src/kibh/accountUnfrozen/accountUnfrozen.html',
                controller: 'accountUnfrozenCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/accountUnfrozen/accountUnfrozenController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户解冻'
                }
            });
    }]);