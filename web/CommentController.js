var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao")
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/respUtil");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var commentDao = require("../dao/commentDao");
var captcha = require("svg-captcha");
var url = require("url");
var path = new Map();

function queryNewComment (request,response) {
    commentDao.queryNewComment(7,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}
path.set("/queryNewComment",queryNewComment)
function queryCommentTotal(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentTotal(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}

path.set("/queryCommentTotal",queryCommentTotal)
function queryCommentByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryComment(parseInt(params.bid),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}

path.set("/queryCommentByBlogId",queryCommentByBlogId);
function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "请求成功", img));
    response.end();
}

path.set("/queryRandomCode",queryRandomCode);
function addComment(request,response){
    var params = url.parse(request.url, true).query;
    commentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.parentName,params.userName,params.comment,params.email,timeUtil.getNow(),timeUtil.getNow(),function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    })
}

path.set("/addComment",addComment);

module.exports.path = path;