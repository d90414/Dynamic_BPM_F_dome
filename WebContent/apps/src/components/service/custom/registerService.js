'use strict';

module.exports = angular.module('ASS.service.registerService', [])
    .factory('registerService', ['myHttp', function (myHttp) {
        return {
            /*获取手机验证码*/
            getReCode: function (phoneNo) {
                return myHttp.post({req: {service: "720002", phone_no: phoneNo, biz_type: "newreg"}});
            },
            /*获取手机验证码*/
            checkUserName: function (userName) {
                return myHttp.post({req: {service: "721002", user_name: userName}});
            },


            /**
             * 注册
             *
             * @param user_mobile    手机号
             * @param validator_code  验证码
             * @param user_name      用户名
             * @param user_password   用户密码
             * @param email      邮箱
             * @returns {*}
             */
            registerUser: function (pamarm) {
                return myHttp.post({
                    req: {
                        service: "721001",
                        user_mobile: pamarm.mobile,
                        validator_code: pamarm.code,
                        user_name: pamarm.name,
                        user_password: pamarm.password,
                        user_email: pamarm.email,
                        key: ""
                    }
                });
            }
        }
    }]);
