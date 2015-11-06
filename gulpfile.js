var config          = require('./config.json');

var gulp            = require('gulp');

var scss            = require('gulp-scss');
var postcss         = require('gulp-postcss');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('autoprefixer');

var jade            = require('gulp-jade');

var browserSync     = require('browser-sync');

gulp.task('autoprefixer', function() {
    
    return gulp.src('src/css/*.css')
        .pipe(scss())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('autoprefixerRebuild', ['autoprefixer'], function() {
    browserSync.reload();
});

gulp.task('jade', function(onWatch) {
    
    return gulp.src('src/*.jade')
        .pipe(jade({
            locals: config,
            pretty: true
        }))
        .pipe(gulp.dest('assets/'));
});

gulp.task('jadeRebuild', ['jade'], function() {
    browserSync.reload();
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "assets/"
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('src/css/*.css', ['autoprefixerRebuild']);
    gulp.watch('src/*.jade', ['jadeRebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('init', ['jade', 'autoprefixer']);