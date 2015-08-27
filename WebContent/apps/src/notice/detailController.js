'use strict';

angular.module('ASS.notice').controller('DetailCtrl',
    ['$scope', '$stateParams', 'exclusiveService', 'adnotService',
        function ($scope, $stateParams, exclusiveService, adnotService) {
            $scope.notice = {};

            // 动态
            adnotService.getAdOrNote({
                id: $stateParams.id
            }).then(function (data) {
                $scope.notice = data[0][0];
                if ($scope.notice != null && $scope.notice != '' && $scope.notice.ATTR3_INFO != null && $scope.notice.ATTR3_INFO != '') {
                    var arr1 = $scope.notice.ATTR3_INFO.split(',');
                    $scope.notice['fj'] = [];
                    for (var i = 0; i < arr1.length; i++) {
                        if (arr1[i] == '') break;
                        var arr2 = arr1[i].split('|');

                        $scope.notice['fj'][i] = {fjurl: arr2[0], fjname: arr2[1], fjsize: arr2[2]};
                    }
                }
                if ($scope.notice.CONTENT) {
                    $scope.notice.CONTENT = $scope.notice.CONTENT.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                }
            });

        }]);
