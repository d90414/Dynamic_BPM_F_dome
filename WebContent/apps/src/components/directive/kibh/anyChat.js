'use strict';

module.exports = angular.module('ASS.directive.anyChat', [])
    .directive('anyChat', ['$ocLazyLoad', 'kibhSystem', '$window', 'myAlert', 'myConfirm',
        function ($ocLazyLoad, kibhSystem, $window, myAlert, myConfirm) {
            return {
                restrict: "EAC",
                replace: true,
                scope : {
                	busilogno: "=",
                	bizid: "=",
                	success: "=",
                	failed: "="
        		},
                templateUrl: 'apps/src/blocks/directivetpl/kibh/anyChat.html',
                link: function ($scope, ele, attrs, ngModelCtrl) {
                	if (typeof(initSDKRetCode) == "undefined") {
                		$ocLazyLoad.load([ "public/vendors/bower_components/anychat/src/javascript/anychatsdk.js",
                		                   "public/vendors/bower_components/anychat/src/javascript/anychatevent.js",
                		                   /*"public/vendors/bower_components/anychat/src/javascript/advanceset.js",
                		                   "public/vendors/bower_components/anychat/src/javascript/videocall.js",*/
                		                   "public/vendors/bower_components/anychat/src/javascript/logicfunc.js"
						]).then(function() {
							LogicInit();
							/*$scope.$watch("busilogno", function() {
								if($scope.busilogno) {
									kibhSystem.getLogUserInfo().then(function(data) {
										var user = data[0][0];
										LogicInit(user.PHONE_NO, $scope.bizid, $window.sessionStorage.sessionid, user.USER_ID, "1008111432109581762");
									});
								}
							});*/
						});
                	} else {
                		if (initSDKRetCode == GV_ERR_SUCCESS) {
                			connectVideoServer();
                		} else {
                			LogicInit();
                		}
                	}
                	
                	$scope.changeVideoCp = function() {
                		BRAC_SelectVideoCapture(BRAC_DEVICE_VIDEOCAPTURE, $scope.vc);
                	};
                	
                	$scope.record = function() {
                		setVideoRecord();
                	};
                	
                	$scope.again = function() {
                		myConfirm("您确定要重新录制吗？", function() {
                			setVideoRecord();
                		});
                	};
                	
                	$scope.play = function() {
                		setVideoPlay();
                	};
                }
            }
        }]);