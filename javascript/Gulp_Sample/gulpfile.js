var gulp = require('gulp'),
header = require('gulp-header'),
uglify = require('gulp-uglify'),
//less = require('gulp-less'),
//uglifycss = require('gulp-uglifycss'),
concat = require('gulp-concat'),
// strip = require('gulp-strip-comments'),
pkg = require('./package.json');

/*
gulp-imagemin
gulp-markdown
gulp-iconfont
gulp-htmlmin
gulp-open
gulp-sass
*/

//var src = './src/**/*.js';
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
    .pipe(header(copyright, {
        pkg: pkg
    }))
    .pipe(gulp.dest(dist));
});

// 压缩 JS
gulp.task('uglifyjs', ['combined'], function() {
    gulp.src(dist + output)
    .pipe(uglify())
    .pipe(concat(output.replace(/\.js$/, '.min.js')))
    .pipe(header(copyright.replace(/\n\n$/, ''), {
        pkg: pkg
    }))
    .pipe(gulp.dest(dist));
});

/*gulp.task('uglifycss', function () {
  gulp.src('*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'));
});*/

gulp.task('default', ['uglifyjs'], function(done){
    
    done();
});