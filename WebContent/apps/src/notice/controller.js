'use strict';

angular.module('ASS.notice').controller('NoticeCtrl', ['$scope', 'adnotService',
    function ($scope, adnotService) {
        $scope.pagination = {
            pagesize: 5,
            totalcount: -1,
            currentpage: 1
        };

        $scope.noticeList = {};

        $scope.$watch("pagination.currentpage", function () {
            // 最新动态
            adnotService.getAdOrNote({
                type: 2,
                type_val: 2,
                stat: 1,
                cur_page: $scope.pagination.currentpage,
                ret_rows: $scope.pagination.pagesize,
                order_by: "OP_DATE desc"
            }).then(function (data) {
                $scope.noticeList = data[0];
                $scope.pagination.totalcount = data[1];
            });
        });

    }]);
