var gulp        = require('gulp');
var sass        = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cleanCSS = require("gulp-clean-css");
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src([
        './scss/*.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
            cascade: true
        }))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(rename("styles.min.css"))
        .pipe(gulp.dest('./css'))
});

gulp.task('css', function() {
    return gulp.src([
        'css/superslide/superslides.css',
        'css/themes/default/default.css',
        'scripts/slick/slick.css',
        'scripts/slick-theme.css',
        'css/animate/animate.css',
        'css/featherlight/featherlight.css',
        'css/featherlight/featherlight.gallery.css',
        'css/styles.min.css'
    ])
        .pipe(concat('all.css'))
        .pipe(cleanCSS())
        .pipe(rename("all.min.css"))
        .pipe(gulp.dest('./css'))
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/tether/dist/js/tether.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'scripts/featherlight/featherlight.js',
        'scripts/featherlight/featherlight.gallery.js',
        'scripts/sticky/jquery.sticky.js',
        'scripts/slick/slick.min.js',
        'scripts/isotope/isotope.pkgd.js',
        'scripts/superslide/jquery.superslides.js',
        'scripts/wow/wow.min.js',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBL6gbhsnCEt4FS9D6BBl3mZO1xy-NcwpE',
        'scripts/*.js'
    ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest("./js"))
});


// Static Server + watching scss/js files
gulp.task('serve', function() {

    gulp.watch(['./scss/*.scss'], ['sass']);
    gulp.watch(['./scss/*.scss'], ['css']);
    gulp.watch(['./scripts/*.js'], ['js']);
});

gulp.task('default', ['js','sass']);