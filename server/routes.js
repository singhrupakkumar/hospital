var express = require('express'),
path = require('path'),
User = require('./models/user'),
Availability = require('./models/availability'),
Hospital = require('./models/hospital'),
Contact = require('./models/contact'),
Page = require('./models/page'),
nodemailer = require('nodemailer'),
rootPath = path.normalize(__dirname + '/../'),
apiRouter = express.Router(),
router = express.Router()
aws = require('aws-sdk'),      
multer = require('multer'),
multerS3 = require('multer-s3'),
dateNow = Date.now(),
sr = require('simple-random'),
serialize = require('node-serialize'),
Hospital = require('./models/hospital'),
Favorite = require('./models/favorite'),  
Review = require('./models/review'),  
randomString = sr();
var transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    auth: {
        user: "AKIAJSAXCWS5JXZL74GQ",
        pass: "AmA4lgvGe18UdP4s626qPPixcBWO2I75zf2ioahIRn3s"
    } 
});

aws.config.update({    
    secretAccessKey: 'iuDBe2S70cHGWDV5QtbhUhmUfqwxcmBDmP1908J0', 
    accessKeyId: 'AKIAJIW2ZI5CHDJU7X4A'
});    


var key = randomString + ".jpg";
var s3 = new aws.S3({
    endpoint: 'https://s3.us-east-2.amazonaws.com',
    region: 'us-east-2',
    signatureVersion: 'v4',
    ACL: 'public-read',
    params: { 
        Bucket: 'hospitalbuck',
        Key: 'profilepic/' + key
    }  
});

var userupload = multer({ 
    storage: multerS3({
        s3: s3,
        bucket: 'hospitalbuck',
        key: function(req, file, cb) {
            //console.log(file);
            var flname = file.originalname;
            cb(null,'profilepic/' + dateNow + '' + flname); //use Date.now() for unique file keys
        }
    })
});
 




module.exports = function(app, passport) {  
    app.use('/api', apiRouter);
    app.use('/', router);
    // API routes
    require('./api/users')(apiRouter, passport, transporter, s3, randomString, userupload);
    require('./api/availability')(apiRouter, serialize);
    require('./api/hospitals')(apiRouter); 
    require('./api/contacts')(apiRouter);
    require('./api/pages')(apiRouter);
    require('./api/favorite')(apiRouter);
    require('./api/reviews')(apiRouter);      


    // home route
    
    router.get('/', function(req, res) {
        if (req.user) {
            res.render('index', {user: req.user});
        }else {
         res.render('index', {user: ''});    
     }
 });
    
    router.get('/allapi', function(req, res) {
     res.render('home/allapi');
 });
    
 /******************user module********************/
        router.get('/home/myprofile', isLogin,function(req, res) {     

        if (req.isAuthenticated()) {  
            res.render('home/profile',{user: req.user});
        } else { 
            console.log('You are not an admin');
            res.render('home/profile',{user:''});
        }       
        });
        
       router.get('/login', function(req, res) {  
           
          if (req.isAuthenticated()) {  
            res.render('index',{user: req.user});  
        } else { 
            res.render('home/login',{user:''});
        }   
        });
        
       router.get('/signup',function(req, res) {
           
         if (req.isAuthenticated()) {    
            res.render('index',{user: req.user}); 
        } else { 
            res.render('home/signup',{user:''});
        }     
        });   
        
        router.get('/changepassword',function(req, res) {
           
         if (req.isAuthenticated()) {    
            res.render('home/changepassword',{user: req.user}); 
        } else { 
            res.render('home/login',{user:''}); 
        }     
        }); 
        
        router.get('/forgot',function(req, res) {
           
         if (req.isAuthenticated()) {    
            res.render('home/profile',{user: req.user}); 
        } else { 
            res.render('home/forgot',{user:''}); 
        }     
        });   
        
        
        
     router.get('/privacyandpolicy', function(req, res) {     
        res.render('home/privacyandpolicy');    
    });

    router.get('/aboutus', function(req, res) {     
        res.render('home/aboutus');    
    });

     router.get('/terms', function(req, res) {     
        res.render('home/terms');    
    });

    router.get('/contact', function(req, res) {     
        res.render('home/contact');    
    });



    router.get('/resetpassword', function(req, res) { 
        //res.render('home/forgetpassword');
        console.log(req.query);
        User.findOne({'salt': req.query.id}, function(err, user) {
            console.log(user);
            if (user == null) {
                res.render('404',{user: user});
            } else {
                res.render('home/resetpassword', {salt: req.query.id,user: user});
            }
        });
    });
    
    /**************hoe user details***************/
     router.get('/userdetails', function(req, res) {  

        User.findById({'_id': req.query.id}, function(err, user) {
            console.log(user);  
            if (user == null) {
                res.render('404',{user: user});  
            } else { 
                res.render('home/userdetails', {userdetail: user});
            }
        });
    });
    
    
    router.get('/allappuser', function(req, res) { 
       if (req.isAuthenticated()) {  
         res.render('home/allappuser',{user: req.user});  
     } else {  
         res.render('home/allappuser',{user:''});
     }   
     });
    
    
   function isLogin(req, res, next) { 
    if (req.isAuthenticated()&& req.user.email !='') {   
       
        next();
    } else {
        console.log('Login first');
        res.redirect('/'); 
    }
  }    
    
    
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
    router.get('/home/logout', function(request, response) {
        request.logout();
        response.redirect('/');
    });


    // admin route
    router.get('/admin', function(req, res) {
        res.render('admin/login');
    });

    router.get('/admin/register', function(req, res) {
        res.render('admin/register');
    });

    router.get('/admin/dashboard', isAdmin, function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    });

    router.post('/register', function(req, res) {

        // passport-local-mongoose: Convenience method to register a new user instance with a given password. Checks if username is unique
        User.register(new User({
            email: req.body.email
        }), req.body.password, function(err, user) {
            if (err) {
                console.error(err);
                return;
            }

            // log the user in after it is created
            passport.authenticate('local')(req, res, function() {
                console.log('authenticated by passport');
                res.redirect('/admin/dashboard');
            });
        });
    });

    router.post('/login', passport.authenticate('local'), function(req, res) {  
        res.redirect('/admin/dashboard');
    });

    router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));


   
   
    router.get('/admin/resetpassword', function(req, res) {
        //res.render('home/forgetpassword');
        console.log(req.query);
        User.findOne({'salt': req.query.id}, function(err, user) {
            console.log(user);
            if (user == null) {
//                alert("if");
res.render('home/resetpassword');
} else {
    res.render('admin/resetpassword', {salt: req.query.id});
}
});
    });



    /*admin dashboard Login*/
    router.post('/adminfinallogin', function(req, res, next) {       
      passport.authenticate('local', function(err, user, info) { 
        if (err) {
      return next(err); // will generate a 500 error
  } 
  if (! user) {             
      return res.json({ success : false, message : info.message });     
  }  
  req.login(user, function(err){       
      if(err){
        return next(err);  
    }
       //res.redirect('/admin/dashboard');
       return res.json({ success : true, message : 'You have been successfully logged in...',info:info,userinfo:user});              
   });
})(req, res, next);
});
    






    app.use(function(req, res, next) {
        res.status(404);

        res.render('404');
        return;
    });

};

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        console.log('cool you are an admin, carry on your way');
        next();
    } else {
        console.log('You are not an admin');
        res.redirect('/admin');
    }
}  