'use strict';

angular.module('ASS.modifyMoneyPwd').controller('modifyMoneyPwdCtrl', ['$scope', '$state', '$stateParams', '$localStorage', 'kibhSystem', 'kibhAccount', 'myConfirm', function ($scope, $state, $stateParams, $localStorage, kibhSystem, kibhAccount, myConfirm) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
    $scope.npwd = null;
    $scope.opwd = null;
    $scope.subtip = '确定修改';
    $scope.code = "";
    $scope.fundpwd = "";

    kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
        $scope.busilogno = data[0][0].BUSI_LOG_NO;
    });

    $scope.subForm = function () {
        myConfirm('确定要修改资金密码吗？', function () {
            $scope.subtip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>修改中...';
            $scope.submitting = true;
            kibhAccount.modifyMoneyPwd({
                BUSINESS_ID: $scope.bizid,
                BUSI_LOG_NO: $scope.busilogno,
                NEW_PWD: $scope.npwd,
                OLD_PWD: $scope.opwd
            }).then(function (data) {
                $scope.subtip = '确定修改';
                $scope.submitting = false;
                if (data[0] != null) {
                    $scope.step = 1;
                }

                kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
                    $scope.busilogno = data[0][0].BUSI_LOG_NO;
                });
            });
        });
    };

    // 兼容IE
    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 9) {
            $('input, textarea').placeholder();
        }
    });
}]);