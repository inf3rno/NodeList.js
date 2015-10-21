var argv = require("yargs").argv;
var group = argv._[0];

var groups = {
    "build": ["tasks/build/*.js", {
        "build": ["browserify"],
        "browserify": ["compress"],
        "compress": ["browser", "node"],
        "browser": ["clean"],
        "node": ["clean"]
    }],
    "test": ["tasks/test/*.js", {
        "test": ["karma"]
    }]
};

require("gulp-task-file-loader").apply(null, groups[group]);