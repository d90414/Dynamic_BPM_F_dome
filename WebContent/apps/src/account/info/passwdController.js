'use strict';

angular.module('ASS.account').controller('PasswdCtrl', ['$rootScope', '$scope', '$window', '$state', 'accountService', 'myAlert','$http',
    function ($rootScope, $scope, $window, $state, accountService, myAlert,$http) {
       $rootScope.jbpmBaseUrl = "http://172.16.20.16:18083/Dynamic_BPM";
       if(!$rootScope.flowName){
            $state.go("page.account.security.start");
            return;
        }
       $rootScope.userName = "123123";
       

       var getNav = function(){
       		//获取菜单
            $http({
                method:"POST",
                url:$rootScope.jbpmBaseUrl+'/auth/tasks',
                params:{
                   flowName: $rootScope.flowName,
                    userName:$rootScope.userName
                },
                data:{}
            }).success(function(data) {
                console.log(data);
                $scope.flowActive = data.active;
                $scope.flowNav = data.activities;

            }).error(function(error) {
                console.log(error)
            });
       
        }	
       //发起流程
       /****/
         $http({
                method:"POST",
                url:$rootScope.jbpmBaseUrl+'/auth/start',
                params:{
                    flowName: $rootScope.flowName,
                    userName:$rootScope.userName
                },
                data:{}
            }).success(function(data) {
                //更新菜单 getNav();
                 getNav();

                console.log(data);
               //////////////////////////////////////////
               $scope.taskId = data.taskId;
                if(data.activityName=='密码验证'){
                  $state.go('page.account.passwdNum');
                }else if(data.activityName=='手机号验证'){
                    $state.go('page.account.photoNum');
                }if(data.activityName=='身份验证'){
                    $state.go('page.account.shengfen');
                }

            }).error(function(error) {
                console.log(error)
            });
        
        ///下一步提交按钮
        $scope.doReply = function(){
              $http({
                method:"POST",
                url:$rootScope.jbpmBaseUrl+'/auth/reply',
                params:{
                    flowName: $rootScope.flowName,
                    userName:$rootScope.userName,
                    taskId:$scope.taskId
                },
                data:{}
            }).success(function(data) {
                console.log('replay:');
               console.log(data);
                var newTaskId = data.newTaskId;
                var end = data.end;
                 var url = data.url;
                if(end==false){
                  console.log('is not end');
                    nextPage(url)
                }else{
                  console.log('end');
                  $state.go('page.account.end');
                }

            }).error(function(error) {
                console.log(error)
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
