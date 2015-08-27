'use strict';

module.exports = angular.module('ASS.service.adnotService', [])
    .factory('adnotService', ['myHttp', function (myHttp) {
        return {
            /**
             * 查询广告公告
             * @param param
             *   - type      广告公告类型
             *   - type_val  广告公告类别
             *   - stat      状态（1启用 0停用）
             *   - id        ID
             *   - name      标题
             *   - ext_con   扩展条件
             *   - cur_page  当前页数
             *   - ret_rows  返回行数
             *   - order_by  排序字段
             * @returns {*}
             */
            getAdOrNote: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "730003",
                        type: param.type ? param.type : "",
                        type_val: param.type_val ? param.type_val : "",
                        stat: param.stat ? param.stat : "",
                        id: param.id ? param.id : "",
                        name: param.name ? param.name : "",
                        ext_con: param.ext_con ? param.ext_con : "",
                        cur_page: param.cur_page ? param.cur_page : "1",
                        ret_rows: param.ret_rows ? param.ret_rows : "10",
                        order_by: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            }

        }
    }]);
