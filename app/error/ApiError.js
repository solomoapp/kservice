const ApiErrorNames = require('./ApiErrorNames.js');

/**
 * 自定义Api异常
 */
class ApiError extends Error {

    //构造方法
    constructor(error_name, error_code,  error_message) {
        super();

        var error_info = ApiErrorNames.getErrorInfo(error_name);
        this.name = error_name;
        this.code = error_info.code || error_code;
        this.message = error_info.message || error_message;
    }
}

module.exports = ApiError;