//数据库连接配置
var database = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '123456',
	database: 'test',
	charset: 'UTF8_GENERAL_CI',
	connectionLimit: 10
};

module.exports = {
	database: database,
	port: 7000
};