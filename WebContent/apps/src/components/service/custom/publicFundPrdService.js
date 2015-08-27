'use strict';
// 公募基金
module.exports = angular.module('ASS.service.publicFundPrdService', [])
    .factory('publicFundPrdService', ['myHttp', function (myHttp) {
        return {
            getList: function (parms, page) {
                return myHttp.post({req: {service: "710007", sale_sta: parms.sale_sta, risk_lvl: parms.risk_lvl, invest_type: parms.invest_type,
                    iss_mat: parms.iss_mat, iss_code: parms.iss_code, cur_page: page.currentpage, ret_rows: page.pagesize}})
            },
            recommendList: function () {
                return myHttp.post({req: {service: "710003", pref_type: 3, ret_rows: 4, cur_page: 1}})
            },

            getAll: function () {
                return myHttp.post({req: {service: "710007"}});
            }
        }
    }]);
