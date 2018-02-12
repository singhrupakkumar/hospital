// requires the model with Passport-Local Mongoose plugged in
var User = require('./models/user'),
        LocalStrategy = require('passport-local').Strategy,
        FacebookStrategy = require('passport-facebook').Strategy,
        GoogleStrategy  = require('passport-google-oauth2').Strategy,
        configAuth = require('./auth');




module.exports = function(passport) {
    // use static authenticate method of model in LocalStrategy
    passport.use(User.createStrategy());

    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'link', 'picture.width(500).height(500)', 'emails']

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        //console.log(profile);

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({'email':profile.emails[0].value }, function(err, user) {
//console.log(profile);
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err){
                    return done(err);
                   // console.log("error here");
                }
                // if the user is found, then log them in
                if (user) {  
//                    var newUser  = new User();
//                    newUser.random = 
                 
                    user.save(function(err) {
                        if (err){
                            throw err;
                        
                       }
                   })
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser  = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook_id    = profile.id; // set the users facebook id                   
                    newUser.facebook_token = token; // we will save the token that facebook provides to the user                    
                    newUser.username  = profile.displayName; // look at the passport user profile to see how names are returned
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
                    newUser.image =  profile.photos[0].value;
                    newUser.role="user";
                    newUser.status="1";
                   
                    //console.log(newUser);
                    //console.log("add new user");
                    // facebook can return multiple emails so we'll take the first // facebook can return multiple photo  so we'll take the first
                    // save our user to the database
                    newUser.save(function(err) {
                        if (err){
                            throw err;
                            //console.log("error in save new user");
                          
                    }    
                   // console.log("save new user");
                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
    
//    passport.use(new GoogleStrategy({
//        clientID        : configAuth.googleAuth.clientID,
//        clientSecret    : configAuth.googleAuth.clientSecret,
//        callbackURL     : configAuth.googleAuth.callbackURL,
//        passReqToCallback   : true,
//    },
//    function(request,token, refreshToken, profile, done) {
//          console.log(profile.photos[0].value);
//        // make the code asynchronous
//        // User.findOne won't fire until we have all our data back from Google
//        process.nextTick(function() {
//
//            // try to find the user based on their google id
//            User.findOne({ 'email' : profile.emails[0].value }, function(err, user) {
//                if (err)
//                    return done(err);
//
//                if (user) {
//
//                    // if a user is found, log them in
//                    return done(null, user);
//                } else {
//                    // if the user isnt in our database, create a new user
//                    var newUser          = new User();
//
//                    // set all of the relevant information
//                    newUser.google_id    = profile.id;
//                    newUser.google_token = token;
//                    newUser.firstname  = profile.displayName;
//                    newUser.email = profile.emails[0].value; // pull the first email
//                    newUser.role="user";
//                    var img=profile.photos[0].value;
//                    var fimg= img.replace(/sz=50/gi,'sz=500');
//                    newUser.profilepic=fimg;
//                    newUser.status="1";
//
//                    // save the user
//                    newUser.save(function(err) {
//                        if (err)
//                            throw err;
//                        return done(null, newUser);
//                    });
//                }
//            });
//        });
//
//    }));
};
