'use strict';

module.exports = angular.module('ASS.directive.gmjjFeeStructure', [])
    .directive('gmjjFeeStructure', ['detailService', function (detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjFeeStructure.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {
                $scope.fees = {};
                detailService.getRateStructure({
                    pro_id: attrs.proid,
                    fee_type: "",
                    fee_mode: "",
                    ext_con: "",
                    cur_page: -1,
                    ret_rows: "",
                    order_by: "FEE_TYPE"
                }).then(function (data) {
                    if (data[0]) {
                        for (var i = 0; i < data[0].length; i++) {
                            if (!$scope.fees[data[0][i].FEE_TYPE]) $scope.fees[data[0][i].FEE_TYPE] = [];
                            $scope.fees[data[0][i].FEE_TYPE].push(data[0][i]);
                        }
                    }
                });

            }
        }
    }]);
