const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const responseFormatter = require('./app/utils/responseFormatter.js');
const router2controller = require('./app/router2controller.js');
const config = require('./config/config.local.js');

app.use(bodyParser());
app.use(serve(__dirname + '/app/public'));
app.use(responseFormatter('^/api'));
app.use(router2controller());
app.listen(config.port);
console.log('Server started and listen on port ' + config.port);