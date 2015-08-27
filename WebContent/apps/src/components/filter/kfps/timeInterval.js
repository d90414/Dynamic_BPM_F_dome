'use strict';

var timeInterval = angular.module('ASS.filter.timeInterval', [])
    .filter('timeInterval', function () {
        return function (input, params) {
            var ptime = Date.parse(input.substring(0, 19).replace(/-/g, "/"));
            var ctime = new Date().getTime();
            var secondDif = (ctime - ptime) / 1000;
            switch (true) {
                case secondDif < 60:
                    secondDif = parseInt(secondDif) + ' 秒前';
                    break;
                case secondDif < 120:
                    secondDif = '1 分钟前';
                    break;
                case secondDif < 3600:
                    secondDif = parseInt(secondDif / 60) + ' 分钟前';
                    break;
                case secondDif < 86400:
                    secondDif = parseInt(secondDif / 3600) + ' 小时前';
                    break;
                case secondDif < 172800:
                    secondDif = '昨天';
                    break;
                case secondDif < 2592000:
                    secondDif = parseInt(secondDif / 86400) + ' 天前';
                    break;
                default:
                    secondDif = parseInt(secondDif / 2592000) + ' 月前';
                    break;
            }
            return secondDif;
        }
    });

module.exports = timeInterval;
