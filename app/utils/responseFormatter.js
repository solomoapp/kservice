//仅对/api开头的url进行格式化处理
//app.use(response_formatter('^/api'));

const logUtil = require('./logUtil.js');
const ApiError = require('../error/ApiError.js');

//response数据格式化
var response_formatter = (ctx) => {
	//如果有返回数据，将返回数据添加到data中
	let body = ctx.response.body;
	let result = {
		statusCode: 0,
		statusDesc: 'success',
		timestamp: new Date().getTime(),
		data: body || null
	};
	
	ctx.response.body = result;
};

var url_filter = function(pattern) {
    return async function(ctx, next) {
		//响应开始时间
		const t0 = new Date();
		//响应间隔时间
		let ms;
		var reg = new RegExp(pattern);
		try {
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

			//如果异常类型是API异常并且通过正则验证的url, 将错误信息添加到响应体中返回。
            if (error instanceof ApiError && reg.test(ctx.originalUrl)) {
                ctx.response.status = 200;
                ctx.response.body = {
                    statusCode: error.code,
					statusDesc: error.message,
					timestamp: new Date().getTime(),
					data: null
                };
            }
		}
    }
};

module.exports = url_filter;