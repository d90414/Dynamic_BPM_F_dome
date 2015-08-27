'use strict';

angular.module('ASS.prdlist').controller('prdlistCtrl', ['$rootScope', '$state', '$scope', '$stateParams', '$window', 'prdlistService', 'accountService', 'myAlert', 'myConfirm', 'prdCommonService',
    function ($rootScope, $state, $scope, $stateParams, $window, prdlistService, accountService, myAlert, myConfirm, prdCommonService) {
        $scope.showtype = 1;
        $scope.condition = {};
        $scope.type = $stateParams.type;
        $scope.tpl = "apps/src/prdlist/" + $stateParams.type + ".html";
        $scope.bgOfRiskLvl = ['bg-lvl0', 'bg-lvl1', 'bg-lvl2', 'bg-lvl3', 'bg-lvl4'];

        $scope.pagination = {
            pagesize: 12,
            totalcount: -1,
            currentpage: 1,
            totalpage: 0
        };

        $scope.settype = function (tp) {
            $scope.showtype = tp;
        };

        if ($scope.type == "gmjj") {
            $scope.zhcplist = {};
            prdlistService["getzhcpPrds"]('1').then(function (data) {
                $scope.zhcplist['jjx'] = data[0];
            });
            prdlistService["getzhcpPrds"]('2').then(function (data) {
                $scope.zhcplist['pwx'] = data[0];
            });
            prdlistService["getzhcpPrds"]('3').then(function (data) {
                $scope.zhcplist['fyx'] = data[0];
            });
        }

        $scope.asc = true;
        $scope.order_by = "";
        var search = function () {
            var params = angular.copy($scope.condition);
            params['cur_page'] = $scope.pagination.currentpage;
            params['ret_rows'] = $scope.pagination.pagesize;
            if ($scope.type == "result") params['pro_key'] = $stateParams.key; // 头部搜索
            if ($scope.order_by) params['order_by'] = $scope.order_by + ($scope.asc ? " asc" : " desc");

            prdlistService["get" + $stateParams.type + "Prds"](params).then(function (data) {
                if (data && data[0]) {
                    $scope.prds = data[0];
                    for (var i = 0; i < $scope.prds.length; i++) {
                        $scope.prds[i].canBuy = prdCommonService.checkIfCanBuy($scope.prds[i]);
                        $scope.prds[i].isFavorite = prdCommonService.isMyFavorite($scope.prds[i]);
                    }
                    if (data[1]) {
                        $scope.pagination.totalcount = data[1];
                        try {
                            $scope.pagination.totalpage = Math.ceil($scope.pagination.totalcount / $scope.pagination.pagesize);
                        } catch(e) {
                            $scope.pagination.totalpage = 0;
                        }
                    }
                } else {
                    $scope.prds = [];
                    $scope.pagination.totalcount = 0;
                    $scope.pagination.totalpage = 0;
                }
            });
        };

        $scope.orderby = function (ord) {
            $scope.asc = $scope.order_by == ord ? !$scope.asc : true;
            $scope.order_by = ord;
            if ($scope.pagination.currentpage == 1) {
                search();
            } else {
                $scope.pagination.currentpage = 1;
            }
        };

        $scope.$watch("condition", function () {
            if ($scope.pagination.totalcount == -1 && "gmjj" != $stateParams.type) return;
            if ("gmjj" == $stateParams.type && ($scope.condition.fund_pro_type === undefined || $scope.condition.regi_org === undefined)) return;
            $scope.pagination.currentpage = 1;
            search();
        }, true);

        $scope.$watch("pagination.currentpage", function () {
            if ("gmjj" == $stateParams.type && ($scope.condition.fund_pro_type === undefined || $scope.condition.regi_org === undefined)) {
                return;
            }
            search();
        });

    }]);
