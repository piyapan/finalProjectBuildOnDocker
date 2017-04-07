var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var routes = require('./routes/index');
var users = require('./routes/users');
var customer = require('./routes/setting/customer');
var config = require('./routes/config');
var ip = require('./routes/ip');
var helpdesk = require('./routes/helpdesk');

var app = express();
var sess = {
  secret: 'PINA#3995dseiw/e3d',
  cookie: {}
}

app.use(session({
  secret: 'PINA#3995dseiw/e3d',
  resave: false,
  saveUninitialized: true
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
app.use('/', routes);
app.use('/setting/customer/',customer);
app.use('/ip',ip);
app.use('/config',config);
app.use('/users', users);
app.use('/helpdesk/',helpdesk);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    let str = '<a href="/"> login now</a>';
    res.send('error status 500 :'+err.message+'<br>'+str);
  });
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  res.send('error '+ err.message);
});



module.exports = app;
