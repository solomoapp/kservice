//处理封装从***Dao.js获取到的数据返回给Controller
const userDao = require('./../dao/userDao.js');

var getUserInfo = async (userId) => {
    var query = await userDao.getUserById(userId);
    var responseJson = {
		statusCode: 0,
		statusDesc: '成功',
		timestamp: new Date().getTime(),
		data: query[0] || null
	};
    return responseJson;
}

var saveUserInfo = async (requestBody) => {
    var query = await userDao.saveUserInfo(requestBody);
    var responseJson = null;
	if(!query.warningCount){
		responseJson = {
			statusCode: 0,
			statusDesc: '成功',
			timestamp: new Date().getTime(),
			data: query.insertId || null
		};
	}else{
		responseJson = {
			statusCode: 0,
			statusDesc: query.message,
			timestamp: new Date().getTime(),
			data: null
		};
	}
    return responseJson;
}

var userInfo = async (userId) => {
    var query = await userDao.getUserById(userId);
    var responseContent = '';
    for(let user of query) {
        responseContent += '姓名：' + user.name + '&nbsp;|';
        responseContent += '年龄：' + user.age + '&nbsp;|';
        responseContent += '身高：' + user.height + '<br />';
    }
    return responseContent;
}

module.exports = {
    getUserInfo : getUserInfo,
	saveUserInfo : saveUserInfo,
	userInfo : userInfo,
};