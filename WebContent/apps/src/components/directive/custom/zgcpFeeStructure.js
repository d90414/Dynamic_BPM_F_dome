'use strict';

module.exports = angular.module('ASS.directive.zgcpFeeStructure', [])
    .directive('zgcpFeeStructure', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            templateUrl: 'apps/src/blocks/directivetpl/kfps/zgcpFeeStructure.html',
            scope: true,
            link: function ($scope, $element, attrs, model) {
                $scope.fees = {
                    '1241': [], // 管理费
                    '1251': [], // 托管费
                    '1271': [], // 参与费用
                    '1273': []  // 退出费用
                };

                if ($scope[$scope.type + 'Tabs'].fee.active && !$scope[$scope.type + 'Tabs'].fee.refreshed) {
                    detailService.getRateStructure({
                        pro_id: attrs.proid,
                        fee_type: "",
                        fee_mode: "",
                        ext_con: "",
                        cur_page: -1,
                        ret_rows: "",
                        order_by: ""
                    }).then(function (data) {
                        if (data[0]) {
                            angular.forEach(data[0], function (item) {
                                if ($scope.fees[item.FEE_TYPE]) {
                                    $scope.fees[item.FEE_TYPE].push(item);
                                }
                            });

                            $scope[$scope.type + 'Tabs'].fee.refreshed = true;
                        }
                    });
                }

            }
        }
    }]);
