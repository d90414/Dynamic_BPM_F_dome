'use strict';

var account = angular.module('ASS.account', ['ui.router', 'oc.lazyLoad']);

account.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('page.account', {
            abstract: true,
            url: '/account',
            templateUrl: 'apps/src/account/main.html',
            controller: 'AccountCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/controller.js']);
                }]
            }
        })
        .state('page.account.info', {
            url: '/info',
            templateUrl: 'apps/src/account/info/info.html',
            controller: 'InfoCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/infoController.js']);
                }]
            }
        })
        .state('page.account.myaccount', {
            url: '/myaccount',
            templateUrl: 'apps/src/account/myaccount/myaccount.html',
            controller: 'MyaccountCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/myaccount/myaccountController.js']);
                }]
            }
        })
        .state('page.account.infoUpdate', {
            url: '/infoUpdate',
            templateUrl: 'apps/src/account/info/infoUpdate.html',
            controller: 'InfoCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/infoController.js']);
                }]
            }
        })
         /******测试认证*****/
        .state('page.account.passwd', {
            url: '/passwd',
            templateUrl: 'apps/src/account/info/passwd.html',
            controller: 'PasswdCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/passwdController.js']);
                }]
            }
        })
        .state('page.account.photoNum', {
            url: '/photoNum',
            templateUrl: 'apps/src/account/info/photoNum.html',
            controller: 'PhotoNumCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/photoNumController.js']);
                }]
            }
        })
        .state('page.account.shengfen', {
            url: '/shengfen',
            templateUrl: 'apps/src/account/info/shengfen.html',
            controller: 'ShengfenCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/shengfenController.js']);
                }]
            }
        })
         .state('page.account.end', {
            url: '/end',
            templateUrl: 'apps/src/account/info/end.html',
            controller: 'EndCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/info/endController.js']);
                }]
            }
        })
        /********************测试认证结束*********************/
        .state('page.account.investment', {
            url: '/investment',
            templateUrl: 'apps/src/account/investment/investment.html',
            controller: 'InvestmentCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/investment/investmentController.js']);
                }]
            }
        })
        .state('page.account.redeem', {
            url: '/products',
            templateUrl: 'apps/src/account/products/account.html',
            controller: 'ProductsCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/products/productsController.js']);
                }]
            }
        })
        .state('page.account.products', {
            url: '/products/:type',
            templateUrl: 'apps/src/account/products/products.html',
            controller: 'ProductsCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/products/productsController.js']);
                }]
            }
        })
        .state('page.account.productRedeem', {
            url: '/productRedeem/:type/:id',
            templateUrl: 'apps/src/account/products/productRedeem.html',
            controller: 'ProductRedeemCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/products/productRedeemController.js']);
                }]
            }
        })
        .state('page.account.orders', {
            url: '/orders/:order_type',
            templateUrl: 'apps/src/account/orders/orders.html',
            controller: 'OrdersCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('public/vendors/bower_components/jquery-ui/jquery-ui.min.js').then(function () {
                        return $ocLazyLoad.load(['public/vendors/bower_components/jQRangeSlider/jQAllRangeSliders-withRuler-min.js',
                            'public/vendors/bower_components/jQRangeSlider/css/classic-min.css',
                            'apps/src/account/orders/ordersController.js']);
                    });
                }]
            }
        })
        .state('page.account.favorites', {
            url: '/favorites',
            templateUrl: 'apps/src/account/favorites/favorites.html',
            controller: 'FavoritesCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/favorites/favoritesController.js']);
                }]
            }
        })
        .state('page.account.messages', {
            url: '/messages/:message_type',
            templateUrl: 'apps/src/account/messages/messages.html',
            controller: 'MessagesCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/messages/messagesController.js']);
                }]
            }
        })
        .state('page.account.messageDetail', {
            url: '/messageDetail/:message_type/:message_id',
            templateUrl: 'apps/src/account/messages/messageDetail.html',
            controller: 'MessageDetailCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/messages/messageDetailController.js']);
                }]
            }
        })
        .state('page.account.security', {
            abstract: true,
            url: '/security',
            templateUrl: 'apps/src/account/security/main.html'
        })
        .state('page.account.security.start', {
            url: '/start',
            templateUrl: 'apps/src/account/security/start.html',
            controller: 'SecurityCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/securityController.js']);
                }]
            }
        })
        .state('page.account.security.emailcertify', {
            url: '/emailcertify',
            templateUrl: 'apps/src/account/security/emailcertify/emailCertify.html',
            controller: 'EmailCertifyCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/emailcertify/controller.js']);
                }]
            }
        })
        .state('page.emailCertifyConfirm', {
            url: '/emailCertifyConfirm/:safe_user_id/:safe_user_name/:safe_random_code/:session_id',
            templateUrl: 'apps/src/account/security/emailcertify/result.html',
            controller: 'EmailCertifyResultCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/emailcertify/resultController.js']);
                }]
            },
            ncyBreadcrumb: {
                label: '邮箱验证',
                parent: 'page.index'
            }
        })
        .state('page.account.security.pwupdate', {
            url: '/pwupdate',
            abstract: true,
            templateUrl: 'apps/src/account/security/pwupdate/main.html'
        })
        .state('page.account.security.pwupdate.input', {
            url: '/input',
            templateUrl: 'apps/src/account/security/pwupdate/input.html',
            controller: 'PasswordUpdateCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/pwupdate/controller.js']);
                }]
            }
        })
        .state('page.account.security.pwupdate.success', {
            url: '/success',
            templateUrl: 'apps/src/account/security/pwupdate/success.html',
            controller: 'PasswordUpdateCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/pwupdate/controller.js']);
                }]
            }
        })
        .state('page.account.security.phoneupdate', {
            url: '/phoneupdate',
            templateUrl: 'apps/src/account/security/phoneupdate/phoneUpdate.html',
            controller: 'PhoneUpdateCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/security/phoneupdate/controller.js']);
                }]
            }
        })
        .state('page.account.mybank', {
            url: '/success',
            templateUrl: 'apps/src/account/mybank/mybank.html',
            controller: 'MybankCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/mybank/mybankController.js']);
                }]
            }
        })
        .state('page.account.transfer', {
            url: '/transfer/:transfer_type',
            templateUrl: 'apps/src/account/transfer/transfer.html',
            controller: 'TransferCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(['apps/src/account/transfer/transferController.js']);
                }]
            }
        })
        .state('page.account.stockRiskTest', {
            url: '/stockRiskTest/:businessId',
            templateUrl: 'apps/src/account/stockRiskTest/stockRiskTest.html',
            controller: 'stockRiskTestCtrl',
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([ 'apps/src/account/stockRiskTest/stockRiskTestController.js' ]);
                }]
            },
            ncyBreadcrumb: {
                label: '证券风险测评'
            }
        })
}]);

module.exports = account;