'use strict';

module.exports = angular.module('ASS.filter.transTypeName', [])
    .filter('transTypeName', ['$http', function ($http) {
        return function (input, params) {
            var typetoname = {
                "all": "所有理财产品",
                "gmjj": "公募基金",
                "gtsc": "柜台市场产品",
                "zgcp": "资管产品",
                "zxcp": "资讯产品",
                "zhcp": "组合产品",
                "jxcp": "精选产品",
                "xpzq": "新品专区"
            };
            return typetoname[input];
        }
    }]);
