var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var expressHbs = require('express-handlebars');

var mongoose = require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
require('dotenv').config()


var app = express();
mongoose.connect(process.env.DB_STRING , {useNewUrlParser: true, useUnifiedTopology: true}).then((err) => {
    if(err) {
        console.log('success')
    }
}).catch(err => {
    console.log('in catch -->', err)
});


// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs', runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        },
    }));
app.set('view engine', '.hbs');

var hbs = require('handlebars');

var img_deig = "";
hbs.registerHelper('splitUrl', function (url) {
    var Array = url.split(',');

    return Array;
});

hbs.registerHelper("counter", function (url){
    var Array = url.split(',');
    return Array.length;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'secretePassword', resave: false, saveUninitialized: false}));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(process.env.PORT || 3100, () => {
    console.log('up and listening at 3100')
})

module.exports = app;
