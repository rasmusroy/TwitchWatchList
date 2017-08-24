var gulp = require('gulp'),
    uglify = require('gulp-uglify'), // Minify JS
    sass = require('gulp-ruby-sass'), // Sass Compile Package
    prefix = require('gulp-autoprefixer'), // Autoprofixer Package
    plumber = require('gulp-plumber'), // Error Handling Package
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();
    


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// ES6 Compiling 
gulp.task('babel', function () {
    gulp.src('assets/js/*.js')
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
});

// Uglify task
// Minifies JS
gulp.task('uglify', function(){
    gulp.src('assets/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.stream());
});


// Styles task
// Compiling Sass, adding prefixes.
gulp.task('styles', function(){
    sass('assets/css/sass/*.scss', {style:'compressed'})
        .pipe(prefix({
            browsers: ['last 3 versions']
        }))
        .pipe(plumber())
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
});

// Watch task
// Watches the files and compiles
gulp.task('watch', function(){
    gulp.watch('assets/js/*.js', ['babel']);
    gulp.watch('assets/**/*.sass', ['styles']);
    gulp.watch('assets/**/*.scss', ['styles']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    //gulp.watch('assets/img/*', ['image']);
});

// Defualt task
// running with 'gulp' command
gulp.task('default', ['babel', 'styles', 'watch', 'browser-sync']);
