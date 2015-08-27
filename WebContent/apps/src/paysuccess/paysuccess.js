'use strict';

var paysuccess = angular.module('ASS.paysuccess', ['ui.router', 'oc.lazyLoad']);

paysuccess.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.paysuccess', {
            url: '/paysuccess',
            templateUrl: 'apps/src/paysuccess/main.html',//template: require('./main.html'),
            controller: 'PaysuccessCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/paysuccess/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '完成订单支付',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = paysuccess;