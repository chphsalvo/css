// Dependencies
var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename");

// DRY
var paths = {
    styles: {
        // By using sass/**/*.scss we're telling gulp to check all folders for any scss file
        src: "sass/**/*.scss",
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "dist/css"
    }
    // Easily add additional paths
    // ,html: {
    //  src: '...',
    //  dest: '...'
    // }
};

// Define tasks
gulp.task('sass', function () {
    return gulp
        .src(paths.styles.src)
        // Initialize sourcemaps before compilation starts
        .pipe(sourcemaps.init())
        // Use sass with the files found, and log any errors
        .pipe(sass())
        .on("error", sass.logError)
        /*
        .pipe(sourcemaps.mapSources(function(sourcePath, file) {
            // source paths are prefixed with '../src/'
            return '../../sass/' + sourcePath;
        }))
        */
        .pipe(postcss([autoprefixer()]))
        // Now add/write the sourcemaps
        .pipe(sourcemaps.write('.'))
        // What is the destination for the compiled file?
        .pipe(gulp.dest(paths.styles.dest))
});
gulp.task('sass:min', function () {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        // Use postcss with autoprefixer and compress the compiled file using cssnano
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
});

gulp.task('style', gulp.series('sass', 'sass:min'));


function watch(){
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style)
}
// Expose the task
exports.watch = watch