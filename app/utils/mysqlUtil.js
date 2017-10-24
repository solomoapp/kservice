//包含了数据库连接池控制，连接建立、释放管理，执行Dao发起的数据库操作请求
const mysql = require('mysql');
const config = require('./../../config/config.local.js');
const ApiError = require('../error/ApiError.js');

var connectionPool = mysql.createPool({
    'host' : config.database.host,
    'port' :config.database.port,
    'user' : config.database.user,
    'password' : config.database.password,
    'database' : config.database.database,
    'charset' : config.database.charset,
    'connectionLimit' : config.database.connectionLimit,
    'supportBigNumbers' : true,
    'bigNumberStrings' : true
});

var release = connection => {
    connection.end(function(error) {
        if(error) {
            console.log('Connection closed failed.');
        } else {
            console.log('Connection closed succeeded.');
        }
    });
};

var execQuery = sqlOptions => {
    var results = new Promise((resolve, reject) => {
        connectionPool.getConnection((error, connection) => {
            if(error) {
                console.log('Get connection from mysql pool failed !');
                //throw error;
                reject(new ApiError('_9527', -1, 'Get connection from mysql pool failed !'));
            }

            var sql = sqlOptions['sql'];
            var args = sqlOptions['args'];
            
            if(!args) {
                var query = connection.query(sql, (error, results) => {
                    if(error) {
                        console.log('Execute query error !');
                        //throw error;
                        reject(new ApiError('_9527', -1, 'Execute query error !'));
                    }

                    resolve(results);
                });
            } else {
                var query = connection.query(sql, args, function(error, results) {
                    if(error) {
                        console.log('Execute query error !');
                        //throw error;
                        reject(new ApiError('_9527', -1, 'Execute query error !'));
                    }

                    resolve(results);
                });
            }

            connection.release(function(error) {
                if(error) {
                    console.log('Mysql connection close failed !');
                    //throw error;
                }
            });
        });
    }).then(function (chunk) {
        return chunk;
    }).catch(function(error) {
        throw error;
    });

    return results;
};

module.exports = {
    release : release,
    execQuery : execQuery
};