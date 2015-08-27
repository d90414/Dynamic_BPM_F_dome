'use strict';

var login = angular.module('ASS.login', ['ui.router', 'oc.lazyLoad']);

login.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth.login', {
            url: '/login',
            templateUrl: 'apps/src/login/main.html',//template: require('./main.html'),
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/controller.js' ]);
                }]
            }
        })
        .state('auth.binddealaccount', {
            url: '/binddealaccount',
            templateUrl: 'apps/src/login/binddealaccount.html',//template: require('./main.html'),
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/controller.js' ]);
                }]
            }
        })

        .state('auth.bindregaccount', {
            url: '/bindregaccount',
            templateUrl: 'apps/src/login/bindregaccount.html',//template: require('./main.html'),
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/controller.js' ]);
                }]
            }
        })
        .state('auth.checkLogin', {
            url: '/checkLogin',
            templateUrl: 'apps/src/login/checkLogin.html',//template: require('./main.html'),
            controller: 'checkLoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/login/checkLoginController.js' ]);
                }]
            }
        });
}]);

module.exports = login;