'use strict';

module.exports = angular.module('ASS.service.myAlert', [])
    .factory("myAlert", [ '$modal', function ($modal) {
        return function (content, ok, cancel, title, oktxt, titleico, okico) {
        	return $modal.open({
                backdrop: "static",
                templateUrl: 'apps/src/blocks/servicetpl/alert.html',
                controller: [ '$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.content = content;
                    $scope.title = title || "提示框";
                    $scope.oktxt = oktxt || "确定";
                    $scope.titleico = titleico || '<i class="fa fa-exclamation-circle m-r-xs text-md"></i>';
                    $scope.okico = okico || '<i class="fa fa-fw fa-check"></i>';

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