'use strict';

module.exports = angular.module('ASS.service.myConfirm', [])
    .factory("myConfirm", [ '$modal', function ($modal) {
        return function (content, ok, cancel, title, oktxt, canceltxt, titleico, okico, cancelico) {
        	return $modal.open({
                backdrop: "static",
                templateUrl: 'apps/src/blocks/servicetpl/confirm.html',
                controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.content = content;
                    $scope.title = title || "确认提示框";
                    $scope.oktxt = oktxt || "确定";
                    $scope.canceltxt = canceltxt || "取消";
                    $scope.titleico = titleico || '<i class="fa fa-question-circle m-r-xs text-md"></i>';
                    $scope.okico = okico || '<i class="fa fa-fw fa-check"></i>';
                    $scope.cancelico = cancelico || '<i class="fa fa-fw fa-remove"></i>';

                    $modalInstance.result.then(function () {
                        typeof ok == "function" && ok();
                    }, function () {
                        typeof cancel == "function" && cancel();
                    });

                    $scope.ok = function () {
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                } ]
            });
        }
    } ]);