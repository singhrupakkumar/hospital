
var express = require('express'),
       
mongoose = require('mongoose'),
        bodyParser = require('body-parser'),
        passport = require('passport'),
        cookieParser = require('cookie-parser'),
        methodOverride = require('method-override'),
        cors = require('cors'),
        app = express();

// ENVIRONMENT CONFIG
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
        envConfig = require('./server/env')[env];


//if (process.env.NODE_ENV === 'development') {
//    app.use(function(req, res, next) {
//        if (req.headers['x-forwarded-proto'] !== 'https') {
//            var finalstring =req.get('Host');
//           if(finalstring.indexOf('www') !== -1){
//             return res.redirect(['https://', req.get('Host'), req.url].join(''));  
//           }
//           else{
//               return res.redirect(['https://www.', req.get('Host'), req.url].join(''));
//           }
//            
//        }
//        
//        return next();
//    });
//  }
  
//if (process.env.NODE_ENV === 'development') {
//    app.use(function(req, res, next) {
//        if (req.headers['x-forwarded-proto'] !== 'https') {
//            return res.redirect(['https://www.', req.get('Host'), req.url].join(''));
//        } 
//        return next();
//    });
//  }

mongoose.connect('mongodb://hospital:hospital@ds245347.mlab.com:45347/hospital_dbname11');
mongoose.connection.on('open', function() {
    console.log('Mongoose connected');
});

// PASSPORT CONFIG
require('./server/passport')(passport);


//file size
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));




// ROUTES
require('./server/routes')(app, passport);

// Start server
app.listen(envConfig.port, function() {
    console.log('Server listening on port ' + envConfig.port)
});
