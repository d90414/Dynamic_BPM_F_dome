Date.prototype.format = function(fmt) {
	var o = {
		  "M+" : this.getMonth() + 1, //月份
		  "d+" : this.getDate(), //日
		  "h+" : this.getHours(), //小时
		  "m+" : this.getMinutes(), //分
		  "s+" : this.getSeconds(), //秒
		  "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
		  "S"  : this.getMilliseconds() //毫秒
	};
	
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	
	return fmt;
};

var fs = require('fs'), stat = fs.stat;
var destpath = "../publish/kfps_web", srcpath = "WebContent";
var getLogTime = function() {
	return new Date().format("[hh:mm:ss] ");
}

var files = [];
var clearfiles = function(path) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
        var curPath = path + "/" + file;
        if(fs.statSync(curPath).isDirectory()) {
            clearfiles(curPath);
        } else {
          console.error(getLogTime() + "delete file " + curPath + "...");
            fs.unlinkSync(curPath);
        }
    });

    console.error(getLogTime() + "delete folder " + path + "...");
    fs.rmdirSync(path);
}

var copyfile = function(src, dest) {
    if(fs.existsSync(destpath + dest)) fs.rmdirSync(destpath + dest);

    var readable, writable;

    readable = fs.createReadStream(srcpath + src); // 创建读出流 
    writable = fs.createWriteStream(destpath + dest); // 创建写入流 
    readable.pipe( writable ); // 通过管道来传输流
}

var except = {  
    'WebContent/.bowerrc': 1,
    'WebContent/.gitignore': 1,
    'WebContent/bower.json': 1,
    'WebContent/gulpfile.js': 1,
    'WebContent/package.json': 1,
    'WebContent/params.json': 1,
    'WebContent/README.md': 1,
    'WebContent/index.html': 1,
    'WebContent/publish.html': 1,
    'WebContent/WEB-INF': 1,
    'WebContent/node_modules': 1,
    
    'WebContent/apps/.gitignore': 1,
    'WebContent/apps/.spmignore': 1,
    'WebContent/apps/config.js': 1,
    'WebContent/apps/HISTORY.md': 1,
    'WebContent/apps/index.js': 1,
    'WebContent/apps/package.json': 1,
    'WebContent/apps/README.md': 1,
    'WebContent/apps/spm_modules': 1,
    'WebContent/apps/dist/angular-seed-spm/0.0.1/index-debug.js': 1,
    'WebContent/apps/dist/angular-seed-spm/0.0.1/src/app-debug.js': 1,
    'WebContent/apps/src/components': 1,
    'WebContent/apps/src/components/utils': 1,

    'WebContent/public/js': 1,
    'WebContent/public/css': 1,
    
    'WebContent/public/vendors/bower_components/jquery': 1,
    'WebContent/public/vendors/bower_components/angular': 1,
    'WebContent/public/vendors/bower_components/angular-i18n': 1,
    'WebContent/public/vendors/bower_components/angular-animate': 1,
    'WebContent/public/vendors/bower_components/angular-cookies': 1,
    'WebContent/public/vendors/bower_components/angular-sanitize': 1,
    'WebContent/public/vendors/bower_components/angular-touch': 1,
    'WebContent/public/vendors/bower_components/angular-ui-router': 1,
    'WebContent/public/vendors/bower_components/angular-ui-utils': 1,
    'WebContent/public/vendors/bower_components/angular-bootstrap': 1,
    'WebContent/public/vendors/bower_components/ngstorage': 1,
    'WebContent/public/vendors/bower_components/oclazyload': 1,
    'WebContent/public/vendors/bower_components/html5shiv': 1,
    'WebContent/public/vendors/bower_components/umeditor': 1,
    'WebContent/public/vendors/bower_components/highstock-release/bower.json': 1,
    'WebContent/public/vendors/bower_components/highstock-release/.bower.json': 1,
    'WebContent/public/vendors/bower_components/highstock-release/highcharts-3d.src.js': 1,
    'WebContent/public/vendors/bower_components/highstock-release/highcharts-more.js': 1,
    'WebContent/public/vendors/bower_components/highstock-release/highcharts-more.src.js': 1,
    'WebContent/public/vendors/bower_components/highstock-release/highstock-all.js': 1,
    'WebContent/public/vendors/bower_components/highstock-release/highstock.src.js': 1,
    'WebContent/public/vendors/bower_components/highstock-release/README.md': 1
}


/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function( src, dst ) { // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ) {
       
        if(except[src]) return;

        if( err ) throw err;
            
        paths.forEach(function( path ){
            var _src = src + '/' + path, _dst = dst + '/' + path, readable, writable;
            stat( _src, function( err, st ) {
                if( err ) throw err;

                // 判断是否为文件
                if( st.isFile() ){
                    if(except[_src]) return false;
                    console.error(getLogTime() + "copy file " + _src + "...");
                    readable = fs.createReadStream( _src ); // 创建读取流
                    writable = fs.createWriteStream( _dst ); // 创建写入流 
                    readable.pipe( writable ); // 通过管道来传输流
                } else if( st.isDirectory() ) { // 如果是目录则递归调用自身
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};

var exists = function( src, dst, callback ) {
    fs.exists( dst, function( exists ) {
        if( exists ) { // 已存在
            callback( src, dst );
        } else{ // 不存在
            if(except[src]) return;
            fs.mkdir( dst, function() {
                callback( src, dst );
            });
        }
    });
};

console.error(getLogTime() + ".");
console.error(getLogTime() + ".");
console.error(getLogTime() + ".");
console.error(getLogTime() + "开始清除文件");
var count1 = 0, count2 = 0, itv1, itv2;

itv1 = setInterval(function() {
    count1 += 1;
    if(count1 == 3) {
        clearInterval(itv1);
        clearfiles(destpath);
        fs.mkdirSync(destpath);
        fs.mkdirSync(destpath + "/dist");
        fs.mkdirSync(destpath + "/dist/js");

        console.error(getLogTime() + ".");
        console.error(getLogTime() + ".");
        console.error(getLogTime() + ".");
        console.error(getLogTime() + "开始拷贝文件");
        itv2 = setInterval(function() {
            count2 += 1;
            if(count2 == 3) {
                clearInterval(itv2);
                copyfile("/publish.html", "/index.html");

                copyfile("/apps/spm_modules/seajs/2.3.0/dist/sea.js", "/dist/js/sea.js");
                copyfile("/public/js/qsa-polyfill-ie7.js", "/dist/js/qsa-polyfill-ie7.js");
                copyfile("/public/vendors/bower_components/json2/json2.js", "/dist/js/json2.js");
                copyfile("/public/vendors/bower_components/html5shiv/dist/html5shiv.min.js", "/dist/js/html5shiv.min.js");
                copyfile("/public/vendors/bower_components/respond/dest/respond.min.js", "/dist/js/respond.min.js");
                copyfile("/public/vendors/bower_components/jquery-placeholder/jquery.placeholder.min.js", "/dist/js/jquery.placeholder.min.js");
                copyfile("/apps/config.js", "/dist/js/config.js");

                exists(srcpath, destpath, copy); 
            }
            console.error(getLogTime() + ".");
        }, 500);
    }
    console.error(getLogTime() + ".");
}, 500);