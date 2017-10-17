//通过请求传入参数来获取user数据
const mysql = require('./../utils/mysqlUtil.js');

var getUserById = async (userId) => {
    let mysqlOptions = {
        sql : 'select * from user where id = ?',
        args : [userId]
    };

    var users = await mysql.execQuery(mysqlOptions);
    if(users.length == 0) {
        return null;
    } else {
        return users;
    }
};

module.exports = {
    getUserById : getUserById
};