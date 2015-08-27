'use strict';

angular.module('ASS.openAccount').controller('openAccountCtrl', ['$scope', '$localStorage', '$stateParams', function ($scope, $localStorage, $stateParams) {
    $scope.menutitle = $localStorage.menutitle ? $localStorage.menutitle[$stateParams.businessId] : "";
    var menulist = $localStorage.menulist.list;

    angular.forEach(menulist, function (d, i) {
        if (d.MENU_LEVEL == "101001") {
            $scope.url = d.MENU_URL_OLD;
        }
    });
}]);