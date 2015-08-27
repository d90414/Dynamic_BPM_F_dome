'use strict';

var confirmorder = angular.module('ASS.confirmorder', ['ui.router', 'oc.lazyLoad']);

confirmorder.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.confirmorder', {
            url: '/confirmorder',
            templateUrl: 'apps/src/confirmorder/main.html',
            controller: 'ConfirmorderCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/confirmorder/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '订单',
                parent: 'kfps.index'
            }
        })
        .state('kfps.bindaccount', {
            url: '/bindaccount',
            templateUrl: 'apps/src/confirmorder/binddealaccount.html',
            controller: 'OrderpayCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/confirmorder/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '绑定资金账户',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = confirmorder;