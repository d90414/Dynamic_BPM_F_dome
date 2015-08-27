'use strict';

/*
 * 使用方法：
 * id：节点id
 * width：宽度
 * height：高度
 *<div donut id="donut" width="350px" height="240px"></div>
 */
var donut = angular.module('ASS.directive.donut', [])
    .directive('donut', function () {
        return {
            restrict: 'EA',
            link: function ($scope, $attrs) {
                var element = {
                    id: $attrs.attr("id") || "donut",
                    width: $attrs.attr("width") || "100%",
                    height: $attrs.attr("height") || "100%"
                };
                drawDonut(element, $scope.assetAllocation.donut());
            }
        };
    });


//highcharts 环形图
var highChartsDonut = function (element, data) {
    return new Highcharts.Chart({
        chart: {
            renderTo: element.id,
            width: element.width.indexOf("px") > 0 ? element.width.slice(0, element.width.indexOf("px")) : null,
            height: element.height.indexOf("px") > 0 ? element.height.slice(0, element.height.indexOf("px")) : null,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },

        title: {
            text: ""
        },

        credits: {
            enabled: false
        },

        tooltip: {
            hideDelay: 0,
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },

        legend: {
            enabled: false
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>'
                },
                showInLegend: true
            }
        },

        series: [
            {
                type: 'pie',
                name: '比例',
                data: data,
                innerSize: '35%'
            }
        ]
    });
};

// 绘制图
var drawDonut = function (element, data) {
    data = data ? data : [];
    return highChartsDonut(element, data);
};


module.exports = donut;