module.exports = function (config) {
    config.set({
        basePath: __dirname,
        frameworks: ["jasmine"],
        files: [
            {pattern: "src/nodelist.js", included: true},
            {pattern: "tests/*.js", included: true}
        ],
        exclude: [],
        reporters: ["progress"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Firefox"],
        captureTimeout: 6000,
        singleRun: false
    });
};
