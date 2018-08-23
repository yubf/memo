'use strict'
var 
    fs = require('fs'),
    url = require('url'),
    http = require('http'),
    path = require('path');

var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir:' + root);
var server = http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(root, 'app', pathname);
    fs.stat(filepath, function(err, stats){
        if(!err && stats.isFile()){
            console.log('200 '+request.url);
            response.writeHead(200);
            fs.createReadStream(filepath).pipe(response);
        }else if(!err && stats.isDirectory()){
            var indexPath = path.join(filepath, 'index.html');
            var defPath = path.join(filepath, 'default.html');
            fs.stat(indexPath, function(ierr, istats){
                if(ierr){
                    fs.stat(defPath, function(derr, dstats){
                        if(derr){
                            console.log('404 '+request.url);
                            response.writeHead(404);
                            response.end("404 Not Found");
                        }else{
                            console.log('200 '+request.url);
                            response.writeHead(200);
                            fs.createReadStream(defPath).pipe(response);
                        }
                    })
                }else{
                    console.log('200 '+request.url);
                    response.writeHead(200);
                    fs.createReadStream(indexPath).pipe(response);
                }
            })
        }else{
            console.log('404 '+request.url);
            response.writeHead(404);
            response.end("404 Not Found");
        }
    })
})

server.listen(9000);
console.log('Server is running at http://127.0.0.1:9000/');