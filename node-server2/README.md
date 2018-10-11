1、本项目创建了一个简单的小服务器

2、通过node index.js 运行服务器 服务器端口是8080

3、服务器里定义了4个路由
    /a    用户通过 http://localhost:8080/a?a=1 访问会返回   {a:1}
    /b    用户通过 http://localhost:8080/b 访问会返回   match /b
    /a/c   用户通过 http://localhost:8080/a/c 访问会返回   match /a/c
    /search 用户通过POST请求 http://localhost:8080/search 并传递上参数 username=q&password=1 会返回 {username:'1',password:1}


4、如果没有访问路由 而访问了 http://localhost:8080/sample/test.html,那么服务器会读取本地的sample文件夹下面的test.html文件返回回去

5、如果访问的路由或者文件不存在  服务器会返回404

