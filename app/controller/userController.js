//处理具体请求信息以及返回数据的，userController.js中处理了GET请求获取用户信息，POST请求保存用户信息
const userService = require('./../service/userService.js');
const logUtil = require('./../utils/logUtil');

var getUserInfo = async (ctx, next) => {
	//响应开始时间
	const t0 = new Date();
	//响应间隔时间
	let ms;
	try {
		let query = ctx.query;
		let userId = query.id;
		let responseJson = await userService.getUserInfo(userId);
		ctx.response.type = 'application/json;charset=UTF-8';
		ctx.response.body = responseJson;
		
		ms = new Date() - t0;
		//记录响应日志
		logUtil.logResponse(ctx, ms);
	} catch (error) {
		ms = new Date() - t0;
		//记录异常日志
		logUtil.logError(ctx, error, ms);
	}
};

var saveUserInfo = async (ctx, next) => {
	//响应开始时间
	const t0 = new Date();
	//响应间隔时间
	let ms;
	try {
		let requestBody = ctx.request.body;
		//TODO数据处理
		console.log(requestBody);
		let responseJson = await userService.saveUserInfo(requestBody);
		ctx.response.type = 'application/json;charset=UTF-8';
		ctx.response.body = responseJson;
		
		ms = new Date() - t0;
		//记录响应日志
		logUtil.logResponse(ctx, ms);
	} catch (error) {
		ms = new Date() - t0;
		//记录异常日志
		logUtil.logError(ctx, error, ms);
	}
};

var userInfo = async (ctx, next) => {
	//响应开始时间
	const t0 = new Date();
	//响应间隔时间
	let ms;
	try {
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
		
		ms = new Date() - t0;
		//记录响应日志
		logUtil.logResponse(ctx, ms);
	} catch (error) {
		ms = new Date() - t0;
		//记录异常日志
		logUtil.logError(ctx, error, ms);
	}
};

module.exports = {
	'GET /cgi/user/getUserInfo': getUserInfo,
	'POST /cgi/user/saveUserInfo': saveUserInfo,
    'GET /user/info': userInfo
};