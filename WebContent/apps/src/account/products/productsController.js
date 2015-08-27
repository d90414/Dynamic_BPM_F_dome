'use strict';


angular.module('ASS.account').controller('ProductsCtrl', ['$scope', 'myAlert', '$rootScope', '$window', '$state', '$stateParams', '$modal', '$localStorage', 'myConfirm', 'accountService',
    function ($scope, myAlert, $rootScope, $window, $state, $stateParams, $modal, $localStorage, myConfirm, accountService) {

        if (!$window.sessionStorage.sessionid) {
            $state.go('auth.login');
            return;
        }

        $rootScope.global.myAccountMenu = '我的产品';

        $scope.prds = {
            '486': {
                lvl2_type: '486',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                hasRefreshed: false
            },
            '4': {
                lvl2_type: '4',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                hasRefreshed: false
            },
            '6': {
                lvl2_type: '6',
                list: [],
                totalCount: 0,
                checkedCount: 0,
                allChecked: false,
                hasRefreshed: false
            }
        };

        $scope.pagination = {
            pagesize: 10,
            totalcount: -1,
            currentpage: 1
        };

        $scope.$watch('pagination.currentpage', function () {
            if (!$scope.prds[$scope.showTab].hasRefreshed) {
                $scope.refresh();
            } else {
                $scope.getProductsByPageNum();
            }
        });

        $scope.showTab = $stateParams.type ? $stateParams.type : '486';
        $scope.activeTab = {
            '486': false,
            '4': false,
            '6': false
        };
        $scope.activeTab[$scope.showTab] = true;
        $scope.changeTab = function (whichTab) {
            $scope.showTab = whichTab;
            for (var item in $scope.activeTab) {
                item = false;
            }
            $scope.activeTab[$scope.showTab] = true;

            if (!$scope.prds[$scope.showTab].hasRefreshed) {
                $scope.refresh();
            } else {
                $scope.getProductsByPageNum();
            }
        };

        $scope.showType = '1';
        $scope.refresh = function () {
            $scope.isLoading = true;
            $scope.currentPageProducts = [];
            accountService.getLoginUserInfo().then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.global.account = data[0][0];
                    if (!$scope.global.account.PHONE_NO) {
                        $scope.showType = '-01';
                        $scope.isLoading = false;
                        return;
                    } else if (!$scope.global.account.FUNDSACCT_CODE_VIEW) {
                        $scope.showType = '-02';
                        $scope.isLoading = false;
                        return;
                    } else if ('3' != $scope.global.account.LOGIN_TYPE) {
                        $localStorage.loginByFund = true;
                        $scope.showType = '-03';
                        $scope.isLoading = false;
                        return;
                    } else {
                        $scope.showType = '1';
                        $scope.currentPageProducts = [];
                        $scope.pagination.totalcount = 0;

                        $scope.prds[$scope.showTab].hasRefreshed = true;
                        accountService.getMyProducts({
                            lvl2_type: $scope.prds[$scope.showTab].lvl2_type
                        }).then(function (data) {
                            $scope.isLoading = false;
                            if (data[0]) {
                                $scope.prds[$scope.showTab].list = data[0];
                                for (var i = 0; i < data[0].length; i++) {
                                    $scope.prds[$scope.showTab].list[i]['is_redeem'] = '1';
                                }
                                $scope.prds[$scope.showTab].totalCount = data[0].length;
                                $scope.prds[$scope.showTab].checkedCount = 0;
                                $scope.prds[$scope.showTab].allChecked = false;
                                //$scope.prds[$scope.showTab].hasRefreshed = true;

                                $scope.pagination.totalcount = data[0].length;
                                $scope.currentPageProducts = data[0].slice(0, $scope.pagination.pagesize);
                            } else {
                                $scope.pagination.totalcount = 0;
                            }
                        });
                    }
                }
            });
        };

        $scope.currentPageProducts = [];
        $scope.getProductsByPageNum = function () {
            $scope.currentPageProducts = [];
            var products = $scope.prds[$scope.showTab].list || [];
            $scope.pagination.totalcount = products.length;
            var start = ($scope.pagination.currentpage - 1) * $scope.pagination.pagesize;
            var end = $scope.pagination.currentpage * $scope.pagination.pagesize;
            $scope.currentPageProducts = products.slice(start, end);
        };

        $scope.countQty = function (qty1, qty2) {
            var total = 0;
            try {
                total = parseFloat(qty1) + parseFloat(qty2);
            } catch (e) {
                total = 0;
            }
            return total;
        };

        $scope.$watch('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $scope.isIE = true;
                }
                $('input, textarea').placeholder();
            }
        });


    }]);
