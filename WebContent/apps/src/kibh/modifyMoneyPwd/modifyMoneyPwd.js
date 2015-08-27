'use strict';

module.exports = angular.module('ASS.modifyMoneyPwd', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.modifyMoneyPwd', {
                url: '/modifyMoneyPwd/:businessId',
                templateUrl: 'apps/src/kibh/modifyMoneyPwd/modifyMoneyPwd.html',
                controller: 'modifyMoneyPwdCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/modifyMoneyPwd/modifyMoneyPwdController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '资金密码修改'
                }
            });
    }]);