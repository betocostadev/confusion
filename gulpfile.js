'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCSS = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', function() {
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./css/*.scss', ['sass']);
});

gulp.task('browserSync', function() {
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        },
        browser: ["chrome"]
    });
});

// Default task
gulp.task('default', ['browserSync'], function() {
    gulp.start('sass:watch');
});

// Adding the del (delete dist folder) plugin
gulp.task('clean', function() {
    return del(['dist']);
});

// Copy the fonts into 'dist' folder
gulp.task('copyfonts', function() {
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

// Imagemin
gulp.task('imagemin', function() {
    return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'));
});

// Usemin task takes the html files and looks for the css and js to concat them on the dist folder.
// Flatmap pipe proccess each html file to search for its dependencies
// Rev will add the code to the end of the files, in the case below, the css and js files.
gulp.task('usemin', function() {
    return gulp.src('./*.html')
    .pipe(flatmap(function(stream, file){
        return stream
        .pipe(usemin({
            css: [rev()],
            html: [ function() { return htmlmin({ collapseWhitespace: true })}],
            js: [ uglify(), rev()],
            inlinejs: [ uglify()],
            inlinecss: [ cleanCSS(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dist/'));
});

// Build task - ['clean'] task is in this order so it is executed first.
gulp.task('build', ['clean'], function() {
    gulp.start('copyfonts', 'imagemin', 'usemin');
});