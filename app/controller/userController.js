//处理具体请求信息以及返回数据的，userController.js中处理了GET请求获取用户信息，POST请求保存用户信息
const userService = require('./../service/userService.js');
const logUtil = require('./../utils/logUtil');

var getUserInfo = async (ctx, next) => {
	let query = ctx.query;
	let userId = query.id;
	let responseData = await userService.getUserInfo(userId);
	//ctx.response.type = 'application/json; charset=utf-8';
	ctx.response.body = responseData;
};

var saveUserInfo = async (ctx, next) => {
	let requestBody = ctx.request.body;
	//TODO数据处理
	let responseData = await userService.saveUserInfo(requestBody);
	//ctx.response.type = 'application/json; charset=utf-8';
	ctx.response.body = responseData;
};

//直出页面
var userInfo = async (ctx, next) => {
	let query = ctx.query;
	let userId = query.id;
	let responseContent = await userService.userInfo(userId);
	let html  = '<!DOCTYPE html>';
		html += '<html>';
		html += '<head>';
		html += '<meta charset="utf-8">';
		html += '</head>';
		html += '<body>';
		html += '<div>userinfo: ' + responseContent + '</div>';
		html += '</body>';
		html += '</html>';
	ctx.response.type = 'text/html';
	ctx.response.body = html;
};

module.exports = {
	'GET /api/user/getUserInfo': getUserInfo,
	'POST /api/user/saveUserInfo': saveUserInfo,
    'GET /user/info': userInfo
};