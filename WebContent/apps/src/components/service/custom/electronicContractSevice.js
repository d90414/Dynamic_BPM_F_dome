'use strict';

module.exports = angular.module('ASS.service.electronicContractSevice', [])
    .factory('electronicContractSevice', ['myHttp', '$window', function (myHttp, $window) {
        return {
            /**
             * 电子合同文本查询。
             * @param param
             *   - Ectype   合同类型
             *       ‘1’理财产品电子合同
             *       ‘2’理财产品纸质合同
             *       ‘3’电子签名约定书
             *       ‘4’风险揭示书
             *   - Ecsno    合同编号
             * @returns {*}
             */
            getContract: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "770033",
                        ectype: param.ectype ? param.ectype : "",
                        ecsno: param.ecsno ? param.ecsno : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 电子签名约定书签约功能。
             * @param param
             *   - custid   客户代码
             *   - orgid    机构编码
             *   - ectype   合同类型
             *   - action   签约行为标志
             *       '3'证券业务电子签名约定书
             *       'A'表示增加记录，
             *       'D'标示取消记录。为'D'不是物理删除记录，而是将合同置取消标志。
             * @returns {*}
             */
            agreementSign: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "770029",
                        custid: param.custid ? param.custid : "",
                        orgid: param.orgid ? param.orgid : "",
                        ectype: param.ectype ? param.ectype : "",
                        action: param.action ? param.action : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             *客户电子合同签约功能。
             *
             * @param param
             *   - custid           客户代码
             *   - orgid            机构编码
             *   - fundcode         理财品种代码
             *   - signrisknotice   客户风险揭示书签署标志
             *   - action           签约行为标志
             *   - redeemcontract   现金类产品参与方式
             * @returns {*}
             */
            contractSign: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "770030",
                        inst_id: param.inst_id ? param.inst_id : ""
                    }
                };
                return myHttp.post(params);
            },

            /**
             * 签署电子签名约定书、客户电子合同。
             *
             * @param param
             *   - custid           客户代码
             *   - orgid            机构编码
             *   - fundcode         理财品种代码
             *   - signrisknotice   客户风险揭示书签署标志
             *   - action           签约行为标志
             *   - redeemcontract   现金类产品参与方式
             * @returns {*}
             */
            allAgreementsSign: function (param) {
                param = param || {};
                var params = {
                    req: {
                        service: "740014",
                        inst_id: param.inst_id ? param.inst_id : ""
                    }
                };
                return myHttp.post(params);
            }

        };
    }]);
