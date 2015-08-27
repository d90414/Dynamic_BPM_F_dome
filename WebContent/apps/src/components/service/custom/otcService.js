'use strict';

module.exports = angular.module('ASS.service.otcService', [])
    .factory('otcService', ['myHttp', function (myHttp) {
        return {
            /**
             * OTC开户。
             *
             * @param param
             * @returns {*}
             */
            openOtcAccount: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740015",
                        ta_code: param.ta_code ? param.ta_code : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * OTC登记机构开通。
             *
             * @param param
             * @returns {*}
             */
            openOtcReg: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740016",
                        ta_code: param.ta_code ? param.ta_code : ''
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
