'use strict';

var pwrecovery = angular.module('ASS.pwrecovery', ['ui.router', 'oc.lazyLoad', 'ui.bootstrap']);

pwrecovery.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('auth.repwstart', {
            url: '/repwstart',
            templateUrl: 'apps/src/pwrecovery/main.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }

        })
        .state('auth.repwset', {
            url: '/repwset',
            templateUrl: 'apps/src/pwrecovery/repw.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        })
        .state('auth.repwsuccess', {
            url: '/repwsuccess',
            templateUrl: 'apps/src/pwrecovery/success.html',//template: require('./success.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        })
        .state('auth.checkemail', {
            url: '/checkemail/:uid/:rtxt',
            templateUrl: 'apps/src/pwrecovery/repw.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        })
        .state('auth.sendemailsuccess', {
            url: '/sendemailsuccess',
            templateUrl: 'apps/src/pwrecovery/sendemailsuccess.html',//template: require('./main.html'),
            controller: 'PwrecoveryCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/pwrecovery/controller.js' ]);
                }]
            }
        });
}]);

module.exports = pwrecovery;