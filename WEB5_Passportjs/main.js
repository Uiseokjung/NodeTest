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

var flash = require('connect-flash')

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
})) //세션 뒤에 passport가 등장해야함

app.use(flash())

/*
app.get('/flash', function(req, res){
  req.flash('msg', 'Flash is back!') //flash는 session store에 저장한다
  res.send('flash')
})

app.get('/flash-display', function(req, res){
  // res.render('index', { messages: req.flash('info') })
  var fmsg = req.flash() //flash 데이터는 일회성 데이터
  console.log(fmsg)
  res.send(fmsg)
})
*/

var authData = {
  email:'egoing777@gmail.com',
  password:'111111',
  nickname:'egoing'
}

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done){
  done(null, user.email)
})

passport.deserializeUser(function(id, done){
    done(null, authData)
})

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function(username, password, done){
    if(username == authData.email){
      if(password == authData.password){
        return done(null, authData)
      }else{
        return done(null, false, {
          message: 'Incorrect password.'
        })
      }
    } else{
      return done(null, false, {
        message: 'Incorrect username.'
      })
    }

    /*
    User.findOne({
      username: username
    }, function(err, user){
      if(err){
        return done(err)
      }
      if(!user){
        return done(null, false, {
          message: 'Incorrect username.'
        })
      }
      if(!user.validPassword(password)){
        return done(null, false, {
          message: 'Incorrect password.'
        })
      }
      return done(null, user)
    })
    */
  }
))

app.post('/auth/login_process',
passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true,
  successFlash: true
  })
)



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
