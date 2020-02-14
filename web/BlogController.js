var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao")
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/respUtil");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var url = require("url");
var path = new Map();
function queryHotBlog(request,response){
    blogDao.queryHotBlog(10,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryHotBlog",queryHotBlog);
function queryBlogById(request,response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogId(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
        blogDao.addViews(parseInt(params.bid),function(result){})
    })
}
path.set("/queryBlogById",queryBlogById);

function queryAllBlog (request,response){    
    blogDao.queryAllBlog(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryAllBlog",queryAllBlog);

function queryBlogCount(request,response){
    blogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryBlogCount",queryBlogCount);

function queryBlogByPage(request, response) {
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for(var i=0; i<result.length;i++){
            result[i].content = result[i].content.replace(/<[^>]+>/g," ");
            result[i].content = result[i].content.substring(0,400);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryBlogByPage", queryBlogByPage);

function editBlog(request, response) {
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g, "").replace("，", ",");
    request.on("data", function (data) {
        blogDao.insertBlog(params.title, data.toString(), 0, tags, timeUtil.getNow(), timeUtil.getNow(), function (result) {
            try{
                response.writeHead(200,{'Content-Type':'text/html;charset=UTF8'});
                response.write(respUtil.writeResult("success", "添加成功", null));
                response.end();
            }catch(err){
                console.log(err);
            }
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        })
    })
}
path.set("/editBlog", editBlog);

function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        if (result == null || result.length == 0) {
            insetTag(tag, blogId);
        }
        else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) { });
        }
    });
}
function insetTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) { });
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {

    })
}

module.exports.path = path;

