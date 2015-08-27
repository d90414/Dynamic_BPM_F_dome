'use strict';

module.exports = angular.module('ASS.openGEMBoard', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.openGEMBoard', {
                url: '/openGEMBoard/:businessId',
                templateUrl: 'apps/src/kibh/openGEMBoard/openGEMBoard.html',
                controller: 'openGEMBoardCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/openGEMBoard/openGEMBoardController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '创业板开通'
                }
            });
    }]);