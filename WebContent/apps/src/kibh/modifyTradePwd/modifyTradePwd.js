'use strict';

module.exports = angular.module('ASS.modifyTradePwd', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.modifyTradePwd', {
                url: '/modifyTradePwd/:businessId',
                templateUrl: 'apps/src/kibh/modifyTradePwd/modifyTradePwd.html',
                controller: 'modifyTradePwdCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/modifyTradePwd/modifyTradePwdController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '交易密码修改'
                }
            });
    }]);