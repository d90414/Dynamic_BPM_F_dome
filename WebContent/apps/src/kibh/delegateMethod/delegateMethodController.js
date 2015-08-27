'use strict';

angular.module('ASS.delegateMethod').controller('delegateMethodCtrl', ['$scope', '$modal', '$localStorage', '$stateParams', 'kibhSystem', 'kibhAccount', function ($scope, $modal, $localStorage, $stateParams, kibhSystem, kibhAccount) {
    $scope.bizid = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
    $scope.delegates = [];

    var userchannel = {};

    $scope.open = function (d) {
        userchannel[d.id] = 1;
        update(d, 1);
    }

    $scope.close = function (d) {
        userchannel[d.id] = -1;
        update(d, 0);
    }

    angular.forEach($localStorage.menulist.list, function(d, i) {
    	if(d.MENU_LEVEL == $stateParams.businessId) $scope.remark = d.MENU_REMARK;
    });
    
    var getdata = function () {
        kibhAccount.getUserAcctData({
            BUSINESS_ID: $scope.bizid
        }).then(function (data) {
            if (data[0] && data[0][0]) {
                angular.forEach(data[0][0].CHANNELS, function (c, i) {
                    userchannel[c] = 1;
                })

                kibhSystem.getDictInfo({
                    DICT_CODE: "CHANNEL"
                }).then(function (data) {
                    angular.forEach(data[0], function (d, i) {
                        $scope.delegates.push({id: d.DICT_ITEM, name: d.DICT_ITEM_NAME, status: userchannel[d.DICT_ITEM] ? 1 : 0, disabled: d.REMARK == "0"});
                    })
                });
            }
        });
    }

    var update = function (d, f) {
        var chls = [];
        angular.forEach(userchannel, function (c, i) {
            if (c == 1) chls.push(i)
        });

        kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
            var busilogno = data[0][0].BUSI_LOG_NO;
            var bizid = $scope.bizid;
            $modal.open({
                backdrop: "static",
                templateUrl: 'apps/src/kibh/delegateMethod/delegate.html',
                controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.step = 1;
                    $scope.biz = bizid;
                    $scope.busilogno = busilogno;
                    $scope.content = "确定要" + (f == 0 ? "关闭" : "开通") + d.name + "吗？";
                    $scope.code = "";
                    $scope.fundpwd = "";

                    $modalInstance.result.then(function () {
                        d.status = f;
                    });

                    $scope.ok = function () {
                        if ($scope.step == 1) {
                            $scope.step = 2;
                        } else {
                            kibhAccount.updateDelegateMethod({
                                BUSINESS_ID: bizid,
                                BUSI_LOG_NO: busilogno,
                                CHANNELS: chls.join("")
                            }).then(function (data) {
                                if (data && data[0]) $modalInstance.close();
                            });
                        }
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                } ]
            });
        });
    }

    kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
    	getdata();
    });
}]);
