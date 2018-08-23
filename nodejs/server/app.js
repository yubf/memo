const fs = require('fs');
const koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new koa();
var controller = require('./controller');

app.use(async (ctx, next)=>{
    console.log(`${ctx.request.method} ${ctx.request.url}`);
    await next();
})

app.use(bodyParser());
app.use(controller());
app.listen(8060);
console.log('Server start on port 8060...');