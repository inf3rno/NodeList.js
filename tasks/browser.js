var gulp = require("gulp"),
    rename = require("gulp-rename"),
    version = require("../package.json").version;

module.exports = function () {
    return gulp.src("src/nodelist.js")
        .pipe(rename(function (path) {
            path.basename += ".v" + version;
            return path;
        }))
        .pipe(gulp.dest("dist/browser/"));
};

