var gulp = require("gulp"),
    rename = require("gulp-rename"),
    replace = require("gulp-replace-task"),
    version = require("../../package.json").version;

module.exports = function () {
    return gulp.src("src/nodelist.js")
        .pipe(replace({
            patterns: [
                {
                    match: /window\.\$\$/g,
                    replacement: "module.exports"
                }
            ]
        }))
        .pipe(rename(function (path) {
            path.basename += ".latest.node";
            return path;
        }))
        .pipe(gulp.dest("dist"));
};

