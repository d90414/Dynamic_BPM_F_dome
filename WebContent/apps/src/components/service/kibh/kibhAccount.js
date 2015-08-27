'use strict';

module.exports = angular.module('ASS.service.kibhAccount', [])
    .factory('kibhAccount', ['myHttp', 'kibhHttp', 'kibhRoot', '$localStorage', function (myHttp, kibhHttp, kibhRoot, $localStorage) {
        return {
            // 修改交易密码
            modifyTradePwd: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860004",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        NEW_PWD: param.NEW_PWD ? param.NEW_PWD : "",
                        OLD_PWD: param.OLD_PWD ? param.OLD_PWD : "",
                        USE_SCOPE: "0"
                    }
                };
                return kibhHttp.post(params);
            },

            // 修改资金密码
            modifyMoneyPwd: function (param) {
                var bizsconfig = $localStorage.bizsconfig;
                var examinetype = bizsconfig[param.BUSINESS_ID].EXAMINE_TYPE;
                param = param || {};
                var params = {
                    req: {
                        service: "860004",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        EXAMINE_TYPE: examinetype ? examinetype : "",
                        NEW_PWD: param.NEW_PWD ? param.NEW_PWD : "",
                        OLD_PWD: param.OLD_PWD ? param.OLD_PWD : "",
                        USE_SCOPE: "1"
                    }
                };
                return kibhHttp.post(params);
            },

            // 资金查询
            getAssetInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870004",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 股份查询
            getStockInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 交割单查询
            getDeliveryOrder: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870006",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        STR_DATE: param.STR_DATE ? param.STR_DATE : "20140303",
                        END_DATE: param.END_DATE ? param.END_DATE : "20140503"
                    }
                };
                return myHttp.post(params);
            },

            // 对账单查询
            getCheckSheet: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870007",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        STR_DATE: param.STR_DATE ? param.STR_DATE : "20140303",
                        END_DATE: param.END_DATE ? param.END_DATE : "20140503"
                    }
                };
                return myHttp.post(params);
            },

            // 存管信息查询
            getDepositoryInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860121",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        CONTRACT_FLAG: param.CONTRACT_FLAG ? param.CONTRACT_FLAG : ""
                    }
                };
                return myHttp.post(params);
            },

            // 资产账户开户
            openAssetAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860022",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CURRENCY: param.CURRENCY ? param.CURRENCY : ""
                    }
                };
                return myHttp.post(params);
            },

            // 券商发起银证开户
            addBank: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860010",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CURRENCY: param.CURRENCY ? param.CURRENCY : "",
                        EXT_ORG: param.EXT_ORG ? param.EXT_ORG : "",
                        BANK_ACCT: param.BANK_ACCT ? param.BANK_ACCT : "",
                        MAIN_FLAG: param.MAIN_FLAG ? param.MAIN_FLAG : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : ""
                    }
                };
                return myHttp.post(params);
            },

            // 劵商发起银证销户
            deleteBank: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860011",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CURRENCY: param.CURRENCY ? param.CURRENCY : "",
                        EXT_ORG: param.EXT_ORG ? param.EXT_ORG : "",
                        BANK_ACCT: param.BANK_ACCT ? param.BANK_ACCT : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : ""
                    }
                };
                return myHttp.post(params);
            },

            /*操作类型	OPERATION_TYPE
             协议类型	CUST_AGMT_TYPE
             交易板块	STKBD
             交易账户	TRDACCT
             业务ID	BUSINESS_ID
             业务流水号	BUSI_LOG_NO
             */
            // 开通权限
            openRights: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860017",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        //STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        //TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                if (bizsconfig[param.BUSINESS_ID].RIGHT_LVL == 2) {
                	params.req.STKBD = param.STKBD ? param.STKBD : "";
                	params.req.TRDACCT = param.TRDACCT ? param.TRDACCT : "";
                }
                return myHttp.post(params);
            },

            // 开通港股通
            openHKStock: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860018",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 开通创业板
            openGEMBoard: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860171",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        GEM_TYPE: param.GEM_TYPE ? param.GEM_TYPE : ""
                    }
                };
                return myHttp.post(params);
            },

            // 开通退市整理板
            openDelistStock: function (param) {
                param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860172",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },
            
            // 开通风险警示板
            openRiskStock: function (param) {
            	param = param || {};
                var bizsconfig = $localStorage.bizsconfig;
                var CUST_AGMT_TYPE = bizsconfig[param.BUSINESS_ID].CUST_AGMT_TYPE;
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860173",
                        CUST_AGMT_TYPE: CUST_AGMT_TYPE,
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        OPERATION_TYPE: param.OPERATION_TYPE ? param.OPERATION_TYPE : "",
                        STKBD: param.STKBD ? param.STKBD : "",
                        CUACCT_CODE: param.CUACCT_CODE ? param.CUACCT_CODE : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取股东帐户
            getStockAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860029"
                    }
                };
                return myHttp.post(params);
            },

            // 获得客户业务请求审核表数据
            getAuditData: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890013",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 客户资料查询
            getUserAcctData: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860008",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 客户可操作渠道修改
            updateDelegateMethod: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860043",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CHANNELS: param.CHANNELS ? param.CHANNELS : ""
                    }
                };
                return kibhHttp.post(params);
            }
        }
    }]);
