'use strict';

angular.module('ASS.accountFrozen').controller('accountFrozenCtrl', ['$scope', '$state', '$stateParams', '$localStorage', 'myConfirm', 'kibhSystem', 'kibhCustomer', function ($scope, $state, $stateParams, $localStorage, myConfirm, kibhSystem, kibhCustomer) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
    $scope.subtip = '立即冻结';
    $scope.code = "";
    $scope.fundpwd = "";

    kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
        $scope.busilogno = data[0][0].BUSI_LOG_NO;
        kibhSystem.getLogUserInfo().then(function(data) {
        	$scope.user = data[0][0];
        	kibhCustomer.getAssetStatus({
                BUSINESS_ID: $scope.bizid
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.assetStatus = data[0][0].CUACCT_STATUS;
                }
            });
		});
    });

    $scope.subForm = function () {
        myConfirm('确定要冻结账号吗？', function () {
            $scope.subtip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>冻结中...';
            $scope.submitting = true;
            kibhCustomer.setAssetStatus({
                BUSINESS_ID: $scope.bizid,
                CUACCT_STATUS: "1",
                BUSI_LOG_NO: $scope.busilogno
            }).then(function (data) {
                $scope.subtip = '立即冻结';
                $scope.submitting = false;
                if (data && data.length > 0 && data[2] && data[2].ANS_MSG_HDR) {
                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                        $scope.step = 1;
                    }
                }

                kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
                    $scope.busilogno = data[0][0].BUSI_LOG_NO;
                });
            });
        });
    };
}]);