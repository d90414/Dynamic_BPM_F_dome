'use strict';

var orderpay = angular.module('ASS.orderpay', ['ui.router', 'oc.lazyLoad']);

orderpay.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.orderpay', {
            url: '/orderpay',
            templateUrl: 'apps/src/orderpay/main.html',//template: require('./main.html'),
            controller: 'OrderpayCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/orderpay/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '订单支付',
                parent: 'kfps.index'
            }
        })
}]);

module.exports = orderpay;