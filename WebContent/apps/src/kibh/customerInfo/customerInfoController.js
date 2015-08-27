'use strict';
/*
 1001	修改账户手机号
 1002	身份证号自然升位
 1003	修改身份证资料
 1004	身份证正反面上传
 1005	修改基本资料
 1006	修改职业行业学历
 1007	查询客户资料
 1037	修改联系人
 1044	查询联系人
 1045	查询其它资料
 */
angular.module('ASS.customerInfo').controller('customerInfoCtrl', ['$scope', '$state', '$stateParams', '$localStorage', '$modal', 'myAlert', 'myConfirm', 'kibhRoot', 'kibhFile', 'kibhSystem', 'kibhCustomer', function ($scope, $state, $stateParams, $localStorage, $modal, myAlert, myConfirm, kibhRoot, kibhFile, kibhSystem, kibhCustomer) {
    /**
     * 15位转18位身份证号
     * @author heavenslv
     * @param card 15位的身份证号码
     * @return String 自然升位后18位的身份证号码
     **/
    var changeFivteenToEighteen = function (card) {
        if (card.length == 15) {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i;
            card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            card += arrCh[cardTemp % 11];
            return card;
        }
        return card;
    };

    var setStep = function (name) {
        switch (name) {
            case "kibh.biz.modifyBasicInfo":
                $scope.step = "1";
                break;
            case "kibh.biz.modifyIdentityInfo":
                $scope.step = "2";
                break;
            case "kibh.biz.modifyOtherInfo":
                $scope.step = "3";
                break;
            default:
                $scope.step = "0";
        }
    };

    var getDictInfo = function (codelist) {
        if (codelist && codelist.length > 0) {
            var code = codelist.shift();
            kibhSystem.getDictInfo({
                DICT_CODE: code
            }).then(function (data) {
                if (data && data[0] && data[0][0]) {
                    $scope[code.toLowerCase().replace(/_/g, "")] = data[0];
                }
                getDictInfo(codelist);
            });
        }
    };

    var getCustomerInfo = function (name) {
        var codelist = [], otherflag = false, contactflag = false;
        switch (name) {
            case "kibh.biz.modifyBasicInfo":
                contactflag = true;
                break;
            case "kibh.biz.modifyIdentityInfo":
                //codelist = ["SEX"];
                break;
            case "kibh.biz.modifyOtherInfo":
                codelist = ["OCCU_EXTYPE", "CIF_TRADE", "EDUCATION"];
                otherflag = true;
                break;
            default:
                codelist = ["OCCU_EXTYPE", "CIF_TRADE", "EDUCATION"];//codelist = ["SEX", "OCCU_EXTYPE", "CIF_TRADE", "EDUCATION"];
                contactflag = true;
                otherflag = true;
        }
        getDictInfo(codelist);
        $scope.pic1 = "public/images/img_bg2.png";
        $scope.pic2 = "public/images/img_bg3.png";
        $scope.customerInfo = {};
        kibhCustomer.getBasicInfo({
            BUSINESS_ID: "1007"
        }).then(function (data) {
            if (data && data[0] && data[0][0]) {
                $scope.customerInfo = data[0][0];
                if (contactflag) {
                    kibhCustomer.getContactInfo({
                        BUSINESS_ID: "1044"
                    }).then(function (data) {
                        if (data && data[0] && data[0][0]) {
                            $scope.customerInfo = $.extend({}, data[0][0], $scope.customerInfo);
                            if (otherflag) {
                                kibhCustomer.getOtherInfo({
                                    BUSINESS_ID: "1045"
                                }).then(function (data) {
                                    if (data && data[0] && data[0][0]) {
                                        $scope.customerInfo = $.extend({}, data[0][0], $scope.customerInfo);
                                        setStep(name);
                                    }
                                });
                            } else {
                                setStep(name);
                            }
                        }
                    });
                } else if (otherflag) {
                    kibhCustomer.getOtherInfo({
                        BUSINESS_ID: "1045"
                    }).then(function (data) {
                        if (data && data[0] && data[0][0]) {
                            $scope.customerInfo = $.extend({}, data[0][0], $scope.customerInfo);
                            setStep(name);
                        }
                    });
                } else {
                    setStep(name);
                }
            }
        });
    };
    
    var saveBasicInfo = function () {
        myConfirm("您确定要保存对基本信息的修改吗？", function () {
        	kibhSystem.getBusiLogNo("1005").then(function (data) {
                kibhCustomer.modifyBasicInfo({
                    BUSINESS_ID: "1005",
                    BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                    TEL: $scope.customerInfo.TEL,
                    EMAIL: $scope.customerInfo.EMAIL,
                    ADDRESS: $scope.customerInfo.ADDRESS
                }).then(function (data) {
                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            getCustomerInfo($state.current.name);
                        }
                    }
                });
                $scope.basicInfo = false;
            });
        });
    };

    var saveIdentityInfo = function () {
        if ($scope.adChange && $scope.auChange && $scope.vaChange) {//&& $scope.idChange
            myConfirm("您确定要保存对身份信息的修改吗？", function () {
                //$scope.idChange = false;
                $scope.adChange = false;
                $scope.auChange = false;
                $scope.vaChange = false;
                var isSuccess = false;
                kibhSystem.getBusiLogNo("1004").then(function (data) {
                    kibhCustomer.saveIdentityInfo({
                        BUSINESS_ID: "1004",
                        BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                        ID_CODE: $scope.idCode ? $scope.idCode : $scope.customerInfo.ID_CODE
                    }).then(function (data) {
                        if (data && data[2] && data[2].ANS_MSG_HDR) {
                            if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                isSuccess = true;
                            }
                        }
                        if (isSuccess) {
                        	kibhSystem.getBusiLogNo("1003").then(function (data) {
                                kibhCustomer.modifyVitalInfo({
                                    BUSINESS_ID: "1003",
                                    BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                                    ID_TYPE: $scope.customerInfo.ID_TYPE,
                                    ID_CODE: $scope.idCode ? $scope.idCode : $scope.customerInfo.ID_CODE,
                                    ID_ADDR: $scope.customerInfo.ID_ADDR,
                                    ID_ISS_AGCY: $scope.customerInfo.ID_ISS_AGCY,
                                    ID_BEG_DATE: $scope.customerInfo.ID_BEG_DATE,
                                    ID_EXP_DATE: $scope.customerInfo.ID_EXP_DATE
                                }).then(function (data) {
                                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                            getCustomerInfo($state.current.name);
                                        }
                                    }
                                });
                            });
                        } else {
                            getCustomerInfo($state.current.name);
                        }
                    });
                    $scope.identityInfo = false;
                });
            });
        } else {
            myAlert("请一并提交身份证正反面！");
        }
    };

    var saveOtherInfo = function () {
        myConfirm("您确定要保存对其他信息的修改吗？", function () {
        	kibhSystem.getBusiLogNo("1006").then(function (data) {
                kibhCustomer.modifyOtherInfo({
                    BUSINESS_ID: "1006",
                    BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                    OCCU_TYPE: $scope.customerInfo.OCCU_TYPE,
                    TRADE: $scope.customerInfo.TRADE,
                    EDUCATION: $scope.customerInfo.EDUCATION,
                    OCCUPATION: $scope.otheroccuextype ? $scope.customerInfo.OCCUPATION : ""
                }).then(function (data) {
                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            getCustomerInfo($state.current.name);
                        }
                    }
                });
                $scope.otherInfo = false;
            });
        });
    };

    var saveContactInfo = function () {
        myConfirm("您确定要保存对联系人信息的修改吗？", function () {
        	kibhSystem.getBusiLogNo("1037").then(function (data) {
                kibhCustomer.modifyContactInfo({
                    BUSINESS_ID: "1037",
                    BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                    LINKMAN_DELX: $scope.customerInfo.LINKMAN_DELX,
                    LINKMAN_TEL_DELX: $scope.customerInfo.LINKMAN_TEL_DELX,
                    LINKMAN_TEL_XXFS: $scope.customerInfo.LINKMAN_TEL_XXFS
                }).then(function (data) {
                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                            getCustomerInfo($state.current.name);
                        }
                    }
                });
                $scope.contactInfo = false;
            });
        });
    };

    $scope.selectChange = function (value, name) {
        var isOther = false;
        angular.forEach($scope[name], function (data) {
            if (data.DICT_ITEM == value && data.DICT_ITEM_NAME == "其他") {
                isOther = true;
            }
        });
        $scope["other" + name] = isOther;
        return isOther;
    };

    $scope.update = function () {
        $scope.idCode = changeFivteenToEighteen($scope.customerInfo.ID_CODE);
    };

    $scope.initUpload = function (name, sign) {
        var isIE9 = false;
        if ($.browser.msie && $.browser.version <= 9) {
            isIE9 = true;
        }
        $("input[name='" + name + "']").attr("title", "点击上传照片");
        $("input[name='" + name + "']").fileupload({
            dataType: isIE9 ? 'json' : '',
            autoUpload: true,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            url: kibhRoot + 'kjdp_upload?DIR=IMG',
            done: function (e, data) {
                if (data.result && eval(data.result) && eval(data.result)[0]) {
                    var filecon = eval(data.result)[0].FILECON;
                    kibhSystem.getBusiLogNo("1003").then(function (data) {
                        kibhCustomer.doOcrReq({
                            BUSINESS_ID: "1003",
                            BUSI_LOG_NO: data[0][0].BUSI_LOG_NO,
                            FACE_MARK: name,
                            FILE_CON: filecon
                        }).then(function (data) {
                            if (data && data[0] && data[0][0]) {
                                if (data[0][0].ID_NUMBER) {
                                    if ($scope.customerInfo.ID_CODE.length == 15) {
                                        if ($scope.idCode) {
                                            if (data[0][0].ID_NUMBER != $scope.idCode) {
                                                myAlert("身份证号不一致或身份证图片模糊ocr识别有误！");
                                                return;
                                            }
                                        } else {
                                            if (data[0][0].ID_NUMBER != changeFivteenToEighteen($scope.customerInfo.ID_CODE)) {
                                                myAlert("身份证号不一致或身份证图片模糊ocr识别有误！");
                                                return;
                                            } else {
                                                $scope.customerInfo.ID_CODE = data[0][0].ID_NUMBER;
                                                //$scope.idChange = true;
                                            }
                                        }
                                    } else {
                                        if (data[0][0].ID_NUMBER != $scope.customerInfo.ID_CODE) {
                                            myAlert("身份证号不一致或身份证图片模糊ocr识别有误！");
                                            return;
                                        }
                                    }
                                }
                                if (data[0][0].ADDRESS) {
                                    $scope.customerInfo.ID_ADDR = data[0][0].ADDRESS;
                                    $scope.adChange = true;
                                }
                                if (data[0][0].ISSUE_AUTHORITY) {
                                    $scope.customerInfo.ID_ISS_AGCY = data[0][0].ISSUE_AUTHORITY;
                                    $scope.auChange = true;
                                }
                                if (data[0][0].VALIDITY) {
                                    var validity = data[0][0].VALIDITY.split("-");
                                    $scope.customerInfo.ID_BEG_DATE = validity[0].replace(/[.]/g, "");
                                    $scope.customerInfo.ID_EXP_DATE = validity[1].replace(/[.]/g, "");
                                    $scope.vaChange = true;
                                }
                                $scope["pic" + sign] = kibhFile + "upload/IMG/" + filecon;
                                $("input[name='" + name + "']").attr("title", $scope["title" + sign]);
                            }
                        });
                    });
                }
            }
        });
    };

    $scope.modifyBasicInfo = function () {
        $scope.basicInfo = true;
    };

    $scope.modifyIdentityInfo = function () {
        $scope.identityInfo = true;
    };

    $scope.modifyOtherInfo = function () {
        $scope.otherInfo = true;
    };

    $scope.modifyContactInfo = function () {
        $scope.contactInfo = true;
    };

    $scope.modifyMobile = function () {
    	var bizid = "1001";
    	kibhSystem.getBusiLogNo(bizid).then(function (data) {
	        $modal.open({
	            backdrop: "static",
	            templateUrl: 'apps/src/kibh/customerInfo/modifyMobile.html',
	            controller: ['$scope', '$state', '$modalInstance', '$timeout', 'myAlert', 'kibhSystem', 'SMVC', function ($scope, $state, $modalInstance, $timeout, myAlert, kibhSystem, SMVC) {
	                $scope.bizid = bizid;
	                $scope.busilogno = data[0][0].BUSI_LOG_NO;
	                $scope.title = '修改手机号码';
	                $scope.subtip = '下一步';
	                $scope.code = "";
	                $scope.fundpwd = "";
	
	                // 获取验证码
	                var wait = 120;
	                $scope.codetip = '免费获取';
	                $scope.getcode = function (mobile) {
	                    if (wait == 0) {
	                        $scope.codetip = "免费获取";
	                        wait = 120;
	                    } else {
	                        if (mobile) {
	                            $scope.codetip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>获取中...';
	                            kibhSystem.getNewMobileCode({
	                                BUSINESS_ID: $scope.bizid,
	                                BUSI_LOG_NO: $scope.busilogno,
	                                PHONE_NO: mobile
	                            }).then(function (data) {
	                                if (data && data[0] && data[0][0]) {
	                                    if (data[0][0].CODE_ID) {
	                                        $scope.mobile = mobile;
	                                        if (SMVC) {
		                                        $scope.verifycode = data[0][0].VERIFY_CODE;
	                                        }
	                                        $scope.codeid = data[0][0].CODE_ID;
	                                        $scope.codetip = "重新发送(" + wait + ")";
	                                        wait--;
	                                        $timeout(function () {
	                                            $scope.getcode();
	                                        }, 1000);
	                                    } else {
	                                        $scope.codetip = "免费获取";
	                                        wait = 120;
	                                    }
	                                }
	                            });
	                        } else {
	                            $scope.codetip = "重新发送(" + wait + ")";
	                            wait--;
	                            $timeout(function () {
	                                $scope.getcode();
	                            }, 1000);
	                        }
	                    }
	                };
	
	                $scope.subForm = function (step, verifycode) {
	                    switch (step) {
	                        case 2:
	                            //$scope.title = '您正在使用“<span class="text-danger">新手机+视频见证</span>”修改手机号码';
	                            break;
	                        default:
	                            $scope.title = '您正在使用“<span class="text-danger">新手机验证码+原手机验证码</span>”修改手机号码';
	                    }
	                    if (step == 3) {
	                        if ($scope.codeid) {
	                        	kibhSystem.checkVerifiCode({
                                    BUSINESS_ID: $scope.bizid,
                                    BUSI_LOG_NO: $scope.busilogno,
                                    CODE_ID: $scope.codeid,
                                    VERIFY_CODE: verifycode,
                                    PHONE_NO: $scope.mobile
                                }).then(function (data) {
                                    if (data && data[2] && data[2].ANS_MSG_HDR) {
                                        if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                            $scope.step = step;
                                        }
                                    }
                                });
	                        } else {
	                            myAlert("请先获取验证码！");
	                        }
	                    } else if (step == 4) {
	                        $scope.subtip = '<i class="fa fa-spin fa-spinner m-r-xs"></i>请等待...';
	                        $scope.submitting = true;
	                        kibhCustomer.modifyMobileInfo({
                                BUSINESS_ID: $scope.bizid,
                                BUSI_LOG_NO: $scope.busilogno,
                                MOBILE_TEL: $scope.mobile
                            }).then(function (data) {
                                $scope.subtip = '下一步';
                                $scope.submitting = false;
                                if (data && data[2] && data[2].ANS_MSG_HDR) {
                                    if (data[2].ANS_MSG_HDR.MSG_CODE == 0) {
                                    	getCustomerInfo($state.current.name);
                                        $scope.step = step;
                                    }
                                }
                            });
	                    } else {
	                        $scope.step = step;
	                    }
	                };
	
	                $scope.cancel = function () {
	                    $modalInstance.dismiss('cancel');
	                };
	
	                $modalInstance.result.then(function () {
	                    $scope.cancel();
	                });
	
	                // 兼容IE
	                $scope.$watch('step', function () {
	                    if ($.browser.msie && $.browser.version <= 9) {
	                        $timeout(function () {
	                            $('input, textarea').placeholder();
	                        }, 100);
	                    }
	                });
	            }]
	        });
	    });
    };

    $scope.verifyMobile = function (type) {
    	var bizid;
    	switch (type) {
	    	case 1:
	    		bizid = "1005";
	    		break;
	    	case 2:
	    		bizid = "1004";
	    		break;
	    	case 3:
	    		bizid = "1006";
	    		break;
	    	case 4:
	    		bizid = "1037";
	    		break;
		}
	    kibhSystem.getBusiLogNo(bizid).then(function (data) {
	    	 $modal.open({
	             backdrop: "static",
	             templateUrl: 'apps/src/kibh/customerInfo/verifyMobile.html',
	             controller: ['$scope', '$state', '$modalInstance', '$timeout', 'myAlert', 'kibhSystem', function ($scope, $state, $modalInstance, $timeout, myAlert, kibhSystem) {
	             	 $scope.bizid = bizid;
	             	 $scope.busilogno = data[0][0].BUSI_LOG_NO;
	                 $scope.title = '验证手机号码';
	                 $scope.subtip = '下一步';
	                 $scope.code = "";
	                 $scope.fundpwd = "";

	                 $scope.subForm = function () {
	                     switch (type) {
	 	                    case 1:
	 	                    	$scope.cancel();
	 	                    	saveBasicInfo();
	 	                    	break;
	 	                    case 2:
	 	                    	$scope.cancel();
	 	                    	saveIdentityInfo();
	 	                    	break;
	 	                    case 3:
	 	                    	$scope.cancel();
	 	                    	saveOtherInfo();
	 	                    	break;
	 	                    case 4:
	 	                    	$scope.cancel();
	 	                    	saveContactInfo();
	 	                    	break;
	                     }
	                 };

	                 $scope.cancel = function () {
	                     $modalInstance.dismiss('cancel');
	                 };

	                 $modalInstance.result.then(function () {
	                     $scope.cancel();
	                 });

	                 // 兼容IE
	                 if ($.browser.msie && $.browser.version <= 9) {
	                 	$('input, textarea').placeholder();
	                 }
	             }]
	         });
	    });
    };

    kibhSystem.getBusiLogNo("1007").then(function (data) {
    	getCustomerInfo($state.current.name);
    });
    
    $scope.$on('$viewContentLoaded', function () {
    	$.filechange = function (e, sign) {
    		$scope["title" + sign] = e.value;
        };
    });
}]);