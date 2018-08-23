const fs = require('fs');
const router = require('koa-router')();

function readFiles(){
    var files = fs.readdirSync(__dirname+'/controllers');
    var js_files = files.filter((m)=>{
        return m.endsWith('.js');
    })
    for(var fi of js_files){
        var mapping = require(__dirname+'/controllers/'+fi);
        delUrl(mapping);
    }
}
function delUrl(mapping){
    for(var url in mapping){
        if(url.startsWith('GET')){
            var path = url.substring(4);
            router.get(path, mapping[url]);
        }else if(url.startsWith('POST')){
            var path = url.substring(5);
            router.post(path, mapping[url]);
        }else{
            console.log('Invid url: '+url);
        }
    }
}

module.exports = function(dir){
    let con_dir = dir || 'controllers';
    readFiles();
    return router.routes();
}