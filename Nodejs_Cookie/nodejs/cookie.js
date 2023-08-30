var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
    console.log(request.headers.cookie);
    var cookies = {};
    if(request.headers.cookie !== undefined){
        cookies = cookie.parse(request.headers.cookie);
    }
    console.log(cookies.yummy_cookie);
    response.writeHead(200, {
        'Set-Cookie':[
            'yummy_cookie=choco', 
            'tasty_cookie=strawberry',
            'Permanent=cookies; Max-Age=${60*60*24*30}', //시간 만큼 쿠키가 살아있음
            'Secure=Secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly', //자바스크립트로 통제 불가능(크롬 Console)
            'Path=Path; Path=/cookie', //쿠키가 저 Path에서만 살아있게 해줌
            'Domain=Domain; Domain=o2.org' //어디에서나 살아남을 수 있다
        ]
    });
    response.end('Cookie!!');
}).listen(3000);