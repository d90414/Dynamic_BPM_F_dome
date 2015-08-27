'use strict';

module.exports = angular.module('ASS.accountFrozen', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.accountFrozen', {
                url: '/accountFrozen/:businessId',
                templateUrl: 'apps/src/kibh/accountFrozen/accountFrozen.html',
                controller: 'accountFrozenCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/accountFrozen/accountFrozenController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户冻结'
                }
            });
    }]);