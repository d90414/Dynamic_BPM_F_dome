'use strict';

module.exports = angular.module('ASS.service.orderService', [])
    .factory('orderService', ['myHttp', function (myHttp) {
        return {
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
                        service: '740006',
                        trd_no: param.trd_no ? param.trd_no : '',
                        trd_sta: param.trd_sta ? param.trd_sta : '',
                        start_date: param.start_date ? param.start_date : '',
                        end_date: param.end_date ? param.end_date : '',
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : '10',
                        order_by: param.order_by ? param.order_by : ''
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
                        service: '740007',
                        app_sno: param.app_sno ? param.app_sno : ''
                    }
                };
                return myHttp.post(params);
            },


            /**
             * 下单。
             *
             * @param param
             *   - pay_way      支付方式
             *   - recommended  推荐人
             *   - ord_datas    订单（数组形式）
             * @returns {*}
             */
            orderApply: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '740005',
                        pay_way: param.pay_way ? param.pay_way : '',
                        recommended: param.recommended ? param.recommended : '',
                        ord_datas: param.ord_datas ? param.ord_datas : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询是否为首次购买。
             *
             * @param param
             *   - pro_sou  产品来源
             *   - inst_id  机构编号
             * @returns {*}
             */
            isFirstPurchase: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '740013',
                        pro_sou: param.pro_sou ? param.pro_sou : '',
                        inst_id: param.inst_id ? param.inst_id : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 基金账户开户。
             *
             * @param param
             * -  ta_code 基金登记公司
             * @returns {*}
             */
            openFundAccount: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '740017',
                        ta_code: param.ta_code ? param.ta_code : '',
                        bill_mail_type: param.bill_mail_type ? param.bill_mail_type : '1',
                        div_method: param.div_method ? param.div_method : '1'
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
