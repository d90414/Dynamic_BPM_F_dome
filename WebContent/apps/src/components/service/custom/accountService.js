'use strict';

module.exports = angular.module('ASS.service.accountService', [])
    .factory('accountService', ['myHttp', '$window', function (myHttp, $window) {
        return {
            /**
             * 获取登陆用户信息。
             *
             * @param param
             * @returns {*}
             */
            getLoginUserInfo: function () {
                var params = {
                    req: {
                        service: "720000"
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询账户资料。
             *
             * @param param
             * @returns {*}
             */
            getInfo: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720005",
                        SESSION_ID: param.session_id ? param.session_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的消息/系统消息。
             *
             * @param param
             * @returns {*}
             */
            getMessages: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720006",
                        OPER_FLAG: "select",
                        MESSAGE_TYPE: param.message_type ? param.message_type : "",
                        MESSAGE_ID: param.message_id ? param.message_id : "",
                        HASREAD: param.hasread ? param.hasread : "",
                        CUR_PAGE: param.cur_page ? param.cur_page : 1,
                        RET_ROWS: param.ret_rows ? param.ret_rows : 10,
                        ORDER_BY: param.order_by ? param.order_by : "CREATE_TIME DESC"
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 更新消息状态（未读变已读）。
             *
             * @param param
             * @returns {*}
             */
            updataMessage: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720006",
                        OPER_FLAG: "update",
                        MESSAGE_ID: param.message_id ? param.message_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 删除消息。
             *
             * @param param
             * @returns {*}
             */
            deleteMessagesById: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720006",
                        OPER_FLAG: "delete",
                        MESSAGE_TYPE: param.message_type ? param.message_type : "",
                        MESSAGE_ID: param.message_id ? param.message_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的收藏。
             *
             * @param param
             *   - NEED_DETAIL "0"表示要把收藏的产品详情查出来, "1"表示只查产品ID就可以。
             * @returns {*}
             */
            getMyFavorites: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720001",
                        OPER_FLAG: "select",
                        NEED_DETAIL: param.need_detail ? param.need_detail : '1',
                        PRO_ID: param.pro_id ? param.pro_id : "",
                        LVL2_TYPE: param.lvl2_type ? param.lvl2_type : "",
                        CUR_PAGE: param.cur_page ? param.cur_page : -1,
                        RET_ROWS: param.ret_rows ? param.ret_rows : "",
                        ORDER_BY: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            },


            /**
             * 删除我的收藏。
             *
             * @param param
             * @returns {*}
             */
            deleteMyFavorites: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720001",
                        OPER_FLAG: "delete",
                        PRO_ID: param.pro_id ? param.pro_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 加入到我的收藏。
             *
             * @param param
             * @returns {*}
             */
            addMyFavorite: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720001",
                        OPER_FLAG: "add",
                        PRO_ID: param.pro_id ? param.pro_id : "",
                        LVL2_TYPE: param.lvl2_type ? param.lvl2_type : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的订单。
             *
             * @param param
             * @returns {*}
             */
            getOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740006",
                        trd_sno: param.trd_sno ? param.trd_sno : "",
                        trd_sta: param.trd_sta ? param.trd_sta : "",
                        start_date: param.start_date ? param.start_date : "",
                        end_date: param.end_date ? param.end_date : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : "10",
                        order_by: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 删除我的订单(可批量)。
             *
             * @param param
             * @returns {*}
             */
            deleteOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740007",
                        app_sno: param.app_sno ? param.app_sno : ""
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 查询绑定的银行卡
             *
             * @param param
             * @returns {*}
             */
            getBankList: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721010"
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 新增绑定的银行卡
             *
             * @param param
             * @returns {*}
             */
            addBank: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721011",
                        bnk_id: param.bank_no ? param.bank_no : '',
                        acct_num: param.bank_account ? param.bank_account : '',
                        hld_name: param.user_name ? param.user_name : '',
                        cer_num: param.cardno ? param.cardno : '',
                        tel_num: param.user_phone ? param.user_phone : ''
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 移除绑定的银行卡
             *
             * @param param
             * @returns {*}
             */
            delBank: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721012",
                        bnk_id: param.bank_no ? param.bank_no : '',
                        acct_num: param.bank_account ? param.bank_account : '',
                        hld_name: param.user_name ? param.user_name : '',
                        cer_num: param.cardno ? param.cardno : '',
                        tel_num: param.user_phone ? param.user_phone : ''
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 撤销我的订单。
             *
             * @param param
             * @returns {*}
             */
            cancelOrders: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740010",
                        ext_app_sno: param.EXT_APP_SNO ? param.EXT_APP_SNO : "",
                        trd_id: param.TRD_ID ? param.TRD_ID : "",
                        pro_sou: param.PRO_SOU ? param.PRO_SOU : "",
                        app_date: param.APP_DATE ? param.APP_DATE : "",
                        ta_code: param.TA_CODE ? param.TA_CODE : "",
                        trans_acct: param.TRANS_ACCT ? param.TRANS_ACCT : "",
                        order_date: param.ORDER_DATE ? param.ORDER_DATE : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询我的产品。
             *
             * @param param
             *   - pro_type  产品类型（'4'表示资管产品，'6'基金, '486'柜台）
             *   - inst_id     (集中交易产品代码)（otc产品编号）
             * @returns {*}
             */
            getMyProducts: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740011",
                        pro_type: param.lvl2_type ? param.lvl2_type : "",
                        inst_id: param.inst_id ? param.inst_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 赎回我的产品。
             *
             * @param param
             *   - pro_sou     来源
             *   - inst_id     (集中交易产品代码)（otc产品编号）
             *   - trd_qty     赎回金额
             *   - charge_cls  收费方式（集中交易产品有，otc没有）
             *   - ta_code     登记机构
             *   - trans_acct  交易账号
             * @returns {*}
             */
            redeemMyProduct: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740012",
                        pro_sou: param.pro_sou ? param.pro_sou : "",
                        inst_id: param.inst_id ? param.inst_id : "",
                        trd_qty: param.trd_qty ? param.trd_qty : "",
                        charge_cls: param.charge_cls ? param.charge_cls : "",
                        ta_code: param.TA_CODE ? param.TA_CODE : "",
                        trans_acct: param.TRANS_ACCT ? param.TRANS_ACCT : ""
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 绑定新账户。
             *
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            addBindAccount: function (name, password) {
                return myHttp.post({
                    req: {
                        service: "721009",
                        fundsacct_code: name,
                        trdpwd: password
                    }
                });
            },
            /**
             * 验证资金账号
             * @param login_name 资金账号
             * @param user_password 交易密码
             * @returns {*}
             */
            checkAccount: function (login_name, user_password) {
                return myHttp.post({
                    req: {
                        service: "721008",
                        login_type: 3,
                        login_name: login_name,
                        user_password: user_password
                    }
                });
            },

            /**
             * 查询客户可取资金。
             *
             * @param param
             *   - fundid     资金账号
             *   - moneytype  货币代码
             * @returns {*}
             */
            getMaxDraw: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '721018',
                        fundid: param.fundid ? param.fundid : '',
                        moneytype: param.moneytype ? param.moneytype : '',
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询银证转账信息
             * @returns {*}
             */
            getBankTransferInfo: function () {
                return myHttp.post({
                    req: {
                        service: "721013"
                    }
                });
            },
            /**
             * 银证转账
             * @param login_name 资金账号
             * @param user_password 交易密码
             * @returns {*}
             */
            banktransfer: function (param) {
                return myHttp.post({
                    req: {
                        service: "721014",
                        bankpwd: param.bankpwd ? param.bankpwd : '',
                        fundpwd: param.fundpwd ? param.fundpwd : '',
                        banktrantype: param.banktrantype ? param.banktrantype : '',
                        tranamt: param.transfer_money ? param.transfer_money : 0
                    }
                });
            },
            /**
             * 查询银证转账记录
             * @returns {*}
             */
            getTransferList: function () {
                return myHttp.post({
                    req: {
                        service: "721015"
                    }
                });
            },
            /**
             * 检查资金账号
             *
             * @param sessionid     session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            chkAcct: function (name, password) {
                return myHttp.post({
                    req: {
                        service: "721016",
                        fundsacct_code: name,
                        trdpwd: password
                    }
                });
            },
            /**
             * 检查手机验证码是否正确
             *
             * @param sessionid     session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            chkmobilecode: function (param) {
                return myHttp.post({
                    req: {
                        service: "721017",
                        mobile_code: param.code,
                        mobile: param.mobile
                    }
                });
            },
            /*获取手机验证码*/
            getReCode: function (phoneNo) {
                return myHttp.post({req: {service: "720002", phone_no: phoneNo, biz_type: "getDealCode"}});
            },

            // 根据业务ID获取问卷数据
            getTestInfo: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740020",
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
                    req: {
                        service: "740021",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 根据问卷ID获取答案集
            getAnswers: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740022",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : ""
                    }
                };
                return myHttp.post(params);
            },

            // 保存客户问卷答题
            saveTestInfo: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740023",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : "",
                        BUSI_LOG_NO: param.BUSI_LOG_NO ? param.BUSI_LOG_NO : "",
                        PAPER_ID: param.PAPER_ID ? param.PAPER_ID : "",
                        ANSWER_RES: param.ANSWER_RES ? param.ANSWER_RES : ""
                    }
                };
                return myHttp.post(params);
            },


            // 获取风险测评结果
            getRiskResult: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740025",
                        USER_CODE: param.USER_CODE ? param.USER_CODE : '',
                        INT_ORG: param.INT_ORG ? param.INT_ORG : '',
                        SURVEY_CLS: param.SURVEY_CLS ? param.SURVEY_CLS : ''
                    }
                };
                return myHttp.post(params);
            }

        }
    }]);
