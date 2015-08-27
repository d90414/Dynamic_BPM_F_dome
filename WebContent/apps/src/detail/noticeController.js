'use strict';

angular.module('ASS.detail').controller('DetailCtrl',
    ['$scope', '$stateParams', 'exclusiveService', 'detailService',
        function ($scope, $stateParams, exclusiveService, detailService) {
            var id = $stateParams.id;
            $scope.notice = {};

            // 动态
            detailService.getPrdNoteFile({
                not_id: id
            }).then(function (data) {
                $scope.notice = data[0][0];

                if ($scope.notice != null && $scope.notice != '' && $scope.notice.NOT_ATTR_URL != null && $scope.notice.NOT_ATTR_URL != '') {
                    var arr1 = $scope.notice.NOT_ATTR_URL.split(',');
                    $scope.notice['fj'] = [];
                    for (var i = 0; i < arr1.length; i++) {
                        if (arr1[i] == '') break;
                        var arr2 = arr1[i].split('|');
                        $scope.notice['fj'][i] = {fjurl: arr2[0], fjname: arr2[1], fjsize: arr2[2]};
                    }
                }
            });

        }]);
