//仅对/api开头的url进行格式化处理
//app.use(response_formatter('^/api'));

const logUtil = require('./logUtil');
//response数据格式化
var response_formatter = (ctx) => {
	//如果有返回数据，将返回数据添加到data中
	let body = ctx.response.body;
	let result = {
		statusCode: 0,
		statusDesc: 'success',
		timestamp: new Date().getTime()
	};
	if (body) {
		if (!body._code) {
			result.data = body;
		} else {//报错
			result.statusCode = body._code;
			result.statusDesc = body._message;
			result.data = null;
		}
	} else {
		result.data = null;
	}
	ctx.response.body = result;
};

var url_filter = function(pattern) {
    return async function(ctx, next) {
		//响应开始时间
		const t0 = new Date();
		//响应间隔时间
		let ms;
		try {
			var reg = new RegExp(pattern);
			//先去执行路由
			await next();
			//通过正则的url进行格式化处理
			if (reg.test(ctx.originalUrl)) {
				response_formatter(ctx);
			}
			
			ms = new Date() - t0;
			//记录响应日志
			logUtil.logResponse(ctx, ms);
		} catch (error) {
			ms = new Date() - t0;
			//记录异常日志
			logUtil.logError(ctx, error, ms);
		}
    }
};

module.exports = url_filter;