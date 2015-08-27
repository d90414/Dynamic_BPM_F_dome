'use strict';
var moneyFomat = angular.module('ASS.filter.moneyFomat', [])
    .filter('moneyFomat', function () {
        function formatFilter(s, n, par) {
            n = n > 0 && n <= 20 ? n : 2;
            s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = s.split(".")[0].split("").reverse(),
                r = s.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return t.split("").reverse().join("") + "." + r + " " + par;
        }

        return function (input, params) {
            var args = Array.prototype.slice.call(arguments);
            //console.log("arguments=", args.length);
            var n = 0;
            n = args.length >= 2 ? args[1] : 2; //小数点位
            if (isNaN(n)) {//参数异常 小数点位数必须为数字
                //console.log("参数返回"+n);
                return input;
            }
            if (input != '' && !isNaN(input)) { //返回格式化 数据
                //console.log(n+"正常"+input);
                //var t=(parseFloat(input)*10000).toFixed(4);
                var t = (parseFloat(input)).toFixed(4);
                if (t >= 100000000) {
                    return formatFilter(t / 100000000, n, '亿元');
                } else if (t >= 10000) {
                    return formatFilter(t / 10000, n, '万元');
                } else {
                    return formatFilter(t, n, '元');
                }
            } else {
                //console.log("元数据"+input);
                return input;
            }

        }
    });

module.exports = moneyFomat;

