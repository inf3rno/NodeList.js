require("gulp-task-file-loader")("tasks/*.js", {
    "release": [
        "browser",
        "compress"
    ],
    "compress": [
        "browser"
    ],
    "browser": [
        "clean"
    ]
});