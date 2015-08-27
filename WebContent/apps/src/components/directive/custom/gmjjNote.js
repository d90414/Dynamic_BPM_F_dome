'use strict';

module.exports = angular.module('ASS.directive.gmjjNote', [])
    .directive('gmjjNote', ['$http', 'detailService', function ($http, detailService) {
        return {
            restrict: "EAC",
            replace: true,
            templateUrl: 'apps/src/blocks/directivetpl/kfps/gmjjNote.html',
            scope: {},
            link: function ($scope, $element, attrs, model) {

                var search = function () {
                    detailService.getPrdNoteFile({
                        pro_id: attrs.proid,
                        par_type_id: attrs.partype,
                        cur_page: $scope.pagination.currentpage,
                        ret_rows: $scope.pagination.pagesize,
                        order_by: "not_type desc"
                    }).then(function (data) {
                        var newobj = function () {
                            var mubobj1 = {
                                NOT_TYPE_DESC: "",
                                NOT_TYPE: "",
                                list: []
                            };
                            return mubobj1;
                        };
                        var endobj = [];
                        var mubobj = newobj();
                        var note_type = "";

                        if (angular.isArray(data[0])) {
                            note_type = data[0][0].NOT_TYPE;
                            mubobj.NOT_TYPE = note_type;
                            mubobj.NOT_TYPE_DESC = data[0][0].NOT_TYPE_DESC;
                        }
                        angular.forEach(data[0], function (item) {
                            var temnotetyp = item.NOT_TYPE;
                            if (temnotetyp == note_type) {
                                mubobj.list.push(item);
                            } else {
                                endobj.push(mubobj);
                                note_type = item.NOT_TYPE;
                                mubobj = newobj();
                                mubobj.NOT_TYPE = note_type;
                                mubobj.NOT_TYPE_DESC = item.NOT_TYPE_DESC;
                                mubobj.list.push(item);
                            }
                        });
                        if (mubobj.NOT_TYPE != '') {
                            endobj.push(mubobj);
                        }
                        $scope.gmjjNote = endobj;
                        $scope.gmjjNoteys = data[0];
                        $scope.pagination.totalcount = data[1];
                    });
                };

                $scope.pagination = {
                    pagesize: 10,
                    totalcount: -1,
                    currentpage: 1
                };

                $scope.$watch("pagination.currentpage", function () {
                    if ($scope.pagination.currentpage == 0) return;
                    search();
                });

            }
        }
    }]);
