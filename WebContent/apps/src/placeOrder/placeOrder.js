'use strict';

module.exports = angular.module('ASS.placeOrder', ['ui.router', 'oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider) {
        $stateProvider
            .state('kfps.orderCheck', {
                url: '/orderCheck',
                templateUrl: 'apps/src/placeOrder/placeOrder.html',
                controller: 'OrderCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load(['apps/src/placeOrder/controller.js']);
                    }]
                },
                ncyBreadcrumb: {
                    label: '订单',
                    parent: 'kfps.index'
                }
            })
            //.state('kfps.orderCheck', {
            //    url: '/orderCheck',
            //    templateUrl: 'apps/src/placeOrder/orderCheck.html',
            //    controller: 'OrderCtrl',
            //    resolve: {
            //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            //            return $ocLazyLoad.load(['apps/src/placeOrder/controller.js']);
            //        }]
            //    },
            //    ncyBreadcrumb: {
            //        label: '订单检查',
            //        parent: 'kfps.index'
            //    }
            //})
            //.state('kfps.orderApply', {
            //    url: '/orderApply',
            //    templateUrl: 'apps/src/placeOrder/orderApply.html',
            //    controller: 'OrderCtrl',
            //    resolve: {
            //        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            //            return $ocLazyLoad.load(['apps/src/placeOrder/controller.js']);
            //        }]
            //    },
            //    ncyBreadcrumb: {
            //        label: '订单申请',
            //        parent: 'kfps.index'
            //    }
            //});
    }]);
