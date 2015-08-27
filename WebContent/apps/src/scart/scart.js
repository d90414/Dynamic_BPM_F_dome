'use strict';

var scart = angular.module('ASS.scart', ['ui.router', 'oc.lazyLoad']);

scart.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.scart', {
            url: '/scart',
            templateUrl: 'apps/src/scart/main.html',//template: require('./main.html'),
            controller: 'ScartCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/scart/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '我的购物车',
                parent: 'kfps.index'
            }
        });
}]);

module.exports = scart;