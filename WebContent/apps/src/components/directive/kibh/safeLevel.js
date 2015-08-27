'use strict';

module.exports = angular.module('ASS.directive.safeLevel', [])
    .directive('safeLevel', ['$rootScope', '$localStorage', '$timeout', 'kibhSystem', 'SMVC',
        function ($rootScope, $localStorage, $timeout, kibhSystem, SMVC) {
            return {
                restrict: "EAC",
                replace: true,
                scope: {
                    bizid: "=",
                    busilogno: "=",
                    code: "=",
                    fundpwd: "="
                },
                templateUrl: 'apps/src/blocks/directivetpl/kibh/safeLevel.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                    var bizsconfig = $localStorage.bizsconfig;
                    var level = bizsconfig[$scope.bizid].SECURITY_LEVEL;

                    $scope.$watch("code", function () {
                        $localStorage.safelevel_code = $scope.code;
                        $localStorage.safelevel_code_id = $scope.codeid;
                    });

                    $scope.$watch("fundpwd", function () {
                        $localStorage.safelevel_fundpwd = $scope.fundpwd;
                    });

                    $scope.safelevel = {};
                    if (level) {
                        level = level.split(",");
                        for (var i in level) {
                            if (level[i]) $scope.safelevel[level[i]] = true;
                        }
                    }

                    if (!$scope.safelevel[1]) $scope.code = "111111";
                    if (!$scope.safelevel[2]) $scope.fundpwd = "111111";

                    /*获取验证码*/
                    var wait = 120;
                    $scope.codetip = "获取验证码";
                    $scope.getcode = function (flag) {
                        if (wait == 0) {
                            $scope.codetip = "获取验证码";
                            wait = 120;
                        } else {
                            if (flag) {
                                $scope.codetip = "重新发送(" + wait + ")";
                                wait--;
                                $timeout(function () {
                                    $scope.getcode(true);
                                }, 1000);
                            } else {
                                $scope.codetip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>获取中...';
                                kibhSystem.getMobileCode({
                                    BUSINESS_ID: $scope.bizid,
                                    BUSI_LOG_NO: $scope.busilogno
                                }).then(function (data) {
                                    if (data[0] == null) {
                                        $scope.codetip = "获取验证码";
                                        wait = 120;
                                    } else {
                                        if (SMVC && data[0][0]) {
                                            $scope.code = data[0][0].VERIFY_CODE;
                                            $scope.codeid = data[0][0].CODE_ID;
                                        }
                                        $scope.codetip = "重新发送(" + wait + ")";
                                        wait--;
                                        $timeout(function () {
                                            $scope.getcode(true);
                                        }, 1000);
                                    }
                                });
                            }
                        }
                    };

                    // 兼容IE
                    if ($.browser.msie && $.browser.version <= 9) {
                        $('input, textarea').placeholder();
                    }
                }
            }
        }]);