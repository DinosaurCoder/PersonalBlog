var dbUtil = require("./dbUtil");

function insertComment(blogId,parent,parentName,userName,comments, email,ctime,utime, success){
    var insetSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`comments`,`email`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?)";
    var params = [blogId,parent,parentName,userName,comments, email,ctime,utime];

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

function queryComment(blogId,success){
    var insetSql = "select * from comments where blog_id = ?;";
    var params = [blogId];

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
function queryNewComment(size,success){
    var insetSql = "select * from comments order by id desc  limit ?;";
    var params = [size];

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
function queryCommentTotal(blogId,success){
    var insetSql = "select count(1) as count from comments where blog_id = ?;";
    var params = [blogId];

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
module.exports.insertComment = insertComment;
module.exports.queryComment = queryComment;
module.exports.queryCommentTotal = queryCommentTotal;
module.exports.queryNewComment = queryNewComment;