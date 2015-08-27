'use strict';
/*
 1008	查询账户资金
 1009	查询账户持仓
 1010	查询对账单
 1011	查询交割单
 */
angular.module('ASS.accountInfo').controller('accountInfoCtrl', ['$scope', '$stateParams', '$localStorage', 'myAlert', 'kibhAccount', 'kibhSystem', function ($scope, $stateParams, $localStorage, myAlert, kibhAccount, kibhSystem) {
    var businessId = $localStorage.menubiz ? $localStorage.menubiz[$stateParams.businessId] : "", bizsinfo = businessId ? businessId.split(",") : [];

    var getDictInfo = function (codelist) {
        if (codelist && codelist.length > 0) {
            var code = codelist.shift();
            kibhSystem.getDictInfo({
                DICT_CODE: code
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope[code.toLowerCase().replace(/_/g, "")] = data[0];
                }
                getDictInfo(codelist);
            });
        }
    };

    var getDataTable = function () {
        $scope.subtip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>查询中...';
        $scope.submitting = true;
        kibhAccount.getCheckSheet({
            BUSINESS_ID: "1010",
            STR_DATE: $scope.begindate.format("yyyyMMdd"),
            END_DATE: $scope.enddate.format("yyyyMMdd")
        }).then(function (data) {
            if (data && data[2] && data[2].ANS_MSG_HDR) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.checkSheet = data[0];
                    kibhAccount.getDeliveryOrder({
                        BUSINESS_ID: "1011",
                        STR_DATE: $scope.begindate.format("yyyyMMdd"),
                        END_DATE: $scope.enddate.format("yyyyMMdd")
                    }).then(function (data) {
                        if (data && data[2] && data[2].ANS_MSG_HDR) {
                            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                $scope.deliveryOrder = data[0];
                            }
                            $scope.subtip = "查询";
                            $scope.submitting = false;
                        }
                    });
                } else {
                	$scope.subtip = "查询";
                    $scope.submitting = false;
                }
            }
        });
    };

    $scope.assetInfo = {};
    $scope.stockInfo = [];
    $scope.deliveryOrder = [];
    $scope.checkSheet = [];
    $scope.begindate = new Date();
    $scope.enddate = new Date();
    $scope.subtip = "查询";

    $scope.beginDate = {
        opened: false,
        datepickerMode: "day",
        open: function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.beginDate.opened = true;
            $scope.endDate.opened = false;
        }
    };

    $scope.endDate = {
        opened: false,
        datepickerMode: "day",
        open: function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.endDate.opened = true;
            $scope.beginDate.opened = false;
        }
    };

    $scope.search = function () {
    	getDataTable();
    };

    kibhSystem.getBusiLogNo("1008").then(function (data) {
    	getDictInfo(["CURRENCY"]);//getDictInfo(["CURRENCY", "TRAD_FLAG"]);
    	kibhAccount.getAssetInfo({
            BUSINESS_ID: "1008"
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                angular.forEach(data[0], function (d) {
                    if (d.FUNDSEQ == "0") {
                        $scope.assetInfo = d;
                    }
                });
                kibhAccount.getStockInfo({
                    BUSINESS_ID: "1009"
                }).then(function (data) {
                    if (data && data[0] && data[0][0]) {
                        $scope.stockInfo = data[0];
                        /*kibhAccount.getCheckSheet({
                            BUSINESS_ID: "1010",
                            STR_DATE: $scope.begindate.format("yyyyMMdd"),
                            END_DATE: $scope.enddate.format("yyyyMMdd")
                        }).then(function (data) {
                            if (data && data[0] && data[0][0]) {
                                $scope.checkSheet = data[0];
                                kibhAccount.getDeliveryOrder({
                                    BUSINESS_ID: "1011",
                                    STR_DATE: $scope.begindate.format("yyyyMMdd"),
                                    END_DATE: $scope.enddate.format("yyyyMMdd")
                                }).then(function (data) {
                                    if (data && data[0] && data[0][0]) {
                                        $scope.deliveryOrder = data[0];
                                    }
                                });
                            }
                        });*/
                    }
                });
            }
        });
    });
}]);