export var BuildStatus;
(function (BuildStatus) {
    BuildStatus["SUCCESS"] = "success";
    BuildStatus["ERROR"] = "error";
    BuildStatus["PRE_BUILD"] = "preBuild";
    BuildStatus["BUILD"] = "build";
    BuildStatus["POST_BUILD"] = "postBuild";
    BuildStatus["END"] = "end";
    BuildStatus["PRE_DEV"] = "preDev";
    BuildStatus["DEV"] = "dev";
})(BuildStatus || (BuildStatus = {}));
