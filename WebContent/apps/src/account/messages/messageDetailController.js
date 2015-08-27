'use strict';

angular.module('ASS.account').controller('MessageDetailCtrl', ['$rootScope', '$scope', '$window', '$state', '$stateParams', 'accountService', 'myAlert', 'myConfirm',
    function ($rootScope, $scope, $window, $state, $stateParams, accountService, myAlert, myConfirm) {
        if (!$window.sessionStorage.sessionid) {
            $state.go("auth.login");
            return;
        }
        $rootScope.global.myAccountMenu = "我的消息";

        var message_type = $stateParams.message_type;
        var message_id = $stateParams.message_id;

        $scope.messageType = ["我的消息", "系统消息"][message_type];

        $scope.messages = [];
        $scope.singleMessage = {};

        if (!$window.sessionStorage.sessionid) {
            myAlert("会话已过期，您需要重新登录");
        } else {
            accountService.getMessages({
                message_id: message_id
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope.singleMessage = data[0][0] || {};
                    $scope.updateMsgStatus($scope.singleMessage);
                }
            })
        }

        // 更新消息状态（未读已读）
        $scope.updateMsgStatus = function (message) {
            if (message && ("已读" != message.HASREAD)) {
                accountService.updataMessage({
                    message_id: message.MESSAGE_ID
                }).then(function (data) {
                    // 更新页面顶部消息提示
                    $rootScope.getNoReadMessages(true);
                });
            }
        };

        // 删除单条消息
        $scope.deleteSingleMsg = function (message) {
            if (!$window.sessionStorage.sessionid) {
                myAlert("会话已过期，您需要重新登录");
            } else {
                myConfirm("确定删除所选的消息吗？", function () {
                    accountService.deleteMessagesById({
                        session_id: $window.sessionStorage.sessionid,
                        message_id: message.MESSAGE_ID
                    }).then(function (data) {
                        if (data[2] && "0" == data[2].ANS_MSG_HDR.MSG_CODE) {
                            $state.go("page.account.messages", {message_type: message.MESSAGE_TYPE});
                        }
                    });
                });
            }
        };

    }]);
