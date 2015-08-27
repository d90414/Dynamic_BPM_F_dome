'use strict';

module.exports = angular.module('ASS.openAccount', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openAccount', {
                url: '/openAccount/:businessId',
                templateUrl: 'apps/src/kibh/openAccount/openAccount.html',
                controller: 'openAccountCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openAccount/openAccountController.js' ]);
                    }]
                }
            });
    }]);