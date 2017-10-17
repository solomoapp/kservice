//处理封装从***Dao.js获取到的数据返回给Controller
const userDao = require('./../dao/userDao.js');

var getUserInfo = async (userId) => {
    var users = await userDao.getUserById(userId);
    var responseJson = {
		code: 0,
		msg: '成功',
		timestamp: new Date().getTime(),
		data: users[0]
	};
    return responseJson;
}

var userInfo = async (userId) => {
    var users = await userDao.getUserById(userId);
    var responseContent = '';
    for(let user of users) {
        responseContent += '姓名：' + user.name + '&nbsp;|';
        responseContent += '年龄：' + user.age + '&nbsp;|';
        responseContent += '身高：' + user.height + '<br />';
    }
    return responseContent;
}

module.exports = {
    getUserInfo : getUserInfo,
	userInfo : userInfo,
};