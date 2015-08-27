'use strict';

module.exports = angular.module('ASS.service.pwrecoveryService', [])
    .factory('pwrecoveryService', ['myHttp', function (myHttp) {
        return {
            /*获取手机验证码*/
            getReCode: function (phoneNo) {
                return myHttp.post({req: {service: "720002", phone_no: phoneNo, biz_type: "getlost"}});
            },

            /**
             * 验证手机
             *
             * @param phone_no    手机号
             * @param verify_code  验证码
             * @param code_id  验证码id
             * @returns {*}
             */
            checkMobile: function (pamarm) {
                return myHttp.post({
                    req: {
                        service: "720003",
                        phone_no: pamarm.mobile,
                        verify_code: pamarm.code,
                        code_id: pamarm.code_id
                    }
                });
            },

            /**
             * 重置密码
             *
             * @param safe_user_id   用户id
             * @param first_pwd  密码
             * @returns {*}
             */
            updatepw: function (pamarm) {
                return myHttp.post({
                    req: {
                        service: "720007",
                        safe_user_id: pamarm.safe_user_id,
                        first_pwd: pamarm.password
                    }
                });
            },
            /**
             * 邮箱重置密码验证
             *
             * @param safe_user_id   用户id
             * @param first_pwd  密码
             * @returns {*}
             */
            checkURLByEmail: function (uid, rtxt) {
                return myHttp.post({
                    req: {
                        service: "720009",
                        safe_random_code: rtxt,
                        safe_user_id: uid
                    }
                });
            },
            /**
             * 发送邮件
             *
             * @param mail_address   邮件地址
             * @returns {*}
             */
            sendEmail: function (email) {
                return myHttp.post({
                    req: {
                        service: "720004",
                        mail_address: email
                    }
                });
            }

        }
    }]);
