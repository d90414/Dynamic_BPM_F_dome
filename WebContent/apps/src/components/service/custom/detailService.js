'use strict';

module.exports = angular.module('ASS.service.detailService', [])
    .factory('detailService', ['myHttp', function (myHttp) {
        return {
            getDetail: function (params) {//controller 统一传具体的业务参数对象
                var reqParams = {};
                reqParams.req = params;
                return myHttp.post(reqParams);
            },
            getList: function (params) {
                var reqParams = {};
                reqParams.req = params;
                return myHttp.post(reqParams);
            },

            /**
             * 查询产品公告。
             *
             * @param param
             *   - pro_id        产品编号
             *   - not_id        公告编号
             *   - type_id       公告类型
             *   - par_ type_id  父类型编号
             *   - qry_type      查询标识
             *   - cur_page      分页页码
             *   - ret_rows      每页数据条数
             *   - order_by      排序字段
             * @returns {*}
             */
            getPrdNoteFile: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710021',
                        pro_id: param.pro_id ? param.pro_id : '',
                        not_id: param.not_id ? param.not_id : '',
                        type_id: param.type_id ? param.type_id : '',
                        par_type_id: param.par_type_id ? param.par_type_id : '',
                        qry_type: param.qry_type ? param.qry_type : '',
                        cur_page: param.cur_page ? param.cur_page : '',
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品详情。
             *
             * @param param
             *   - pro_id    产品编号
             *   - pro_code  产品代码
             *
             * @returns {*}
             */
            getPrdDetail: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710013',
                        pro_id: param.pro_id ? param.pro_id : '',
                        pro_code: param.pro_code ? param.pro_code : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品投资组合（资产配置）。
             *
             * @param param
             * @returns {*}
             */
            getAssetAllocation: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710022',
                        pro_id: param.pro_id ? param.pro_id : '',
                        cur_page: param.cur_page ? param.cur_page : '',
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询组合产品详情。
             *
             * @param param
             *   - pro_id    产品编号
             *
             * @returns {*}
             */
            getZhcp: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710016",
                        pro_id: param.pro_id ? param.pro_id : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品净值。
             *
             * @param param
             *    - pro_id    产品编号
             *    - trd_date  净值日期
             *    - cur_page  分页页码
             *    - ret_rows  每页数据条数
             *    - order_by  排序字段
             * @returns {*}
             */
            getPrdPriceValue: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710019',
                        pro_id: param.pro_id ? param.pro_id : '',
                        trd_date: param.trd_date ? param.trd_date : '',
                        cur_page: param.cur_page ? param.cur_page : '',
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品分红信息。
             *
             * @param param
             *   - pro_id    产品编号
             *   - qry_type  查询标识
             *   - cur_page  分页页码
             *   - ret_rows  每页数据条数
             *   - order_by  排序字段
             * @returns {*}
             */
            getPrdBonus: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710020',
                        pro_id: param.pro_id ? param.pro_id : '',
                        qry_type: param.qry_type ? param.qry_type : '',
                        cur_page: param.cur_page ? param.cur_page : '1',
                        ret_rows: param.ret_rows ? param.ret_rows : '10'
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询组合产品配置详情。
             *
             * @param param
             *   - pack_pro_id    产品编号
             *   - pack_pro_code  产品代码
             *   - ext_con        扩展条件
             *   - cur_page       当前页数
             *   - ret_rows       返回行数
             *   - order_by       排序字段

             * @returns {*}
             */
            getZhcpAssetAllocation: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710017',
                        pack_pro_id: param.pack_pro_id ? param.pack_pro_id : '',
                        pack_pro_code: param.pack_pro_code ? param.pack_pro_code : '',
                        ext_con: param.ext_con ? param.ext_con : '',
                        cur_page: param.cur_page ? param.cur_page : -1,
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询产品费率结构。
             *
             * @param param
             *   - pro_id    产品编号
             *   - fee_type  收费类型
             *   - fee_mode  收费模式
             *   - ext_con   扩展条件
             *   - cur_page  当前页数
             *   - ret_rows  返回行数
             *   - order_by  排序字段

             * @returns {*}
             */
            getRateStructure: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710023',
                        pro_id: param.pro_id ? param.pro_id : '',
                        fee_type: param.fee_type ? param.fee_type : '',
                        fee_mode: param.fee_mode ? param.fee_mode : '',
                        ext_con: param.ext_con ? param.ext_con : '',
                        cur_page: param.cur_page ? param.cur_page : -1,
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 查询资讯产品价格
             *
             * @param param
             *   - PRO_ID
             *   - FEE_TYPE
             *   - FEE_MODE
             *   - CUR_PAGE
             *   - RET_ROWS
             *   - ORDER_BY

             * @returns {*}
             */
            getZxPrdPrice: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: '710025',
                        pro_id: param.pro_id ? param.pro_id : '',
                        fee_type: param.fee_type ? param.fee_type : '',
                        fee_mode: param.fee_mode ? param.fee_mode : '',
                        cur_page: param.cur_page ? param.cur_page : -1,
                        ret_rows: param.ret_rows ? param.ret_rows : '',
                        order_by: param.order_by ? param.order_by : ''
                    }
                };
                return myHttp.post(params);
            },
            /**
             * 查询是否首次购买
             *
             * @param param
             *   - pro_sou 产品来源
             *   - inst_id 外部产品编号
             * @returns {*}
             */
            getIsOneBuy: function (pro_sou, inst_id) {
                var params = {
                    req: {
                        service: '740013',
                        pro_sou: pro_sou ? pro_sou : '',
                        inst_id: inst_id ? inst_id : ''
                    }
                };
                return myHttp.post(params);
            }

        };
    }]);

