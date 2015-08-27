'use strict';

module.exports = angular.module('ASS.service.scartService', [])
    .factory('scartService', ['myHttp', function (myHttp) {
        return {
            addScart: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740001",
                        cart_datas: param.cart_datas ? param.cart_datas : ""
                    }
                };
                return myHttp.post(params);
            },

            modifyScart: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740002",
                        cart_datas: param.cart_datas ? param.cart_datas : ""
                    }
                };
                return myHttp.post(params);
            },

            deleteScart: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740003",
                        pro_id: param.pro_id ? param.pro_id : ""
                    }
                };
                return myHttp.post(params);
            },

            getScart: function () {
                var params = {
                    req: {
                        service: "740004"
                    }
                };
                return myHttp.post(params);
            },
            orderConfim: function (payway, params) {
                var params = {
                    req: {
                        service: "740005",
                        pay_way: payway,
                        ord_datas: params
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
