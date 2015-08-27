'use strict';

angular.module('ASS.account').controller('ProductRedeemCtrl', ['$scope', '$rootScope', '$window', '$state', '$stateParams', 'myAlert', 'accountService',
    function ($scope, $rootScope, $window, $state, $stateParams, myAlert, accountService) {
        if (!$window.sessionStorage.sessionid) {
            $state.go('auth.login');
            return;
        }

        $rootScope.global.myAccountMenu = '我的产品';
        $scope.trd_qty = 0;

        $scope.type = $stateParams.type;

        accountService.getMyProducts({
            lvl2_type: $stateParams.type,
            inst_id: $stateParams.id
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.prd = data[0][0];
            }
        });

        $scope.redeemPrd = function (product) {
            if (!product) return;
            if (isNaN(product.trd_qty)) {
                myAlert('请输入正确的赎回份额');
                return;
            } else if (product.trd_qty > 0) {
                accountService.redeemMyProduct({
                    pro_sou: $scope.type == 'gtsc' ? '2' : '1',
                    inst_id: $scope.type == 'gtsc' ? product.INST_ID : product.OFCODE,
                    trd_qty: product.trd_qty,
                    charge_cls: $scope.type == 'gtsc' ? '' : product.SHARECLASS,
                    ta_code: product.TA_CODE,
                    trans_acct: product.TRANS_ACCT
                }).then(function (data) {
                    if (data && data[2] && '0' == data[2].ANS_MSG_HDR.MSG_CODE) {
                        $scope.returnToMyProducts($scope.type);
                        myAlert('赎回成功');
                    }
                });
            }
        };

        $scope.returnToMyProducts = function (whichTab) {
            $state.go('page.account.products', {'type': whichTab});
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
