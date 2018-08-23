var fn_hello = async(ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body=`<h2>Hello, ${name}</h2>`;
}

module.exports = {
    'GET /hello/:name':fn_hello
}