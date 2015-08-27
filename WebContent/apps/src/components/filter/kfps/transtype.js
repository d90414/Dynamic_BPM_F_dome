'use strict';
var transtype = angular.module('ASS.filter.transtype', [])
    .filter('transtype', function () {
        return function (input) {
            var keyv = { //数据库类型 与菜单 类型编码对照
                "486": "gtsc",
                "38": "zxcp",
                "6": "gmjj",
                "500": "zhcp",
                "4": "zgcp"
            };
            if (input != '' && keyv[input]) { //返回格式化 数据
                //console.info("类型过滤:"+input +" 过滤后："+keyv[input]);
                return keyv[input];

            } else {
                //console.log("元数据"+input);
                return input;
            }

        }
    });

module.exports = transtype;

