'use strict';

module.exports = angular.module('ASS.directive.recmPrds', [])
    .directive('recmPrds', ['$rootScope', '$state', '$window', 'prdlistService', 'accountService', 'myAlert', 'myConfirm', 'prdCommonService',
        function ($rootScope, $state, $window, prdlistService, accountService, myAlert, myConfirm, prdCommonService) {
            return {
                restrict: "EAC",
                replace: true,
                scope: {},
                templateUrl: 'apps/src/blocks/directivetpl/kfps/recmprds.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    $scope.cols = 4;
                    if ($state.current.name.indexOf('page.account') != -1) {
                        $scope.cols = 3;
                    }

                    $scope.n = 1;
                    var totalcount = 0;

                    $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];
                    $scope.refresh = function () {
                        if (totalcount > 0 && $scope.n < Math.ceil(totalcount / $scope.cols)) {
                            $scope.n++;
                        } else {
                            $scope.n = 1;
                        }
                    };

                    $scope.$watch("n", function () {
                        prdlistService["getrecmPrds"]({
                            cur_page: $scope.n,
                            ret_rows: $scope.cols
                        }).then(function (data) {
                            $scope.prds = data[0];
                            for (var i = 0; i < $scope.prds.length; i++) {
                                $scope.prds[i].canBuy = prdCommonService.checkIfCanBuy($scope.prds[i]);
                                $scope.prds[i].isFavorite = prdCommonService.isMyFavorite($scope.prds[i]);
                            }
                            totalcount = data[1];
                        });
                        if (totalcount < $scope.cols) {
                            $scope.n = 1;
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
                                $rootScope.beforeLoginUrl = $state.current.ncyBreadcrumbLink;
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