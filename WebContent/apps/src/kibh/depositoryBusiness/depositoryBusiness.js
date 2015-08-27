'use strict';

module.exports = angular.module('ASS.depositoryBusiness', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.depositoryBusiness', {
                url: '/depositoryBusiness/:businessId',
                templateUrl: 'apps/src/kibh/depositoryBusiness/depositoryBusiness.html',
                controller: 'depositoryBusinessCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/depositoryBusiness/depositoryBusinessController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '存管业务'
                }
            });
    }]);