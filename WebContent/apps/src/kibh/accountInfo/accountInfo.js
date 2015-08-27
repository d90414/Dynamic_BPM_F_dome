'use strict';

module.exports = angular.module('ASS.accountInfo', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.accountInfo', {
                url: '/accountInfo/:businessId',
                templateUrl: 'apps/src/kibh/accountInfo/accountInfo.html',
                controller: 'accountInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/accountInfo/accountInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户信息'
                }
            });
    }]);