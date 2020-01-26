var dbUtil = require("./dbUtil");

function insertTag(tags, ctime,utime, success){
    var insetSql = "insert into tags (`tag`,`ctime`,`utime`) values (?,?,?)";
    var params = [tags, ctime,utime];

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

function queryTag(tags, success){
    var insetSql = "select * from tags where tag=?;";
    var params = [tags];

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

function queryAllTag(success){
    var insetSql = "select * from tags";
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


module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;