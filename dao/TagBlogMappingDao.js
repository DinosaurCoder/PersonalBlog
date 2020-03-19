var dbUtil = require("./dbUtil");

function insertTagBlogMapping(tagId, blogId,ctime,utime, success){
    var insetSql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?)";
    var params = [tagId, blogId,ctime,utime];

    var connection = dbUtil.createConnection();

    connection.connect();

    connection.query(insetSql,params,function(error, result){
        if(error == null){
            success(result);
        }
        else {
            console.log(error);
        }
    })
    connection.end();
}

function queryByTag(tagId,page,pageSize, success){
    var insetSql = "select * from tag_blog_mapping where tag_id = ? limit ?,?;";
    var params = [tagId,page*pageSize,pageSize];

    var connection = dbUtil.createConnection();

    connection.connect();

    connection.query(insetSql,params,function(error, result){
        if(error == null){
            success(result);
        }
        else {
            console.log(error);
        }
    })
    connection.end();
}

function queryByTagCount(tagId, success){
    var insetSql = "select count(1) as count from tag_blog_mapping where tag_id = ?";
    var params = [tagId];

    var connection = dbUtil.createConnection();

    connection.connect();

    connection.query(insetSql,params,function(error, result){
        if(error == null){
            success(result);
        }
        else {
            console.log(error);
        }
    })
    connection.end();
}

module.exports.queryByTagCount =  queryByTagCount;
module.exports.queryByTag =  queryByTag;
module.exports.insertTagBlogMapping = insertTagBlogMapping;