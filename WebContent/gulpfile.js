/*!
 * BigInt - Vzhibo.tv
 * ** We use gulp to auto generate and minify css,js files .
 */

// Load plugins
var del = require('del'),
    path = require('path'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin');

// Define Vars
var image_src = './public/images/*';
var fonts_src = './public/css/fonts/*';
var sans_src = './public/css/fonts/sourcesanspro/*';
var app_src = ['./apps/src/*/**/*.js', '!./apps/src/components/**/*.js'];

var css_src = [
               './public/css/dev/font-awesome.css',
               './public/css/dev/simple-line-icons.css',
               './public/css/dev/font.css',
               './public/css/dev/animate.css',
               './public/css/dev/bootstrap.css',
               './public/css/dev/base.css'
              ];
var js_src = ['./public/vendors/bower_components/jquery/dist/jquery.js',
              './public/vendors/bower_components/angular/angular.js',
              './public/vendors/bower_components/angular-i18n/angular-locale_zh.js',
              //'./public/vendors/bower_components/angular-animate/angular-animate.js',
              './public/vendors/bower_components/angular-cookies/angular-cookies.js',
              './public/vendors/bower_components/angular-sanitize/angular-sanitize.js',
              './public/vendors/bower_components/angular-touch/angular-touch.js',
              './public/vendors/bower_components/angular-ui-router/release/angular-ui-router.js',
              './public/vendors/bower_components/angular-ui-utils/ui-utils.js',
              './public/vendors/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
              './public/vendors/bower_components/ngstorage/ngStorage.js',
              './public/vendors/bower_components/oclazyload/dist/ocLazyLoad.js',
              './public/js/des.js'
             ];

var path_image = './../../publish/kfps_web/public/images/';
var path_app = './../../publish/kfps_web/apps/src/';
var path_css = './dist/css/';
var path_js = './dist/js/';
var path_html = './';
var path_dist = './dist/';
var path_fonts = './dist/fonts/';
var path_sans = './dist/fonts/sourcesanspro/';
var path_rev = ['./dist/**/*.json', './publish.html'];

/*
var less = require('gulp-less');
var sass = require('gulp-sass');
var less_src = ['./public/css/less/*.less'];
var sass_src = './public/css/scss/*.scss';
var path_dev = './public/css/dev/';

// Less
gulp.task('less', function () {
    gulp.src(less_src)
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path_dev))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(path_dev))
        .pipe(gulp.dest(path_css))
        .pipe(notify({ message: 'less task complete' }));
});

// Sass
gulp.task('sass', function () {
    gulp.src(sass_src)
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(path_dev))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(path_dev))
        .pipe(gulp.dest(path_css))
        .pipe(notify({ message: 'sass task complete' }));
});
*/

// Watch .less files
//gulp.task('less_watch', function() {
//    gulp.watch('./public/css/less/**/*.less', ['clean','less']);
//});

// Watch .scss files
//gulp.task('sass_watch', function() {
//    gulp.watch('./public/css/scss/**/*.scss', ['clean','sass']);
//});

// Clean
gulp.task('clean', function() {
    del(path_dist);
});

// Minifycss
gulp.task('css', function() {
    gulp.src(css_src)
        .pipe(concat('base.css'))    //合并所有css到base.css
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())    //压缩
        //.pipe(rev())    //添加版本号
        .pipe(gulp.dest(path_css));   //输出base.min.css到文件夹
        //.pipe(rev.manifest())
        //.pipe(gulp.dest(path_css));
    gulp.src(['./public/css/dev/base.css']).pipe(concat('publish.css')).pipe(rename({suffix: '.min'})).pipe(minifycss()).pipe(gulp.dest(path_css));
});

// Minifyjs
gulp.task('js', function() {
    gulp.src(js_src)
        .pipe(concat('base.js'))    //合并所有js到base.js
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())    //压缩
        //.pipe(rev())    //添加版本号
        .pipe(gulp.dest(path_js));   //输出base.min.js到文件夹
        //.pipe(rev.manifest())
        //.pipe(gulp.dest(path_js));
});

// Rev
gulp.task('rev', function() {
    gulp.src(path_rev)
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(path_html));
});

// Fonts
gulp.task('fonts', function() {
    gulp.src(fonts_src)
        .pipe(gulp.dest(path_fonts));
});

// Sans
gulp.task('sans', function() {
    gulp.src(sans_src)
        .pipe(gulp.dest(path_sans));
});

// Copy
gulp.task('copy', function() {
    gulp.start('fonts');
    gulp.start('sans');
});

// Default
gulp.task('default', function() {
    gulp.start('copy');
    gulp.start('css');
    gulp.start('js');
    //gulp.start('rev');
});

// Minifyapp
gulp.task('app', function() {
    gulp.src(app_src)
        .pipe(uglify())
        .pipe(gulp.dest(path_app));
    gulp.src(image_src)
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path_image));
});