'use strict';

// 理财产品列表service
module.exports = angular.module('ASS.service.prdlistService', [])
    .factory('prdlistService', ['myHttp', function (myHttp) {
        return {
            getresultPrds: function (param) {
                param = param || {};

                var params = {
                    req: {
                        service: "710014",
                        pro_key: param.pro_key ? param.pro_key : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : ""
                    }
                };
                return myHttp.post(params);
            },

            /*
             * 所有金融产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 投资期限（年）	invest_hori
             * 预期收益（%）	expe_yields
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getallPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710005",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 公募基金产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资类型	fund_pro_type
             * 实际发行规模	iss_amt
             * 基金公司	iss_code
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getgmjjPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710007",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        fund_pro_type: param.fund_pro_type ? param.fund_pro_type : "",
                        regi_org: param.regi_org ? param.regi_org : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 券商理财产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资类型	asset_pro_type
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getqslcPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710015",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",
                        asset_pro_type: param.asset_pro_type ? param.asset_pro_type : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : ""
                    }
                };

                return myHttp.post(params);
            },
            /*
             * 柜台市场产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资期限 invest_hori
             * 投资类型	asset_pro_type
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getgtscPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710015",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",
                        asset_pro_type: param.asset_pro_type ? param.asset_pro_type : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 按类型查询组合产品
             *
             * 组合类型	package_style
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             */
            getzhcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710018",
                        package_style: param,
                        cur_page: -1
                    }
                };

                return myHttp.post(params);
            },

            /*
             * 资管产品（目前与券商理财相同）
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资类型	asset_pro_type
             * 投资期限 invest_hori
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getzgcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710006",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",
                        asset_pro_type: param.asset_pro_type ? param.asset_pro_type : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "POSITION"
                    }
                };

                return myHttp.post(params);
            },
            /*
             * 基金公司
             *
             */
            getjjgsPrds: function () {
                var params = {
                    req: {
                        service: "730004",
                        cur_page: -1,
                        inst_org_types: "2",
                        org_src: "1",
                        order_by: "ext_ta_code"
                    }
                };

                return myHttp.post(params);
            },
            /*
             * 推荐产品
             *
             * 销售状态	sale_sta
             * 风险类型	risk_lvl
             * 投资起点（万元）	inve_start
             * 预期收益（%）	expe_yields
             * 投资类型	asset_pro_type
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getrecmPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        pref_type: "3",
                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 4
                    }
                };
                return myHttp.post(params);
            },

            /*
             * 资讯产品
             *
             * 销售状态	sale_sta
             * 收费类型	fee_type
             * 收费模式	fee_mode
             * 资讯供应商	sup_id
             * 分页页码	cur_page
             * 每页数据条数	ret_rows
             * 排序字段	order_by
             */
            getzxcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710026",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        fee_type: param.fee_type ? param.fee_type : "",
                        fee_mode: param.fee_mode ? param.fee_mode : "",
                        sup_id: param.sup_id ? param.sup_id : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : ""
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 精选产品
             * @param param
             * @returns {*}
             */
            getjxcpPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "",

                        pref_type: "1"
                    }
                };

                return myHttp.post(params);
            },

            /**
             * 新品专区
             * @param param
             * @returns {*}
             */
            getxpzqPrds: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "710003",
                        sale_sta: param.sale_sta ? param.sale_sta : "",
                        risk_lvl: param.risk_lvl ? param.risk_lvl : "",
                        inve_start: param.inve_start ? param.inve_start : "",
                        invest_hori: param.invest_hori ? param.invest_hori : "",
                        expe_yields: param.expe_yields ? param.expe_yields : "",

                        cur_page: param.cur_page ? param.cur_page : 1,
                        ret_rows: param.ret_rows ? param.ret_rows : 10,
                        order_by: param.order_by ? param.order_by : "",

                        pref_type: "4"
                    }
                };

                return myHttp.post(params);
            }
        }
    }]);
