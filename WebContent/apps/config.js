var WEB_CUST = "bhzq";
var _DEV = $("[src='apps/spm_modules/seajs-wrap/1.0.2/dist/seajs-wrap.js']").size();

var _BSE, _APP;
if (_DEV) {
    _APP = './apps/src/app';
    _BSE = './apps/spm_modules/';
} else {
    _APP = './apps/dist/angular-seed-spm/0.0.1/src/app';
    _BSE = './apps/dist';
}

seajs.config({base: _BSE});
seajs.use(_APP);
