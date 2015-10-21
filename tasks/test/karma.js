var karma = require("karma");

module.exports = function (done) {
    var server = new karma.Server({
        configFile: "../../../karma.conf.js",
        singleRun: true,
        files: [
            {pattern: "dist/nodelist.latest.bundle.js", included: true},
            {pattern: "tests/*.js", included: true}
        ],
        browsers: ["Firefox", "Chrome", "Opera", "IE"], //opera and msie launchers are buggy on windows
        autoWatch: false
    }, function (exitCode) {
        done(exitCode ? "Tests failed." : null);
    });
    server.start();
};