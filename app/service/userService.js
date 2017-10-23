//处理封装从***Dao.js获取到的数据返回给Controller
const userDao = require('./../dao/userDao.js');
const ApiError = require('../error/ApiError.js');
const ApiErrorNames = require('../error/ApiErrorNames.js');

var getUserInfo = async (userId) => {
    var result = await userDao.getUserById(userId);
    var data = result[0];
    if (!data) {
        throw new ApiError(ApiErrorNames.USER_NOT_EXIST);
    }
    return data;
}

var saveUserInfo = async (requestBody) => {
    var result = await userDao.saveUserInfo(requestBody);
    var data = null;
	if (!result.warningCount) {
		data = result.insertId || null
	} else {
        throw new ApiError('_9527', -1, result.message);
	}
    return data;
}

var userInfo = async (userId) => {
    var result = await userDao.getUserById(userId);
    var responseContent = '';
    for(let user of result) {
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