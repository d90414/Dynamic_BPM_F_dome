'use strict';

module.exports = angular.module('ASS.protocolSign', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.protocolSign', {
                url: '/protocolSign/:businessId',
                templateUrl: 'apps/src/kibh/protocolSign/protocolSign.html',
                controller: 'protocolSignCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/protocolSign/protocolSignController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '电子协议书签审'
                }
            });
    }]);