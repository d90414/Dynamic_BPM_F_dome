'use strict';

angular.module('ASS.account').controller('MybankCtrl', ['$rootScope', '$scope', '$window', '$state', 'accountService', 'myAlert',
    '$timeout', '$localStorage', 'myConfirm',
    function ($rootScope, $scope, $window, $state, accountService, myAlert, $timeout, myConfirm) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }
        $scope.enter = 2;
        $scope.banklist = [];
        $scope.bindbanklist = [];
        $scope.bind = [];
        $scope.rebind = [];
        $scope.showtype = 0;
        $scope.getBankList = function () {
            $scope.enter = 2;
            accountService.getBankList().then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.bindbanklist = data[0];
                } else {
                    $state.go("auth.login");
                    return;
                }
            });
        }
        $scope.getBankList();

        $scope.toAddBank = function () {
            $scope.banklist[0] = {bank_no: '01000000', bank_name: '邮政储蓄'};
            $scope.banklist[1] = {bank_no: '01020000', bank_name: '工商银行'};
            $scope.banklist[2] = {bank_no: '01030000', bank_name: '农业银行'};
            $scope.banklist[3] = {bank_no: '01040000', bank_name: '中国银行'};
            $scope.banklist[4] = {bank_no: '01050000', bank_name: '建设银行'};
            $scope.banklist[5] = {bank_no: '03010000', bank_name: '交通银行'};
            $scope.banklist[6] = {bank_no: '03020000', bank_name: '中信银行'};
            $scope.banklist[7] = {bank_no: '03030000', bank_name: '广大银行'};
            $scope.banklist[8] = {bank_no: '03040000', bank_name: '华夏银行'};
            $scope.banklist[9] = {bank_no: '03050000', bank_name: '民生银行'};
            $scope.banklist[10] = {bank_no: '03060000', bank_name: '广发银行'};
            $scope.banklist[11] = {bank_no: '03080000', bank_name: '招商银行'};
            $scope.banklist[12] = {bank_no: '03090000', bank_name: '兴业银行'};
            $scope.banklist[13] = {bank_no: '03100000', bank_name: '浦发银行'};
            $scope.banklist[14] = {bank_no: '04012900', bank_name: '上海银行'};
            $scope.banklist[15] = {bank_no: '04031000', bank_name: '北京银行'};
            $scope.banklist[16] = {bank_no: '04105840', bank_name: '平安银行'};
            $scope.banklist[17] = {bank_no: '04123330', bank_name: '温州银行'};
            $scope.banklist[18] = {bank_no: '04145210', bank_name: '汉口银行'};
            $scope.banklist[19] = {bank_no: '04202220', bank_name: '大连银行'};
            $scope.banklist[20] = {bank_no: '04416530', bank_name: '重庆银行'};
            $scope.banklist[21] = {bank_no: '14136530', bank_name: '重庆农商行'};

            $scope.enter = 1;
            $scope.showtype = 1;
        };
        $scope.todelBank = function (bank) {
            $scope.enter = 3;
            $scope.showtype = 1;
        };
        //绑定新银行卡
        $scope.addBank = function () {
            accountService.addBank($scope.bind).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.bind = [];
                    $scope.showtype = 3;
                } else {
                    $scope.showtype = 4;
                    return;
                }
            });
        };
        //解除绑定银行卡
        $scope.delBindBank = function () {
            accountService.delBank($scope.rebind).then(function (data) {
                if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                    $scope.rebind = [];
                    $scope.showtype = 3;
                } else {
                    $scope.showtype = 4;
                    return;
                }
            });
        };

        $scope.deleteBank = function () {
            $scope.flag = true;
            $scope.enter = 1;
        };

        $scope.subForm = function (bankaccount) {
            var isSuccess = true;
            myConfirm("您确定要删除存管银行吗？", function () {
                if (isSuccess) {
                    $scope.step = 3;
                } else {
                    $scope.flag = false;
                    $scope.step = 4;
                }
            });
        }
    }]);
