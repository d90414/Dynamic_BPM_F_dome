'use strict';

module.exports = angular.module('ASS.directive.favoriteLabel', [])
    .directive('favoriteLabel', ['$rootScope', '$state', '$window', 'accountService', 'myConfirm', 'prdCommonService', function ($rootScope, $state, $window, accountService, myConfirm, prdCommonService) {
        return {
            restrict: "A",
            scope: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/favoriteLabel.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.addToMyFavorite = function (products, index) {
                    if (!$window.sessionStorage.sessionid) {
                        myConfirm('现在登录吗？', function () {
                            $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink ? $state.current.ncyBreadcrumbLink : $state.current.name;
                            $state.go('auth.login');
                        }, '', '您需要登录后才能收藏产品', '登录');
                    } else {
                        accountService.getLoginUserInfo().then(function (data) {
                            if (data && data[0] && data[0][0]) {
                                $rootScope.global.account = data[0][0];
                                if (!$rootScope.global.account.USER_ID) {
                                    myConfirm('现在去绑定注册户吗？', function () {
                                        $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink ? $state.current.ncyBreadcrumbLink : $state.current.name;
                                        $state.go('auth.bindregaccount');
                                    }, '', '您需要绑定注册户后才能收藏产品', '立即绑定', '暂不绑定');
                                } else {
                                    accountService.addMyFavorite({
                                        pro_id: products[index].PRO_ID,
                                        lvl2_type: products[index].LVL2_TYPE
                                    }).then(function (data) {
                                        if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                            products[index].isFavorite = true;

                                            // 收藏操作要更新当前页所有产品的收藏状态
                                            if ('kfps.index' == $state.current.name) {
                                                var sibling = $scope.morePrds == 'jxcp' ? $scope.xpPrds : $scope.jxPrds;
                                                for (var i = 0; i < sibling.length; i++) {
                                                    if (sibling[i].PRO_ID == products[index].PRO_ID) {
                                                        sibling[i].isFavorite = true;
                                                    }
                                                }
                                            }
                                            prdCommonService.addToSessionFavorites(products[index]);
                                        }
                                    });
                                }
                            }
                        });
                    }
                };

                $scope.deleteMyFavorites = function (products, index) {
                    myConfirm('确定取消收藏该产品吗？', function () {
                        accountService.deleteMyFavorites({
                            pro_id: products[index].PRO_ID
                        }).then(function (data) {
                            if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                products[index].isFavorite = false;

                                if ('kfps.index' == $state.current.name) {
                                    var sibling = $scope.morePrds == 'jxcp' ? $scope.xpPrds : $scope.jxPrds;
                                    for (var i = 0; i < sibling.length; i++) {
                                        if (sibling[i].PRO_ID == products[index].PRO_ID) {
                                            sibling[i].isFavorite = false;
                                        }
                                    }
                                }
                                prdCommonService.removeFromSessionFavorites(products[index]);
                            }
                        });
                    });
                };

            }
        };
    }]);
