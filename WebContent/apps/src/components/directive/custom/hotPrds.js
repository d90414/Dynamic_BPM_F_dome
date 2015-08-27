'use strict';

module.exports = angular.module('ASS.directive.hotPrds', [])
    .directive('hotPrds', ['$rootScope', '$state', '$interval', '$window', 'exclusiveService', 'accountService', 'myAlert', 'myConfirm', 'prdCommonService',
        function ($rootScope, $state, $interval, $window, exclusiveService, accountService, myAlert, myConfirm, prdCommonService) {
            return {
                restrict: "EAC",
                replace: true,
                scope: {},
                templateUrl: 'apps/src/blocks/directivetpl/kfps/hotprds.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];

                    $scope.morePrds = 'xpzq';
                    $scope.toggleUrlOfMore = function (whichUrl) {
                        $scope.morePrds = whichUrl;
                        $scope.prds = 'jxcp' == whichUrl ? $scope.jxPrds : $scope.xpPrds;
                    };

                    exclusiveService.getPrds({
                        pref_type: "1",
                        cur_page: 1,
                        ret_rows: 4,
                        order_by: "ORDER_BY"
                    }).then(function (data) {
                        $scope.jxPrds = data[0];
                        for (var i = 0; i < $scope.jxPrds.length; i++) {
                            $scope.jxPrds[i].canBuy = prdCommonService.checkIfCanBuy($scope.jxPrds[i]);
                            $scope.jxPrds[i].isFavorite = prdCommonService.isMyFavorite($scope.jxPrds[i]);
                        }
                    });

                    exclusiveService.getPrds({
                        pref_type: "4",
                        cur_page: 1,
                        ret_rows: 4,
                        order_by: "ORDER_BY"
                    }).then(function (data) {
                        $scope.xpPrds = data[0];
                        for (var i = 0; i < $scope.xpPrds.length; i++) {
                            $scope.xpPrds[i].canBuy = prdCommonService.checkIfCanBuy($scope.xpPrds[i]);
                            $scope.xpPrds[i].isFavorite = prdCommonService.isMyFavorite($scope.xpPrds[i]);
                        }

                        $scope.prds = $scope.xpPrds;
                    });

                }
            }
        }]);