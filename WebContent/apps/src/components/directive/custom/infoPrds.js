'use strict';

module.exports = angular.module('ASS.directive.infoPrds', [])
    .directive('infoPrds', ['$rootScope', '$state', '$window', 'exclusiveService', 'accountService', 'myAlert', 'myConfirm', 'prdCommonService',
        function ($rootScope, $state, $window, exclusiveService, accountService, myAlert, myConfirm, prdCommonService) {
            return {
                restrict: 'EAC',
                replace: true,
                scope: {},
                templateUrl: 'apps/src/blocks/directivetpl/kfps/infoprds.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    exclusiveService.getPrds({
                        pref_type: '5',
                        cur_page: 1,
                        ret_rows: 12
                    }).then(function (data) {
                        if (data && data[0]) {
                            for (var i = 0; i < data[0].length; i++) {
                                data[0][i].isFavorite = prdCommonService.isMyFavorite(data[0][i]);
                            }
                            $scope.prds = [data[0].slice(0, 4), data[0].slice(4, 8), data[0].slice(8, 13)];
                        }
                    });

                    $scope.addToMyFavorite = function (products, index) {
                        if ($window.sessionStorage.sessionid) {
                            accountService.addMyFavorite({
                                pro_id: products[index].PRO_ID,
                                lvl2_type: products[index].LVL2_TYPE
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    products[index].isFavorite = true;
                                    prdCommonService.addToSessionFavorites(products[index]);
                                }
                            });
                        } else {
                            myConfirm('现在登录吗？', function () {
                                $rootScope.beforeLoginUrl = $state.current.name;
                                $state.go('auth.login');
                            }, '', '您需要登录后才能收藏产品', '登录');
                        }
                    };

                    $scope.deleteMyFavorites = function (products, index) {
                        myConfirm('确定取消收藏该产品吗？', function () {
                            accountService.deleteMyFavorites({
                                pro_id: products[index].PRO_ID
                            }).then(function (data) {
                                if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                                    products[index].isFavorite = false;
                                    prdCommonService.removeFromSessionFavorites(products[index]);
                                }
                            });
                        });
                    };

                }
            }
        }]);
