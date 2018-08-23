'use strict'
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h2>Hello, this is koa2</h2>';
})
app.listen(3300);
console.log('app started at port 3300');