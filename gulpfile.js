var gulp = require('gulp');
var browserSync = require('browser-sync');

// copies changed css files to the output directory
gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');

    return gulp.src('styles.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dest'));
});

gulp.task('serve', ['autoprefixer'], function(done) {
    browserSync({
        open: false,
        port: 9000,
        server: {
            baseDir: ['.'],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function () {
    gulp.watch('**/*.html', browserSync.reload).on('change', reportChange);
    gulp.watch('**/*.css', ['autoprefixer', browserSync.reload]).on('change', reportChange);
});
gulp.task('default', ['serve']);
