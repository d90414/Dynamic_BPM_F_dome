'use strict';

module.exports = angular.module('ASS.service.prdCommonService', [])
    .factory('prdCommonService', ['myHttp', '$window', function (myHttp, $window) {
        return {

            /**
             * 判断产品是否可以被购买。
             *
             * @param product
             * @returns {boolean} 返回true表示可购买
             */
            checkIfCanBuy: function (product) {
                product = product || {};
                if (!product.PAY_WAY) return false;
                else
                    return product.ALLOW_TRDS
                        ? (product.ALLOW_TRDS.indexOf('1100') != -1
                    || product.ALLOW_TRDS.indexOf('1101') != -1
                    || product.ALLOW_TRDS.indexOf('1102') != -1
                    || product.ALLOW_TRDS.indexOf('1110') != -1
                    || product.ALLOW_TRDS.indexOf('1111') != -1
                    || product.ALLOW_TRDS.indexOf('1112') != -1)
                        : false;
            },

            /**
             * 判断产品是否已被收藏。
             *
             * @param product
             * @returns {boolean} 返回true表示已被收藏
             */
            isMyFavorite: function (product) {
                product = product || {};
                if ($window.sessionStorage.favorites && product.PRO_ID) {
                    return $window.sessionStorage.favorites.indexOf(product.PRO_ID) != -1;
                }
                return false;
            },

            /**
             * 把product加入SessionStorage收藏列表。
             *
             * @param product
             */
            addToSessionFavorites: function (product) {
                product = product || {};
                $window.sessionStorage.favorites += ($window.sessionStorage.favorites ? ',' : '') + product.PRO_ID;
            },

            /**
             * 删除SessionStorage收藏列表中的product。
             *
             * @param product
             */
            removeFromSessionFavorites: function (product) {
                product = product || {};
                if ($window.sessionStorage.favorites) {
                    $window.sessionStorage.favorites = $window.sessionStorage.favorites.replace(new RegExp(product.PRO_ID, 'g'), '').replace(/,*([^,]+),+/g, '$1,').replace(/,$/, '');
                }
            }

        };
    }]);
