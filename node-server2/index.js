/**
 * Created by qiaohao on 2018/10/11.
 */
var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')


var routes = {

    '/a' : function (req,res) {
        res.end(JSON.stringify(req.query))
    },
    '/b' : function (req,res) {
        res.end('match /b')
    },
    '/a/c' : function (req,res) {
        res.end('match /a/c')
    },
    '/search' : function (req,res) {
        res.end('username:' + req.body.username + ',password:' + req.body.password)
    }

}


var server = http.createServer(function(req,res){
    routerPath(req,res)
})

server.listen(8080)
console.log('visit http://localhost:8080')

function routerPath(req , res){
    var pathObj = url.parse(req.url,true)
    var handlerFn = routes[pathObj.pathname]
    if(handlerFn){
        req.query = pathObj.query

        var body = ''
        req.on('data',function(chunk){
            body += chunk
        }).on('end',function () {
            req.body = parseBody(body)
            handlerFn(req,res)
        })

    }else{
        staticRoot(path.resolve(__dirname,'static'),req,res)
    }

}


function staticRoot(staticPath,req,res){
    var pathObj = url.parse(req.url,true)
    var filePath = path.join(staticPath,pathObj.pathname)
    fs.readFile(filePath,'binary',function(err,content){
        if(err){
            res.writeHead('404','Not Found')
            return res.end()
        }else{
            res.writeHead('200','OK')
            res.write(content,'binary')
            res.end()
        }
    })
}



function parseBody(body){
    console.log(body)
    var obj = {}
    body.split('&').forEach(function(str){
        var arr = str.split('=')
        obj[arr[0]] = arr[1]
    })
    return obj
}

