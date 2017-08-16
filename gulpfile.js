'use strict';

var pkg = require('./package.json');
var tsconfig = require('./tsconfig.json');
// var pkgLock = require('./package-lock.json');
var gulp = require('gulp');
var gulpLess = require('gulp-less');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var del = require('del');
var license = require('gulp-licenser');
var jsonfile = require('jsonfile');
var ts = require("gulp-typescript");
var replace = require('gulp-replace');
var plumber = require('gulp-plumber');

var dst = 'dist/';
var src = 'src/';
var jsFile = pkg.name + '.min.js';
var jsDevFile = pkg.name + '.js';
var cssFile = pkg.name + '.min.css';
var cssDevFile = pkg.name + '.css';
var lessDevFile = pkg.name + '.less';
var LICENSE_TEMPLATE =
    '/**\n\
     * @author: \n\
     *    jiangrun002\n\
     * @version: \n\
     *    v' + pkg.version + '\n\
     * @license:\n\
     *    Copyright 2017, hiknowledge. All rights reserved.\n\
     */';


gulp.task('clean-js', function (cb) {
    return del([dst + '*.js', src + 'ts/**/*.js', src + 'ts/**/*.map'], cb);
});

gulp.task('concat-js', ['compile-ts'], function () {
    return gulp.src([
        src + 'ts/config.js',
        src + 'ts/*.js'
    ]).pipe(concat(jsDevFile)).pipe(gulp.dest(dst));
});

gulp.task('concat-uglify-js', ['concat-js'], function () {
    return gulp.src([
        dst + '/' + jsDevFile
    ]).pipe(concat(jsFile)).pipe(uglify()).pipe(gulp.dest(dst));
});

gulp.task("compile-ts", ["clean-js"], function () {
    var tsResult = gulp.src(src + "ts/*.ts")
        .pipe(ts(tsconfig.compilerOptions));
    return tsResult.js.pipe(gulp.dest(src + 'ts/'));
});

gulp.task('clean-css', function (cb) {
    return del([src + 'less/**/*.css', dst + '*.css', dst + '**/*.less'], cb);
});

gulp.task('compile-less', ['concat-less'], function () {
    return gulp.src(dst + '*.less')
        .pipe(plumber())
        .pipe(gulpLess())
        .pipe(concat(cssDevFile))
        .pipe(gulp.dest(dst));
});

gulp.task('minify-css', ['compile-less'], function () {
    return gulp.src(dst + '/' + cssDevFile).pipe(concat(cssFile)).pipe(cleanCss({compatibility: 'ie8'})).pipe(gulp.dest(dst));
});

gulp.task('concat-less', ['clean-css'], function () {
    gulp.src([src + 'less/define.less']).pipe(gulp.dest(dst));
    return gulp.src([src + 'less/**/*.less','!' + src + 'less/theme/*.less']).pipe(concat(lessDevFile)).pipe(replace(/@import .*;/g, '')).pipe(gulp.dest(dst));
});

gulp.task('gent-theme', function () {
    return gulp.src([src + 'less/theme/*.less']).pipe(gulp.dest(dst + 'theme/'));
});

gulp.task('gent-font', function () {
    return gulp.src([src + 'font/*']).pipe(gulp.dest(dst + 'font/'));
});

gulp.task('update-config-file', function () {
    jsonfile.spaces = 2;
    // if(pkgLock){
    //     pkgLock.version = pkg.version;
    //     jsonfile.writeFile('./package-lock.json', pkgLock);
    // }
});

gulp.task('build', ['update-config-file', 'concat-uglify-js', 'minify-css', 'gent-theme'], function () {
    gulp.src([dst + '**/*'])
        .pipe(license(LICENSE_TEMPLATE))
        .pipe(gulp.dest(dst));
});

gulp.task('watch', function () {
    gulp.watch([src + '**/*.less'], ['minify-css', 'gent-theme']);
    gulp.watch([src + '**/*.ts'], ['concat-uglify-js']);
});

gulp.task('default', ['build']);