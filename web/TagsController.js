var path = new Map();
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/respUtil");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var tagsDao = require("../dao/TagsDao");
var blogDao = require("../dao/BlogDao");
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
function queryByTag(request,response){
    var params = url.parse(request.url,true).query;
    tagsDao.queryTag(params.tag,function(result){
        if(result==null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "找到", result));
            response.end();
        }
        else{
            tagBlogMappingDao.queryByTag(result[0].id,parseInt(params.page),parseInt(params.pageSize),function(result){
                var blogList = [];
                for(var i = 0;i<result.length;i++){
                    blogDao.queryBlogId(result[i].blog_id,function(result){
                        blogList.push(result[0]);
                    });
                }
                getResult(blogList,result.length,response)
            })
        }

    });

}

function queryByTagCount(request,response){
    var params = url.parse(request.url,true).query;
    tagsDao.queryTag(params.tag,function(result){
        tagBlogMappingDao.queryByTagCount(result[0].id,function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "找到", result));
            response.end();
        })

    });

}

path.set("/queryByTagCount", queryByTagCount);
path.set("/queryByTag", queryByTag);

function getResult(blogList,len,response){
    if(blogList.length<len){
        setTimeout(()=>{
            getResult(blogList,len,response)
        },10)
    }
    else{
        for(var i=0; i<blogList.length;i++){
            blogList[i].content =blogList[i].content.replace(/<[^>]+>/g," ");
            blogList[i].content = blogList[i].content.replace(/&nbsp;/g,'')
            blogList[i].content = blogList[i].content.substring(0,400);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "找到", blogList));
        response.end();
    }
}
 
path.set("/queryAllTags", queryAllTags);

module.exports.path = path;