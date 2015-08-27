'use strict';

module.exports = angular.module('ASS.service.orderpayService', [])
    .factory('orderpayService', ['myHttp', function (myHttp) {
        return {

            /**
             * 绑定账户
             *
             * @param login_name          用户名
             * @param user_password      密码
             * @param session_id      session_id
             * @returns {*}
             */
            bindaccount: function (user) {
                return myHttp.post({
                    req: {
                        service: "721003",
                        session_id: user.sessionid,
                        login_name: user.name,
                        user_password: user.userpassword
                    }
                });
            },
            /**
             * 获取订单信息
             *
             * @param trd_no         父订单号
             * @returns {*}
             */
            getOrderList: function (trd_no) {
                return myHttp.post({
                    req: {
                        service: "740006",
                        trd_sta: 1,
                        trd_sno: trd_no
                    }
                });
            },
            /**
             * 获取资金账号信息
             * @param
             * @returns {*}
             */
            getJZJYZJAccount: function () {
                return myHttp.post({
                    req: {
                        service: "770004"
                    }
                });
            },
            /**
             * 获取资金账号信息
             * @param
             * @returns {*}
             */
            getOTCZJAccount: function () {
                return myHttp.post({
                    req: {
                        service: "750013"
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
             * 订单付款。
             *
             * @param param
             *   - trd_sno       父订单ID
             *   - browser_type  浏览器类型标记，如果为‘2‘，表示通过手机验证码下单，则phone_id,verify_code必须传入
             *   - phone_no      手机号
             *   - code_id       手机验证码ID
             * @returns {*}
             */
            subOrder: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740008",
                        pay_way: param.pay_way ? param.pay_way : '',
                        trd_sno: param.trd_sno ? param.trd_sno : '',
                        browser_type: param.browser_type ? param.browser_type : '',
                        phone_no: param.phone_no ? param.phone_no : '',
                        verify_code: param.verify_code ? param.verify_code : ''
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
