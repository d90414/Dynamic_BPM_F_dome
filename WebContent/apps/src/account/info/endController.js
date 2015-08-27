'use strict';

angular.module('ASS.account').controller('EndCtrl', ['$rootScope', '$scope', '$window', '$state', 'accountService', 'myAlert','$http',
    function ($rootScope, $scope, $window, $state, accountService, myAlert,$http) {
       
    	$scope.update = function(){
    		myAlert("修改成功");
    	}
    }]);
