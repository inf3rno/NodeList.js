var browserify = require("browserify"),
    fs = require("fs");

module.exports = function () {
    return browserify()
        .require("./dist/nodelist.latest.node.min", {expose: "nodelist"})
        .bundle()
        .pipe(fs.createWriteStream("dist/nodelist.latest.bundle.js"));
};