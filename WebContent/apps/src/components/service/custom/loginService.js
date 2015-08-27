'use strict';

module.exports = angular.module('ASS.service.loginService', [])
    .factory('loginService', ['myHttp', function (myHttp) {
        return {

            /**
             * 用户登录
             *
             * @param login_type          登录类型
             * @param login_name          用户名
             * @param user_password      密码
             * @param validator_code       验证码
             * @returns {*}
             */
            subLogin: function (loginuser) {
                return myHttp.post({
                    req: {
                        service: "721003",
                        uuid: loginuser.uuid,
                        validator_code: loginuser.regcode,
                        login_type: loginuser.logintype,
                        login_name: loginuser.username,
                        user_password: loginuser.userpassword
                    }
                });
            },
            /**
             * 检查资金账号 绑定注册账户手机号 是否重复
             * @param sessionid          session_id
             * @returns {*}
             */
            checkmobile: function (mobile) {
                return myHttp.post({
                    req: {
                        service: "721005",
                        phone_no: mobile
                    }
                });
            },

            /**
             * 检查资金账号 绑定注册账户手机号
             *
             * @param sessionid          session_id
             * @param mobile          手机号
             * @param code          验证码
             * @param code_id       验证码id
             * @returns {*}
             */
            bindbyCode: function (mobile, code, uuid) {
                return myHttp.post({
                    req: {
                        service: "721006",
                        bind_type: '2',
                        phone_no: mobile,
                        uuid: uuid,
                        validator_code: code
                    }
                });
            },
            /**
             * 检查资金账号 绑定注册账户手机号
             *
             * @param bing_type          绑定类型
             * @param mobile          手机号
             * @param password          密码
             * @returns {*}
             */
            bindbyPw: function (mobile, password,bind_type) {
                return myHttp.post({
                    req: {
                        service: "721006",
                        bind_type:bind_type,
                        phone_no: mobile,
                        user_password: password
                    }
                });
            },
            /**
             * 检查绑定注册账户手机号
             *
             * @param sessionid          session_id
             * @param name          资金账号
             * @param password      交易密码
             * @returns {*}
             */
            bindbyDeal: function (name, password) {
                return myHttp.post({
                    req: {
                        service: "721004",
                        fundsacct_code: name,
                        trdpwd: password
                    }
                });
            },
            /**
             * 检查资金账号
             *
             * @param sessionid          session_id
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
             * @param sessionid          session_id
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
            }
        }
    }]);
