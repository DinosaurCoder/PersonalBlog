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

module.exports.insertTagBlogMapping = insertTagBlogMapping;