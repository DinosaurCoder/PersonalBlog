var path = new Map();
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/respUtil");
var tagsDao = require("../dao/TagsDao");
var url = require("url");



function queryAllTags(request, response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false
        });
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}


path.set("/queryAllTags", queryAllTags);

module.exports.path = path;