'use strict';

require('./default/uiLoad');
require('./default/myHttp');
require('./default/kibhHttp');
require('./default/myAlert');
require('./default/myConfirm');
require('./default/rsa');

require('./custom/adnotService');
require('./custom/detailService');
require('./custom/infoPrdService');
require('./custom/exclusiveService');
require('./custom/prdlistService');
require('./custom/scartService');
require('./custom/accountService');
require('./custom/loginService');
require('./custom/registerService');
require('./custom/pwrecoveryService');
require('./custom/orderpayService');
require('./custom/accountSafetyService');
require('./custom/confirmorderService');
require('./custom/electronicContractSevice');
require('./custom/prdCommonService');
require('./custom/orderService');
require('./custom/otcService');


require('./kibh/kibhSystem');
require('./kibh/kibhAccount');
require('./kibh/kibhCustomer');

var service = angular.module('ASS.service', [
/********************default*********************/
    'ASS.service.uiLoad',
    'ASS.service.myHttp',
    'ASS.service.kibhHttp',
    'ASS.service.myAlert',
    'ASS.service.myConfirm',
    'ASS.service.rsa',

/********************kfps*********************/
    'ASS.service.adnotService', // 广告公告
    'ASS.service.detailService', // 产品明细
    'ASS.service.exclusiveService', // 专区产品
    'ASS.service.prdlistService', // 专区产品
    'ASS.service.infoPrdService', // 资讯产品
    'ASS.service.scartService', // 购物车
    'ASS.service.accountService', // 我的账户
    'ASS.service.loginService', // 登录
    'ASS.service.registerService', // 注册
    'ASS.service.pwrecoveryService', //找回密码
    'ASS.service.orderpayService', //订单支付
    'ASS.service.accountSafetyService', //账户安全
    'ASS.service.confirmorderService', //订单确认
    'ASS.service.electronicContractSevice', //电子合同业务
    'ASS.service.prdCommonService', // 产品公共方法
    'ASS.service.orderService', // 订单
    'ASS.service.otcService', // OTC业务


/********************kibh*********************/
    'ASS.service.kibhSystem',
    'ASS.service.kibhAccount',
    'ASS.service.kibhCustomer'

]);

module.exports = service;