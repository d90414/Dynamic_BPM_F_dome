'use strict';

module.exports = angular.module('ASS.customerInfo', ['oc.lazyLoad'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('kibh.biz.customerInfo', {
                url: '/customerInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '账户资料'
                }
            })
            .state('kibh.biz.modifyBasicInfo', {
                url: '/modifyBasicInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '基本资料修改'
                }
            })
            .state('kibh.biz.modifyIdentityInfo', {
                url: '/modifyIdentityInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    	return $ocLazyLoad.load('public/vendors/bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js').then(function () {
                            return $ocLazyLoad.load([ 'public/vendors/bower_components/jquery-file-upload/js/jquery.iframe-transport.js',
                                                      'public/vendors/bower_components/jquery-file-upload/js/jquery.fileupload.js',
                                                      'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                        });
                    }]
                },
                ncyBreadcrumb: {
                    label: '身份信息修改'
                }
            })
            .state('kibh.biz.modifyOtherInfo', {
                url: '/modifyOtherInfo/:businessId',
                templateUrl: 'apps/src/kibh/customerInfo/customerInfo.html',
                controller: 'customerInfoCtrl',
                resolve: {
                    deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load([ 'apps/src/kibh/customerInfo/customerInfoController.js' ]);
                    }]
                },
                ncyBreadcrumb: {
                    label: '其他信息修改'
                }
            });
    }]);