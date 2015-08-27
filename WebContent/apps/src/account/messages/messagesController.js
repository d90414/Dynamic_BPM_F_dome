'use strict';

angular.module('ASS.account').controller('MessagesCtrl', ['$rootScope', '$scope', '$window', '$stateParams', '$state', 'myAlert', 'myConfirm', 'accountService',
    function ($rootScope, $scope, $window, $stateParams, $state, myAlert, myConfirm, accountService) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }

        $rootScope.global.myAccountMenu = "我的消息";

        // tab初始化
        $scope.showTab = {
            myMsg: true,
            systemMsg: false
        };

        // tab切换
        var previousTab;
        $scope.changeTab = function (whichTab) {
            for (var i = 0; i < $scope.showTab.length; i++) {
                $scope.showTab[i] = false;
            }
            $scope.showTab[whichTab] = true;
            if (previousTab != whichTab) {
                $scope.pagination.currentpage = 1;
                $scope.refresh();
                previousTab = whichTab;
            }
        };

        // 初始化
        $scope.myMessages = [];
        $scope.myMessages.checkcount = 0;
        $scope.myMessages.allcheck = false;
        $scope.systemMessages = [];
        $scope.systemMessages.checkcount = 0;
        $scope.systemMessages.allcheck = false;
        var messageType = $stateParams.message_type;
        if (messageType == "1") {
            $scope.showTab = {
                myMsg: false,
                systemMsg: true
            };
        } else {
            $scope.showTab = {
                myMsg: true,
                systemMsg: false
            };
        }

        // 消息已读未读全部过滤
        $scope.msgFilter = {
            has_read: ""
        };
        $scope.filterMsg = function (msgStatus) {
            $scope.msgFilter.has_read = msgStatus;
            $scope.refresh();
        };


        // 分页
        $scope.pagination = {
            pagesize: 10,
            totalcount: -1,
            currentpage: 1
        };

        $scope.$watch("pagination.currentpage", function () {
            $scope.refresh();
        });

        // 刷新页面
        $scope.refresh = function () {
            if (!$window.sessionStorage.sessionid) {
                myAlert("会话已过期，您需要重新登录");
            } else {
                if ($scope.showTab.myMsg) {
                    accountService.getMessages({
                        message_type: "0",
                        hasread: $scope.msgFilter.has_read,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize
                    }).then(function (data) {
                        $scope.myMessages = data[0] ? data[0] : [];
                        $scope.pagination.totalcount = data[1] ? data[1] : 0;
                    });
                } else if ($scope.showTab.systemMsg) {
                    accountService.getMessages({
                        message_type: "1",
                        hasread: $scope.msgFilter.has_read,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize
                    }).then(function (data) {
                        $scope.systemMessages = data[0] ? data[0] : [];
                        $scope.pagination.totalcount = data[1] ? data[1] : 0;
                    });
                }
            }
        };

        // 删除消息
        $scope.remove = function (val) {
            if (!$window.sessionStorage.sessionid) {
                myAlert("会话已过期，您需要重新登录");
            } else {
                var checkedMessageIds = [];
                for (var i = 0; i < val.length; i++) {
                    if (val[i].checked) {
                        checkedMessageIds.push(val[i].MESSAGE_ID);
                    }
                }
                myConfirm("确定删除所选的" + checkedMessageIds.length + "条消息吗？", function () {
                    accountService.deleteMessagesById({
                        message_id: checkedMessageIds.join(",")
                    }).then(function (data) {
                        if (data[2] && "0" == data[2].ANS_MSG_HDR.MSG_CODE) {
                            $rootScope.getNoReadMessages(true);
                            $scope.refresh();
                        }
                    });
                });
            }
        };

        $scope.check = function (val, i) {
            if (!val.checkcount && isNaN(val.checkcount)) {
                val.checkcount = 0;
            }
            val[i].checked ? val.checkcount-- : val.checkcount++;
            val.allcheck = (val.checkcount == val.length ? true : false);
        };

        $scope.checkeach = function (val) {
            if (val.allcheck) {
                for (var i = 0; i < val.length; i++) {
                    val[i].checked = false;
                }
                val.checkcount = 0;
            } else {
                for (var i = 0; i < val.length; i++) {
                    val[i].checked = true;
                }
                val.checkcount = val.length;
            }
        };

        $scope.$watch('$viewContentLoaded', function () {
            if ($.browser.msie && $.browser.version <= 9) {
                if ($.browser.version <= 8) {
                    $scope.isIE = true;
                    $("label").removeClass("i-checks i-checks-sm i-checks-lg");
                }
                // Invoke the plugin
                $('input, textarea').placeholder();
            }
        });

    }]);
