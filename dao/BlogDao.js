var dbUtil = require("./dbUtil");

function insertBlog(title,content,views,tags, ctime,utime, success){
    var insetSql = "insert into blogs (`title`,`content`,`views`,`tags`,`ctime`,`utime`) values (?,?,?,?,?,?)";
    var params = [title,content,views,tags, ctime,utime];

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
function queryAllBlog(success){
    var insetSql = "select * from blogs order by id desc";
    var params = [];

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

function queryBlogByPage(page, pageSize, success){
    var insetSql = "select * from blogs order by id desc limit ?,?";
    var params = [page * pageSize,pageSize];

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

function queryBlogId(id,success){
    var insetSql = "select * from blogs where id=?";
    var params = [id];

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

function queryBlogCount(success){
    var insetSql = "select count(1) as count from blogs ";
    var params = [];

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
function addViews(id,success){
    var insetSql = "update blogs set views = views + 1 where id = ?; ";
    var params = [id];

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
function queryHotBlog(size,success){
    var insetSql = "select * from  blogs order by views desc limit ?";
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
module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogId = queryBlogId;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;