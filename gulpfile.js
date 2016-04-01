var gulp = require('gulp');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');

// run localhost:8080 server for public 
gulp.task('connect', function () {
  connect.server({
    root: 'public',
    port: 8080
  });
});

// minfiy html files and send them to public folder
gulp.task('html', function(){
  return gulp.src('app/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});

gulp.task('views', function(){
  return gulp.src('app/views/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('public/views'));
});

gulp.task('bootstrap-js', function(){
  return gulp.src('app/assets/libs/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    .pipe(gulp.dest('public/assets/libs'));
});

gulp.task('jquery', function(){
  return gulp.src('app/assets/libs/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('public/assets/libs'));
});

gulp.task('angular', function(){
  return gulp.src('app/assets/libs/angular/angular.min.js')
    .pipe(gulp.dest('public/assets/libs'));
});

gulp.task('angularAnimate', function(){
  return gulp.src('app/assets/libs/angular-animate/angular-animate.min.js')
    .pipe(gulp.dest('public/assets/libs'));
});

gulp.task('angularVelocity', function(){
  return gulp.src('app/assets/libs/angular-velocity/angular-velocity.min.js')
    .pipe(gulp.dest('public/assets/libs'));
});

gulp.task('velocity', function(){
  return gulp.src('app/assets/libs/velocity/velocity.min.js')
    .pipe(gulp.dest('public/assets/libs'));
});

gulp.task('velocityUI', function(){
  return gulp.src('app/assets/libs/velocity/velocity.ui.min.js')
    .pipe(gulp.dest('public/assets/libs'));
});

// combine and minify js files
gulp.task('scripts', function() {
  return gulp.src(['./app/app.js', './app/components/**/*.js', './app/directives/**/*.js', './app/factories/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public'));
});

// Styles public task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('./app/assets/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('copyFonts', function(){
  return gulp.src('./app/assets/fonts/*')
    .pipe(gulp.dest('public/assets/fonts'));
});

gulp.task('copyDirectiveHtml', function(){
  return gulp.src('./app/directives/*.html')
    .pipe(gulp.dest('public/directives'));
});

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src(['./app/app.js', './app/components/**/*.js', './app/directives/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', ['public'], function() {
  gulp.watch('./app/**/*.html', ['public'] );
  gulp.watch(['./app/app.js', './app/components/**/*.js', './app/directives/**/*.js', './app/factories/**/*.js'], ['public']);
  gulp.watch('./app/assets/scss/*.scss', ['public']);
  gulp.watch('./public/assets/img/**/*', ['public']);
});

gulp.task('default', ['connect', 'watch', 'jshint']);

gulp.task('public', ['html', 'views', 'scripts', 'jshint', 'styles', 'copyFonts', 'copyDirectiveHtml', 'bootstrap-js', 'jquery', 'angular', 'angularAnimate', 'angularVelocity', 'velocity', 'velocityUI']);
