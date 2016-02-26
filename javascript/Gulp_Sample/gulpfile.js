var gulp = require('gulp'),
header = require('gulp-header'),
uglify = require('gulp-uglify'),
//less = require('gulp-less'),
//uglifycss = require('gulp-uglifycss'),
concat = require('gulp-concat'),
strip = require('gulp-strip-comments'),
//uncomment = require('gulp-uncomment'),
uncomment = require('gulp-uncomment-it'),
//strip = require('gulp-strip-code'),
pkg = require('./package.json');

/*
gulp-imagemin
gulp-markdown
gulp-iconfont
gulp-htmlmin
gulp-open
gulp-sass
*/

/*
var src = [
    "zepto.js",
    "event.js",
    "ajax.js",
    "form.js",
    "ie.js",
    
    // 可选
    "detect.js",
    "fx.js",
    "fx_methods.js",
    
    //"assets.js",
    "data.js",
    //"deferred.js",
    //"callbacks.js",
    "selector.js",
    "touch.js"
    //"gesture.js",
    //"stack.js",
    //"ios3.js"
];*/

var vendor = {
    jQuery: "jquery/dist/jquery.js",
    UIkit: "uikit/js/uikit.js",
    EaselJS: "EaselJS/lib/easeljs-NEXT.combined.js",
    TweenJS: "TweenJS/lib/tweenjs-NEXT.combined.js",
    SoundJS: "SoundJS/lib/soundjs-NEXT.combined.js",
    PreloadJS: "PreloadJS/lib/preloadjs-NEXT.combined.js",
    TweenMax: "gsap/src/uncompressed/TweenMax.js"
};

var src = [], count = 0;
pkg.include = '';

// 创建
for (var name in vendor) {
    src[count] = './static/vendor/' + vendor[name];
    pkg.include += name + ', ';
    count++;
}

pkg.include = pkg.include.replace(/,\s$/gi, '');

var dist = './dist/';
var output = 'app.js';

var copyright = ['/*!',
  '  *  Copyright (c) <%= pkg.copyright %>',
  '  *  <%= pkg.name %> - <%= pkg.description %>',
  '  *  @Author: <%= pkg.author.name %> <<%= pkg.author.email %>>',
  '  *  @Version: <%= pkg.version %>',
  '  *  @License: <%= pkg.license %>',
  '  *  @Homepage: <%= pkg.homepage %>',
  '  *  @Include: <%= pkg.include %>',
  '  **/',
  ''].join('\n') + '\n';

// 合并 JS
gulp.task('combined', function() {
    gulp.src(src)
    .pipe(concat(output))
    /*.pipe(strip({
        safe: false
    }))*/
    .pipe(header(copyright, {
        pkg: pkg
    }))
    .pipe(gulp.dest(dist));
});

// 压缩 JS
var u_name = output.replace(/\.js$/, '.min.js'),
u_head = copyright.replace(/\n\n$/, '');
gulp.task('uglifyjs', function() {
    gulp.src(dist + output)
    .pipe(uglify())
    .pipe(concat(u_name))
    .pipe(header(u_head, {
        pkg: pkg
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('default', ['combined', 'uglifyjs'], function(done){
    done();
});