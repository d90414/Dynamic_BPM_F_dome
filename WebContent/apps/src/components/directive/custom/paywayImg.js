'use strict';

module.exports = angular.module('ASS.directive.paywayImg', [])
    .directive('paywayImg', [function () {
        return {
            restrict: "A",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/paywayImg.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                if (attrs.payWay && attrs.payWay.length > 0) {
                    $scope.payway = attrs.payWay.split(",");

                    $scope.paywayDesc = [];
                    if (attrs.payWayDesc && attrs.payWayDesc.length > 0) {
                        $scope.paywayDesc = attrs.payWayDesc.split(",");
                    }
                    $scope.payWays = [];
                    for (var i = 0; i < $scope.payway.length; i++) {
                        $scope.payWays.push({
                            way: $scope.payway[i],
                            desc: $scope.paywayDesc[i] ? $scope.paywayDesc[i] : ""
                        })
                    }
                }
            }
        }
    }]);