'use strict';

module.exports = angular.module('ASS.service.kibhSystem', [])
    .factory('kibhSystem', ['myHttp', 'kibhRoot', function (myHttp, kibhRoot) {
        return {
            // 获取登录用户信息
            getLogUserInfo: function () {
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890023"
                    }
                });
            },

            // 获取登录用户开通的权限状态
            getUserBizs: function (param) {
                param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "860024",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                });
            },

            // 获取登录用户风险测评
            getRiskTest: function () {
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "860027"
                    }
                });
            },

            // 获取登录用户风险测评是否过期
            getRiskTestRlt: function (param) {
            	param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "860027",
                        SURVEY_CLS: param.SURVEY_CLS ? param.SURVEY_CLS : "0"
                    }
                });
            },

            // 获取业务信息
            getBusinessInfo: function (param) {
                param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890001",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSINESS_CLS: param.BUSINESS_CLS ? param.BUSINESS_CLS : ""
                    }
                });
            },

            // 获取业务菜单
            getBizMenu: function () {
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890011"
                    }
                });
            },

            // 获取字典
            getDictInfo: function (param) {
                param = param || {};
                return myHttp.post({
                    root: kibhRoot,
                    req: {
                        service: "890020",
                        DICT_CODE: param.DICT_CODE ? param.DICT_CODE : ""
                    }
                });
            },

            // 根据业务ID获取问卷数据
            getTestInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890002",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        EXTERNAL_PAPER_NO: param.EXTERNAL_PAPER_NO ? param.EXTERNAL_PAPER_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 根据问卷ID获取问题集
            getQuestions: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890003",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 根据问卷ID获取答案集
            getAnswers: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890004",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取电子协议ID、名称、url
            getProtocolInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890005",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 查询客户电子协议签约结果
            getProtocolRlt: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890048",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        AGREEMENT_ID: param.AGREEMENT_ID ? param.AGREEMENT_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 保存客户签署协议
            saveProtocolSign: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890009",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        AGREEMENT_ID: param.AGREEMENT_ID ? param.AGREEMENT_ID : "",
                        SIGN_TYPE: param.SIGN_TYPE ? param.SIGN_TYPE : "",
                        SIGN_REMARK: param.SIGN_REMARK ? param.SIGN_REMARK : ""
                    }
                };
                return myHttp.post(params);
            },

            // 保存客户问卷答题
            saveTestInfo: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890010",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : "",
                        ANSWER_RES: param.ANSWER_RES ? param.ANSWER_RES : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取流水号
            getBusiLogNo: function (bizid) {
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890015",
                        BUSINESS_ID: bizid ? bizid : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取手机验证码
            getMobileCode: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890017",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取新手机验证码
            getNewMobileCode: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890027",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        PHONE_NO: param.PHONE_NO ? param.PHONE_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 校验验证码
            checkVerifiCode: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890018",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        CODE_ID: param.CODE_ID ? param.CODE_ID : "",
                        VERIFY_CODE: param.VERIFY_CODE ? param.VERIFY_CODE : "",
                        PHONE_NO: param.PHONE_NO ? param.PHONE_NO : ""
                    }
                };
                return myHttp.post(params);
            },

            // 校验资金密码
            checkMoneyPwd: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "870012",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        FUND_PWD: param.FUND_PWD ? param.FUND_PWD : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取创业板适当性
            checkGEMBoard: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890024",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取港股通适当性
            checkHKStock: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890025",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : ""
                    }
                };
                return myHttp.post(params);
            },

            // 获取退市整理板适当性
            checkDelistStock: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890026",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TRDACCT: param.TRDACCT ? param.TRDACCT : ""
                    }
                };
                return myHttp.post(params);
            },

            // 基金账户开户
            openFundAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860038",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        TA_CODE: param.TA_CODE ? param.TA_CODE : "",
                        BILL_MAIL_TYPE: param.BILL_MAIL_TYPE ? param.BILL_MAIL_TYPE : "",
                        DIV_METHOD: param.DIV_METHOD ? param.DIV_METHOD : ""
                    }
                };
                return myHttp.post(params);
            },

            // 基金账户查询
            getFundAccount: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860039",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
                    }
                };
                return myHttp.post(params);
            },
            
            // 机构信息查询
            getFundCompany: function (param) {
                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "860044",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        QUERY_FLAG: param.QUERY_FLAG ? param.QUERY_FLAG : ""
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
