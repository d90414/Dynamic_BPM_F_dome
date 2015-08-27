'use strict';

module.exports = angular.module('ASS.service.kibhCustomer', [])
    .factory('kibhCustomer', ['myHttp', 'kibhHttp', 'kibhRoot', '$localStorage', function (myHttp, kibhHttp, kibhRoot, $localStorage) {
        return {
            // 发送影像到账户
            saveIdentityInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860002",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        ID_CODE: param.ID_CODE ? param.ID_CODE : ""
                    }
                };
                return myHttp.post(params);
            },

            // 用户手机号码修改
            modifyMobileInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        MOBILE_TEL: param.MOBILE_TEL ? param.MOBILE_TEL : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户普通资料修改
            modifyBasicInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        TEL: param.TEL ? param.TEL : "",
                        EMAIL: param.EMAIL ? param.EMAIL : "",
                        ADDRESS: param.ADDRESS ? param.ADDRESS : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户重要资料修改
            modifyVitalInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860006",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        ID_TYPE: param.ID_TYPE ? param.ID_TYPE : "",
                        ID_CODE: param.ID_CODE ? param.ID_CODE : "",
                        ID_ADDR: param.ID_ADDR ? param.ID_ADDR : "",
                        ID_ISS_AGCY: param.ID_ISS_AGCY ? param.ID_ISS_AGCY : "",
                        ID_BEG_DATE: param.ID_BEG_DATE ? param.ID_BEG_DATE : "",
                        ID_EXP_DATE: param.ID_EXP_DATE ? param.ID_EXP_DATE : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户拓展信息修改
            modifyOtherInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860126",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        OCCU_TYPE: param.OCCU_TYPE ? param.OCCU_TYPE : "",
                        TRADE: param.TRADE ? param.TRADE : "",
                        EDUCATION: param.EDUCATION ? param.EDUCATION : "",
                        OCCUPATION: param.OCCUPATION ? param.OCCUPATION : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 用户基本资料查询
            getBasicInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860007",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 用户拓展信息查询
            getOtherInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860037",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 联系人查询
            getContactInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860025",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 联系人修改
            modifyContactInfo: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860026",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        LINKMAN_DELX: param.LINKMAN_DELX ? param.LINKMAN_DELX : "",
                        LINKMAN_TEL_DELX: param.LINKMAN_TEL_DELX ? param.LINKMAN_TEL_DELX : "",
                        LINKMAN_TEL_XXFS: param.LINKMAN_TEL_XXFS ? param.LINKMAN_TEL_XXFS : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // 资产账户查询
            getAssetStatus: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860021",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 资产状态维护(冻结、解冻)
            setAssetStatus: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860015",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        CUACCT_STATUS: param.CUACCT_STATUS ? param.CUACCT_STATUS : "0",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return kibhHttp.post(params);
            },

            // OCR
            doOcrReq: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860104",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        FILE_CON: param.FILE_CON ? param.FILE_CON : "",
                        FACE_MARK: param.FACE_MARK ? param.FACE_MARK : "FRONT"
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
