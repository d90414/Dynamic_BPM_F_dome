'use strict';

module.exports = angular.module('ASS.directive.trustPrdsList', [])
    .directive('trustPrdsList', [ function () {
        return {
            restrict: "EAC",
            replace: true,
            scope: {},
            templateUrl: 'apps/src/blocks/directivetpl/kfps/trustprds.html',
            link: function ($scope, ele, attrs, ngModelCtrl) {
                $scope.pagination = {
                    pagesize: 10,
                    totalcount: 50,
                    currentpage: 1
                };
                $scope.tuijlist =
                    [
                        {
                            img: 'public/images/mall-prd-info-pic2.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1910"
                        },
                        {
                            img: 'public/images/mall-prd-info-pic2.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1900"
                        },
                        {
                            img: 'public/images/mall-prd-info-pic3.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1900"
                        },
                        {
                            img: 'public/images/mall-prd-info-pic1.png',
                            title: "机构策略股票池",
                            des: "该组合注重基本面与长期价值，同时交易策略多样",
                            fee: "1900"
                        }
                    ];
            }
        }
    }]);