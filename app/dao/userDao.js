//通过请求传入参数来获取user数据
const mysql = require('./../utils/mysqlUtil.js');

var getUserById = async (userId) => {
    let mysqlOptions = {
        sql : 'select * from user where id = ?',
        args : [userId]
    };

    var query = await mysql.execQuery(mysqlOptions);
    return query;
};

var saveUserInfo = async (requestBody) => {
	let sql = '', args = [];
	for(let name in requestBody) {
		if(name != 'id') {
			sql += ', '+name+' = ? ';
			args.push(requestBody[name]);
		}
	}
	sql = sql.substring(1);
	if(!requestBody.id) {//新增
		sql = 'INSERT INTO user SET ' + sql;
	} else {//修改
		sql = 'UPDATE user SET ' + sql + ' WHERE id = ?';
		args.push(requestBody.id);
	}
	
    let mysqlOptions = {
        sql : sql,
        args : args
    };

    var query = await mysql.execQuery(mysqlOptions);
    return query;
};

module.exports = {
    getUserById : getUserById,
	saveUserInfo : saveUserInfo
};