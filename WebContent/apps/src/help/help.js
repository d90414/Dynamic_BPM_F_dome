'use strict';

var help = angular.module('ASS.help', ['ui.router', 'oc.lazyLoad']);

help.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page.help', {
            url: '/help/:type',
            templateUrl: 'apps/src/help/main.html',//template: require('./main.html'),
            controller: 'HelpCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/help/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '帮助中心',
                parent: 'page.index'
            }
        });
}]);

module.exports = help;