var gulp        = require('gulp');
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['./scss/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
            cascade: true
        }))
        .pipe(concat('all.css'))
        .pipe(cleanCSS())
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest('./css'))
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js', 'scripts/*.js' ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest("./js"))
});


// Static Server + watching scss/js files
gulp.task('serve', function() {

    gulp.watch(['./scss/*.scss'], ['sass']);
    gulp.watch(['./scripts/*.js'], ['js']);
});

gulp.task('default', ['js','sass']);