'use strict';

angular.module('ASS.template').controller('bizCtrl', ['$scope', '$state', 'kibhSystem', '$localStorage', function ($scope, $state, kibhSystem, $localStorage) {
    $scope.isOpened = function (business_type) {
        var isOpened = false;
        var bizmenus = $scope.bizmenus["a_" + business_type];
        if (business_type == "101" && $state.includes("kibh.biz.openAccount")) return true;
        if (bizmenus) {
            for (var i = 0; i < bizmenus.menuitem.length; i++) {
                if ($state.includes(bizmenus.menuitem[i].MENU_URL_OLD)) {
                    isOpened = true;
                    break;
                }
            }
        }

        return isOpened;
    };

    $scope.gotourl = function (i) {
        $state.go(i.MENU_URL, {businessId: i.MEN_BUSI_IDS})
    }
}]);
