'use strict';

angular.module('ASS.account').controller('PasswdCtrl', ['$rootScope', '$scope', '$window', '$state', 'accountService', 'myAlert','$http',
    function ($rootScope, $scope, $window, $state, accountService, myAlert,$http) {
       var droot = "http://172.16.20.16:18083/jbpm-study";
       var flowName = "three";
       var userName = "123123";
       
       var getNav = function(){
       		//获取菜单
  			$http.get(droot+'/auth/tasks/'+flowName+'/'+userName,{})
          	.success(function(data){
          		$scope.flowActive = data.active;
          		$scope.flowNav = data.activities;
              
          	})
          	.error(function(error){
          		console.log(error);
          	});
       
        }	
       //发起流程
       /****/
        
          $http.get(droot+'/auth/start/'+flowName+'/123123',{})
          	.success(function(data){
              getNav();
              console.log('start:');
          		console.log(data);
          		$scope.taskId = data.taskId;
              if(data.activityName=='密码验证'){
                $state.go('page.account.passwdNum');
              }else if(data.activityName=='手机号验证'){
                  $state.go('page.account.photoNum');
              }if(data.activityName=='身份验证'){
                  $state.go('page.account.shengfen');
              }
          	})
          	.error(function(error){
          		console.log(error);
          	});
        
       
        $scope.doReply = function(){
        	$http.get(droot+'/auth/reply/'+flowName+'/123123/'+$scope.taskId,{})
        	.success(function(data){
             console.log('replay:');
        		 console.log(data);
              var newTaskId = data.newTaskId;
              var end = data.isEnd;
               var url = data.url;
          	  if(end==false){
                console.log('is not end');
                  nextPage(url)
              }else{
                console.log('end');
                $state.go('page.account.end');
              }
        	})
        	.error(function(error){
        		console.log(error);
        	});
        }

        function nextPage(url){
          console.log('url:'+url);
            if(url=='密码验证'){
                $state.go('page.account.passwd');
              }else if(url=='手机号验证'){
                $state.go('page.account.photoNum');
              }if(url=='身份验证'){
                $state.go('page.account.shengfen');
              }
        }

    }]);
