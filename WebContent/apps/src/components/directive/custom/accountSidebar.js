'use strict';

module.exports = angular.module('ASS.directive.accountSidebar', [])
    .directive('accountSidebar', ['$state', function ($state) {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/accountSidebar.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.sideLinks = [{
                    name: '个人资料',
                    url: 'page.account.info',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png)"
                    }
                }, {
                    name: '我的账户',
                    url: 'page.account.myaccount',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -154px"
                    }
                }, {
                    name: '我的产品',
                    url: 'page.account.products',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -110px"
                    }
                }, {
                    name: '银证转账',
                    url: 'page.account.transfer',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -176px"
                    }
                }, {
                    name: '我的订单',
                    url: 'page.account.orders',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -22px"
                    }
                }, {
                    name: '我的收藏',
                    url: 'page.account.favorites',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -44px"
                    }
                }, {
                    name: '我的消息',
                    url: 'page.account.messages',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -66px"
                    }
                }, {
                    name: '安全设置',
                    url: 'page.account.security.start',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -88px"
                    }
                }, {
                    name: '风险测评',
                    url: 'page.account.stockRiskTest({businessId: 106007})',
                    iconUrl: {
                        width: "22px",
                        height: "22px",
                        background: "url(public/images/myaccount-icons2.png) 0 -198px"
                    }
                }];

                $scope.$state = $state;

                $scope.isActive = function (url) {
                    var classValue = false;
                    if (url == $state.current.name ||
                        (url == 'page.account.security.start' && $state.current.name.indexOf('page.account.security.') != -1) ||
                        (url == 'page.account.messages' && $state.current.name.indexOf('page.account.message') != -1) ||
                        (url == 'page.account.products' && $state.current.name.indexOf('page.account.product') != -1) ||
                        (url == 'page.account.info' && $state.current.name.indexOf('page.account.info') != -1) ||
                        (url == 'page.account.stockRiskTest({businessId: 106007})' && $state.current.name.indexOf('page.account.stockRiskTest') != -1)) {
                        classValue = true;
                    }
                    return classValue;
                };

                $scope.checkIfRefresh = function (url) {
                    if (url == $state.current.name) {
                        $state.reload();
                    }
                };
            }
        };
    }]);
