'use strict';

var register = angular.module('ASS.register', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap']);

register.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth.register', {
            url: '/register',
            templateUrl: 'apps/src/register/main.html',//template: require('./main.html'),
            controller: 'RegisterCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/register/controller.js' ]);
                }]
            }
        })
        .state('auth.regsuc', {
            url: '/regsuc',
            templateUrl: 'apps/src/register/success.html',//template: require('./success.html'),
            controller: 'RegisterCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/register/controller.js' ]);
                }]
            }
        });
}]);

module.exports = register;