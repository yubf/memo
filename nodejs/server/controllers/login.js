var fn_index = async(ctx, next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="pw" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
}

var fn_login = async(ctx, next)=>{
    var name = ctx.request.body.name || '';
    var pw = ctx.request.body.pw || '';
    if(name === "yubf" && pw==="123456"){
        ctx.response.body = `Welcome, ${name}`;
    }else{
        ctx.response.body = `Name or Password is wrong!`
    }
}

module.exports = {
    'GET /':fn_index,
    'POST /signin':fn_login
}