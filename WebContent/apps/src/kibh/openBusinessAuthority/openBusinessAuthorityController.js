'use strict';

angular.module('ASS.openBusinessAuthority').controller('openBusinessAuthorityCtrl', ['$rootScope', '$scope', '$state', '$stateParams', '$localStorage', 'kibhFile', 'kibhAccount', 'kibhSystem', 'myConfirm', function ($rootScope, $scope, $state, $stateParams, $localStorage, kibhFile, kibhAccount, kibhSystem, myConfirm) {
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
    var businessId = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "";
    if (businessId) {
        var bizsinfo = [], bizs = businessId.split(",");
        for (var i = 0; i < bizs.length; i++) {
            bizsinfo.push($localStorage.bizsconfig[bizs[i]]);
        }
        $scope.bizsinfo = bizsinfo;
    }
    
    var accountmap = {}, getBlkName = function (STKBD) {
        var blkname = "";
        for (var i = 0; i < $scope.stkbd.length; i++) {
            if (STKBD == $scope.stkbd[i].DICT_ITEM) {
                blkname = $scope.stkbd[i].DICT_ITEM_NAME;
                break;
            }
        }
        return blkname;
    };

    $scope.myHeight = {height: $rootScope.protocolHeight};

    $scope.open = function (bizid, bizname) {
        $scope.bizid = bizid;
        $scope.bizname = bizname;
        kibhSystem.getProtocolInfo({
            BUSINESS_ID: bizid
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.agreement = [];
                $scope.agreementid = [];
                angular.forEach(data[0], function (d) {
                    $scope.agreement.push({agreement_name: d.AGREEMENT_NAME, agreement_url: kibhFile + d.AGREEMENT_URL});
                    $scope.agreementid.push(d.AGREEMENT_ID);
                });
                $scope.title = bizname + "协议签署";
                $scope.step = 1;
            } else {
                $scope.submit();
            }
        });
    };

    $scope.submit = function () {
        myConfirm('您的申请是否提交？', function () {
            if ($scope.agreementid) {
            	kibhSystem.saveProtocolSign({
                    BUSINESS_ID: $scope.bizid,
                    AGREEMENT_ID: $scope.agreementid.join(","),
                    SIGN_TYPE: "0",
                    SIGN_REMARK: "客户同意"
                }).then(function (data) {
                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
                            	kibhAccount.openRights({
                                    BUSINESS_ID: $scope.bizid,
                                    OPERATION_TYPE: "0",
                                    STKBD: accountmap[$scope.actno],
                                    TRDACCT: $scope.actno,
                                    CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                                    BUSI_LOG_NO: data[0][0].BUSI_LOG_NO
                                }).then(function (data) {
                                    if (data && data[0]) $scope.step = 2;
                                });
                            });
                        }
                    }
                });
            } else {
            	kibhSystem.getBusiLogNo($scope.bizid).then(function (data) {
            		kibhAccount.openRights({
                        BUSINESS_ID: $scope.bizid,
                        OPERATION_TYPE: "0",
                        STKBD: accountmap[$scope.actno],
                        TRDACCT: $scope.actno,
                        CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                        BUSI_LOG_NO: data[0][0].BUSI_LOG_NO
                    }).then(function (data) {
                        if (data && data[0]) $scope.step = 2;
                    });
                });
            }
        });
    };

    $scope.cancel = function (bizid, bizname) {
        $scope.bizname = bizname;
        myConfirm("您确定要取消" + $scope.bizname + "业务吗？", function () {
            kibhSystem.getBusiLogNo(bizid).then(function (data) {
            	kibhAccount.openRights({
                    BUSINESS_ID: bizid,
                    OPERATION_TYPE: "2",
                    STKBD: accountmap[$scope.actno],
                    TRDACCT: $scope.actno,
                    CUACCT_CODE: $scope.user.FUNDSACCT_CODE,
                    BUSI_LOG_NO: data[0][0].BUSI_LOG_NO
                }).then(function (data) {
                    if (data && data[0]) $scope.step = 3;
                });
            });
        });
    };
    
    kibhSystem.getUserBizs().then(function (data) {
        if (data && data[0]) {
        	var userbizs = {};
            angular.forEach(data[0], function (d) {
            	userbizs[d.BUSINESS_ID] = d.STATUS;
            });
            $scope.userbizs = userbizs;
            kibhSystem.getLogUserInfo().then(function(data) {
            	$scope.user = data[0][0];
            	kibhSystem.getDictInfo({
                    DICT_CODE: "STKBD"
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $scope.stkbd = data[0];
                    }
                    kibhAccount.getStockAccount().then(function (data) {
                        $scope.accountlist = [];
                        if (data && data[0]) {
                            angular.forEach(data[0], function (d) {
                                if (d.STKBD == "10" || d.STKBD == "00") {
                                    accountmap[d.TRDACCT] = d.STKBD;
                                    d.STKBDNAME = getBlkName(d.STKBD) + " " + d.TRDACCT;
                                    $scope.accountlist.push(d);
                                }
                            });
                            $scope.actno = $scope.accountlist[0].TRDACCT;
                        }
                    });
                });
        	});
        }
    });

    // 兼容IE
    $scope.$on('$viewContentLoaded', function () {
        if ($.browser.msie && $.browser.version <= 8) {
            $scope.isIE8 = true;
        }
    });
}]);