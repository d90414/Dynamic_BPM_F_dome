'use strict';

var notice = angular.module('ASS.notice', ['ui.router', 'oc.lazyLoad']);

notice.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page.notice', {
            url: '/notice',
            templateUrl: 'apps/src/notice/main.html',//template: require('./main.html'),
            controller: 'NoticeCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/notice/controller.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '公告',
                parent: 'page.index'
            }
        })
        .state('page.noticeDetail', {
            url: '/noticeDetail/:id',
            templateUrl: 'apps/src/notice/detail.html',//template: require('./main.html'),
            controller: 'DetailCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/notice/detailController.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '公告详情',
                parent: 'page.notice'
            }
        });
}]);

module.exports = notice;