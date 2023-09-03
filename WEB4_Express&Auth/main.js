var express = require('express')
var app = express()
var fs = require('fs')
var template = require('./lib/template.js')
// var qs = require('querystring')
var bodyParser = require('body-parser')
var compression = require('compression')
var helmet = require('helmet')

var session = require('express-session')
var FileStore = require('session-file-store')(session)

var topicRouter = require('./routes/topic')
var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')


app.use(helmet())

app.use(express.static('public'))
app.use(compression())

app.use(session({
  secret: 'asadlfkj!@#!@#dfgasdg',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))

app.get(`*`, function(request, response, next){
  fs.readdir(`./data`, function(error, filelist){
    request.list = filelist;
    next();
  })
})

app.use(bodyParser.urlencoded({ extended: false}));

app.use('/topic', topicRouter)
app.use('/', indexRouter)
app.use('/auth', authRouter)

// app.get('/', (req,res) => res.send('Hello World!'))
//route, routing 
// app.get('/', function(request,response){
//         //fs.readdir('./data', function(error, filelist){
//         var title = 'Welcome';
//         var description = 'Hello, Node.js';
//         var list = template.list(request.list);
//         var html = template.HTML(title, list,
//             `
//             <h2>${title}</h2>${description}
//             <img src="/images/hello.jpg" style="width:300px; display:block; margin-top:10px;">
//             `,
//             `<a href="/topic/create">create</a>`
//         );
//         response.end(html);
// });


app.use(function(request, response, next){
  response.status(404).send('Sorry cant find that!')
})

app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!')
});
// var http = require('http');
// var fs = require('fs');
// var url = require('url');
// var qs = require('querystring');
// var template = require('./lib/template.js');
// var path = require('path');
// var sanitizeHtml = require('sanitize-html');

// var app = http.createServer(function(request,response){
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathname = url.parse(_url, true).pathname;
//     if(pathname === '/'){
//       if(queryData.id === undefined){
//  
//       } else {
//        
//       }
//     } else if(pathname === '/create'){
//       
//     } else if(pathname === '/create_process'){
//       
//     } else if(pathname === '/update'){

//     } else if(pathname === '/update_process'){

//     } else if(pathname === '/delete_process'){

//     } else {
//       response.writeHead(404);
//       response.end('Not found');
//     }
// });
// app.listen(3000);
