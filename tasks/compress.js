var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");

module.exports = function () {
    return gulp.src("dist/browser/*.js")
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
            return path;
        }))
        .pipe(gulp.dest("dist/browser"));
};

