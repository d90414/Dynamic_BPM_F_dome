'use strict';

module.exports = angular.module('ASS.service.confirmorderService', [])
    .factory('confirmorderService', ['myHttp', 'kibhRoot', function (myHttp, kibhRoot) {
        return {

            // 根据业务ID获取问卷数据
            getTestInfo: function (param) {

                param = param || {};
                var params = {
                    root: kibhRoot,
                    req: {
                        service: "890002",
                        BUSINESS_ID: param.BUSINESS_ID ? param.BUSINESS_ID : ""
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

            // 检查客户产品风险情况
            checkType: function (ord_datas) {
                var params = {
                    req: {
                        service: "740009",
                        ord_datas: ord_datas
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
