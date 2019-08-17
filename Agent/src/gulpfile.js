const gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

const browsersync = require("browser-sync").create();

const srcFiles = [
    "./Utils/CookieOperations.js",
    "./Utils/UserInformations.js",

    "./Sterux/Send.js",

    "./Sterux/Error.js",
    "./Sterux/Statistic.js",
    "./Sterux/UserExperience.js",
    
    "./Sterux/STERUX.js",
];

const outputDirectory = '../dist/';
const outputDirectory2 = '../example/';

const outputFileName = "STERUX.min.js"
const directoryNameForClean = outputDirectory + "/**.*";

gulp.task('clear_before_build', function () {
    return gulp.src(directoryNameForClean, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('bundle_js', function () {
    return gulp.src(srcFiles)
        .pipe(concat(outputFileName))
        //.pipe(uglify())
        .pipe(gulp.dest(outputDirectory2));
});

gulp.task('reloadBrowser', function (done) {
    browsersync.reload();
    done();
});

// gulp.task('watch', function () {

// });

gulp.task('default', function () {

    browsersync.init({
        server: {
            baseDir: "../example/"
        },
        port: 3000
    });

    gulp.watch(["./Sterux/*.js", "./Utils/*.js"], gulp.series('clear_before_build', 'bundle_js', 'reloadBrowser'))
});