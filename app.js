var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./database');

(async () => {
  await connectDB();
})();

// google auth
const { OAuth2Client } = require('google-auth-library');
const bodyParser = require('body-parser');
const client = new OAuth2Client('553879970155-r8cbjb66jr58l5gk6ldql83qa1htcpbb.apps.googleusercontent.com');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// google auth
app.use(bodyParser.json());

// rota de autênticação
app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '553879970155-r8cbjb66jr58l5gk6ldql83qa1htcpbb.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    res.json({ success: true, user: payload });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});


app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
