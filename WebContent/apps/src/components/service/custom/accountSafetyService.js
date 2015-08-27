'use strict';

module.exports = angular.module('ASS.service.accountSafetyService', [])
    .factory('accountSafetyService', ['myHttp', '$window', function (myHttp, $window) {
        return {
            /**
             * 修改密码
             *
             * @param param
             * @returns {*}
             */
            updatePassword: function (param) {
                var params = {
                    req: {
                        service: "720008",
                        session_id: $window.sessionStorage.sessionid,
                        old_pwd: param.old_pwd,
                        first_pwd: param.first_pwd
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 修改绑定邮箱之发送邮件
             *
             * @param param
             * @returns {*}
             */
            sendEmail: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720012",
                        mail_address: param.mail_address ? param.mail_address : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 修改绑定邮箱之验证链接
             *
             * @param param
             * @returns {*}
             */
            checkEmail: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720010",
                        safe_user_id: param.safe_user_id ? param.safe_user_id : "",
                        safe_user_name: param.safe_user_name ? param.safe_user_name : "",
                        safe_random_code: param.safe_random_code ? param.safe_random_code : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 修改绑定手机
             *
             * @param param
             * @returns {*}
             */
            updateBindingPhone: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720011",
                        session_id: $window.sessionStorage.sessionid,
                        new_phone_no: param.new_phone_no ? param.new_phone_no : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 发送手机验证码
             *
             * @param param
             * @returns {*}
             */
            sendPhoneCertifyCode: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720002",
                        phone_no: param.phone_no ? param.phone_no : "",
                        biz_type: param.biz_type ? param.biz_type : "getlost"
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 验证手机验证码
             *
             * @param param
             * @returns {*}
             */
            checkPhoneCertifyCode: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "720003",
                        phone_no: param.phone_no ? param.phone_no : "",
                        verify_code: param.verify_code ? param.verify_code : "",
                        code_id: param.code_id ? param.code_id : "",
                        biz_type: param.biz_type ? param.biz_type : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 验证资金账号交易密码
             *
             * @param param
             * @returns {*}
             */
            checkBexIdAndPwd: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "721007",
                        fundsacct_code: param.fundsacct_code ? param.fundsacct_code : "",
                        trdpwd: param.trdpwd ? param.trdpwd : ""
                    }
                };
                return myHttp.post(params);
            }
        };
    }]);
