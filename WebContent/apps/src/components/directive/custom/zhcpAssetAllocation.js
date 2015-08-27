'use strict';

module.exports = angular.module('ASS.directive.zhcpAssetAllocation', [])
    .directive('zhcpAssetAllocation', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zhcpAssetAllocation.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.$watch("pagination.currentpage", function () {
                    if ($scope.pagination.currentpage <= 0) return;
                    search();
                });

                var search = function () {
                    detailService.getZhcpAssetAllocation({
                        pack_pro_id: attrs.proid,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize
                    }).then(function (data) {
                        $scope.zhcpAssetAllocation = data[0] || [];
                        $scope.pagination.totalcount = data[1];
                    })
                };

            }
        }
    }]);
