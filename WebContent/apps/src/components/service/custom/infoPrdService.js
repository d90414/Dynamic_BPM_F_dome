'use strict';
// 资讯产品
module.exports = angular.module('ASS.service.infoPrdService', [])
    .factory('infoPrdService', ['myHttp', function (myHttp) {
        return {
            getList: function (parms, page) {
                return myHttp.post({req: {service: "710012", sale_sta: parms.sale_sta, fee_type: parms.fee_type, fee_mode: parms.fee_mode,
                    sup_id: parms.sup_id, cur_page: page.currentpage, ret_rows: page.pagesize}})
            },
            recommendList: function () {
                return myHttp.post({req: {service: "710003", pref_type: 3, ret_rows: 4, cur_page: 1}})
            }
        }
    }]);
