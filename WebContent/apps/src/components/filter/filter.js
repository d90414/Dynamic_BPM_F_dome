'use strict';
require('./kfps/moneyFomat');
require('./kfps/transtype');
require('./kfps/transTypeName');
require('./kfps/timeInterval');
require('./kfps/fieldCover');
require('./kfps/escapeSequence');


require('./kibh/mobileCover');
require('./kibh/moneyDivide');

var filter = angular.module('ASS.filter', [

/********************kfps*********************/
    'ASS.filter.transtype',
    'ASS.filter.moneyFomat',
    'ASS.filter.transTypeName',
    'ASS.filter.timeInterval',
    'ASS.filter.fieldCover',
    'ASS.filter.escapeSequence',

/********************kibh*********************/
    'ASS.filter.mobileCover',
    'ASS.filter.moneyDivide'
]);

module.exports = filter;
