var dbUtil = require("./dbUtil");

function insertEveryDay(content, ctime, success){
    var insetSql = "insert into every_day (`content`,`ctime`) values (?,?)";
    var params = [content, ctime];

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


function queryEveryDay(success){
    
    var querySql = "select * from every_day order by id desc limit 1;";
    var params = [];
    var connection = dbUtil.createConnection();
   
    connection.connect();

    connection.query(querySql,params,function(error, result){
        if(error == null){
            success(result);
        }
        else {
            console.log(error);
        }
    })
    connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;