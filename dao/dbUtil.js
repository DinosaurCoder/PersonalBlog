var mysql = require("mysql");

function createConnection (){

    var connection = mysql.createConnection({
        host: "192.168.0.104",
        port: "3306",
        user: "root",
        password: "123",
        database: "my_blog"
    })
    return connection;
}

module.exports.createConnection = createConnection;