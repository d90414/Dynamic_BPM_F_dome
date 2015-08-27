'use strict';

// 专区（理财产品首页）service
module.exports = angular.module('ASS.service.exclusiveService', [])
    .factory('exclusiveService', ['myHttp', function (myHttp) {
        return {
            /**
             * 专区产品查询。
             *
             * @param param
             *     pref_id     专区编号
             *     pref_type   专区类型
             *     pro_type    产品类型
             *     inve_start  投资起点（元）
             *     cur_page    分页页码
             *     ret_rows    每页数据条数
             *     order_by    排序字段
             *     lvl2_type   产品二级分类
             *     ext_con     扩展条件
             * @returns {*}
             */
            getPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        pref_id: param.pref_id ? param.pref_id : "",
                        pref_type: param.pref_type ? param.pref_type : "",
                        lvl2_type: param.lvl2_type ? param.lvl2_type : "",
                        pro_type: param.pro_type ? param.pro_type : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        ext_con: param.ext_con ? param.ext_con : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "ORDER_BY"
                    }
                };
                return myHttp.post(params);
            }
        }
    }]);
