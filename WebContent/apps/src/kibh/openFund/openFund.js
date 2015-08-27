'use strict';

module.exports = angular.module('ASS.openFund', ['oc.lazyLoad'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('kibh.biz.openFund', {
			url : '/openFund/:businessId',
			templateUrl: 'apps/src/kibh/openFund/openFund.html',
			controller: 'openFundCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/kibh/openFund/openFundController.js' ]);
                }]
            },
            ncyBreadcrumb: {
    			label: '场外基金开户'
    		}
		});
}]);