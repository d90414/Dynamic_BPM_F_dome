'use strict';

var zindex = angular.module('ASS.zindex', ['ui.router', 'oc.lazyLoad']);

zindex.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kfps.index', {
            url: '/index',
            templateUrl: 'apps/src/zindex/main.html',//template: require('./main.html'),
            controller: 'ZindexCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/zindex/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '商城首页'
            }
        });
}]);

module.exports = zindex;