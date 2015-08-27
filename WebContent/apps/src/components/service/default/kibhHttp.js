'use strict';

module.exports = angular.module('ASS.service.kibhHttp', [])
    .factory('kibhHttp', [ 'myHttp', '$state', '$q', '$localStorage', '$modal', 'myAlert', 'kibhRoot', function (myHttp, $state, $q, $localStorage, $modal, myAlert, kibhRoot) {
        return {
            post: function (param) {
                var level = $localStorage.bizsconfig[param.req.BUSINESS_ID].SECURITY_LEVEL;

                var mobilecode = level && level.indexOf("1") >= 0, mhttp, ms = true;
                var fundpwd = level && level.indexOf("2") >= 0, fhttp, fs = true;
                var video = level && level.indexOf("3") >= 0, vs = true;

                if (mobilecode) {
                    mhttp = myHttp.post({
                        root: kibhRoot,
                        req: {
                            service: "890018",
                            BUSINESS_ID: param.req.BUSINESS_ID,
                            BUSI_LOG_NO: param.req.BUSI_LOG_NO,
                            VERIFY_CODE: $localStorage.safelevel_code,
                            CODE_ID: $localStorage.safelevel_code_id
                        }
                    }).then(function (data) {
                        ms = data[0] != null;
                    });
                }

                if (fundpwd) {
                    fhttp = myHttp.post({
                        root: kibhRoot,
                        req: {
                            service: "870012",
                            BUSINESS_ID: param.req.BUSINESS_ID,
                            BUSI_LOG_NO: param.req.BUSI_LOG_NO,
                            FUND_PWD: $localStorage.safelevel_fundpwd
                        }
                    }).then(function (data) {
                        fs = data[0] != null;
                    });
                }
                param.root = kibhRoot;
                return $q.all([mhttp, fhttp]).then(function () {
                    if (ms && fs) {
                    	if(video) {
                    		var videoreq, rltdata = 0;
                    		
                    		var asyncGreet = function() {
                    			var deferred = $q.defer();
                    			$modal.open({
                                  	backdrop: "static",
                                  	size: 'lg',
                                  	templateUrl: 'apps/src/blocks/directivetpl/kibh/anyChatModal.html',
                                  	controller: ['$scope', '$state', '$modalInstance', 'myAlert', function ($scope, $state, $modalInstance, myAlert) {
                                  		$scope.bizid = param.req.BUSINESS_ID;
	                                  	$scope.busilogno = param.req.BUSI_LOG_NO;

                                  		$scope.success = function () {
                                          	$modalInstance.close();
                                      	};

                                      	$scope.failed = function () {
                                          	$modalInstance.dismiss('cancel');
                                      	};
                                      	
                                      	$scope.cancel = function() {
                                      		closeVideoServer();
                                      		$scope.failed();
	                                	};
                                      	
                                      	$modalInstance.result.then(function () {
                                  			myAlert("视频见证成功，点击下一步继续办理！", function() {
                                  				deferred.resolve(1);
                                  			})
                                      	}, function () {
                                      		myAlert("视频见证失败， 点击确定重新见证！", function() {
                                      			deferred.reject(0);
                                      		})
                                        });
                                  	}]
                      			});
                			   
                			  	return deferred.promise;  
                			}  
                    		
                    		return asyncGreet(0).then(function(data) {
                    			return myHttp.post(param);
                    		}, function(data) {
                    			return;
                    		});
                    	} else {
                    		return myHttp.post(param);
                    	}
                    }
                })
            }
        }
    } ]);