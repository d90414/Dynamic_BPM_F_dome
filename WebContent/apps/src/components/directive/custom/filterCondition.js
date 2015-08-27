'use strict';

module.exports = angular.module('ASS.directive.filterCondition', [])
    .directive('filterCondition', ['$http', 'prdlistService', function ($http, prdlistService) {
        return {
            restrict: "EAC",
            replace: true,
            scope: {
                condition: "="
            },
            templateUrl: 'apps/src/blocks/directivetpl/kfps/filtercondition.html',
            link: function ($scope, $element, attrs, model) {
                $http.get("./data/condition.json").then(function (result) {
                    $scope.key2label = {};
                    $scope.firstchoice = {};
                    $scope.conditions = result.data[attrs.ctype];
                    angular.forEach($scope.conditions, function (i) {
                        if (i.key == 'regi_org') {
                            prdlistService.getjjgsPrds().then(function (data) {
                                i.list = [];
                                i.list.push({"key": "", "value": "全部"});
                                angular.forEach(data[0], function (j) {
                                    i.list.push({"key": j.EXT_TA_CODE, "value": j.INST_ORG_SNAME});
                                });

                                $scope.condition[i.key] = i.list[0].key;
                                $scope.firstchoice[i.key] = i.list[0].key;
                            });
                        } else {
                            $scope.condition[i.key] = i.list[0].key;
                            $scope.firstchoice[i.key] = i.list[0].key;
                        }

                        $scope.key2label[i.key] = i.label;

                        if ($scope.firstchoice[i.key]) {
                            $scope.selt(i.key, i.list[0]);
                        }
                    })
                });

                $scope.selected = {};
                $scope.count = function () {
                    var t = typeof $scope.selected;
                    if (t == 'string') {
                        return $scope.selected.length;
                    } else if (t == 'object') {
                        var n = 0;
                        for (var i in $scope.selected) {
                            n++;
                        }
                        return n;
                    }
                    return 0;
                }

                $scope.selt = function (key, i) {
                    $scope.condition[key] = i.key;
                    if (i.key != "") {
                        i.ty = key;
                        $scope.selected[key] = i;
                    } else {
                        delete $scope.selected[key];
                    }
                }

                $scope.clear = function (i) {
                    if (i) {
                        $scope.condition[i] = $scope.firstchoice[i];
                        if ($scope.condition[i] == "") {
                            delete $scope.selected[i];
                        } else {
                            angular.forEach($scope.conditions, function (element) {
                                if (element.key == i && $scope.selected[i].key != element.list[0].key) {
                                    $scope.selt(i, element.list[0]);
                                }
                            });
                        }
                    } else {
                        $scope.selected = {};
                        angular.forEach($scope.conditions, function (i) {
                            $scope.condition[i.key] = i.list[0].key;
                            if (i.list[0].value) {
                                $scope.selt(i.key, i.list[0]);
                            }
                        })
                    }
                };
            }
        }
    }]);
