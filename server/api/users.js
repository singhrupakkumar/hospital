/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var User = require('../models/user');
 var uuid = require('node-uuid');
 var fs = require('fs');
 var nodemailer = require("nodemailer");
 var smtpTransport = require("nodemailer-smtp-transport")

 var smtpTransport = nodemailer.createTransport(smtpTransport({
 	host : "smtp.gmail.com",
 	secureConnection : false,
 	port: 587,
 	auth: {  
 		user: 'rakeshmoyal@avainfotech.com',
 		pass: 'future@1234' 
 	}
 }));





// Users API
module.exports = function(apiRouter,passport,transporter,s3,randomString,userupload) { 
	

    
 /*************************front website*****************************************/ 
      /*user register*/
   apiRouter.post('/users/home', function(req, res) {   

        User.register(new User({
            username: req.body.username,
            phone: req.body.phone,
            address: req.body.address,
            role:"1",
            email: req.body.email
        }), req.body.password, function(err, user) { 
            if (err) { 
                console.error(err.message);
                res.send(err.message);
            } else {
                res.send("You have successfully registered!");
            }

        });
    });
 /*************************end front website*****************************************************/
    
    
	
//**********************************Admin Add User******************************************************

apiRouter.get('/users', function(req, res) {
	console.log("users");
	User.find({}, function(err, users) {
		console.log(users);
		if (err)
			res.send(err);

		res.send(users);
	}).sort({ created_at : -1 });
});


apiRouter.post('/deleteuser', function(req, res) {
	User.remove({
		_id: req.body.id
	}, function(err, user) {
		if (err)
			res.send(err);
		res.json({message: 'User deleted!'});
	})
});


apiRouter.post('/edituser', function(req, res) {
	User.findById({'_id': req.body.id}, function(err, user) {

		if (err)
			res.send(err);

		res.json(user);
	});
});

//***************************************************************************************************

apiRouter.post('/users/register', function(req, res) {  
	User.register(new User({        
		username: req.body.username,
		email: req.body.email,     
		role: 2,
		type:req.body.type, 
		complete_status:0,
		
	}), req.body.password, function(err, user) {
		if(err) {
			res.json({"message":err.message,"error":"1"})
		} else {
			var userdata = {};    
			userdata.id = user._id;
			res.json({"message":"User Added Successfully","error":"0","data" : userdata});
		}
	});
})


apiRouter.post('/adminusers', function(req, res) {  
	var role = 1;
	if(req.body.role!=1){
		role =2;
	}
	User.register(new User({        
		username: req.body.firstname,
		email: req.body.email,     
		role: role,
		type:req.body.role, 
		complete_status:0,
		status:0
	}), req.body.password, function(err, user) {
		if(err) {
			res.json({"message":err.message,"error":"1"})
		} else {
			var userdata = {};    
			userdata.id = user._id;
			res.json({"message":"User Added Successfully","error":"0","data" : userdata});
		}
	});
})


apiRouter.post('/users/login', function(req, res, next) {       
	passport.authenticate('local', function(err, user, info) { 
		if (err) {
         return next(err); // will generate a 500 error
     } 
     if (! user) {             
     	return res.json({ success : false,"error":"1", message : info.message });     
     } 
     
       if(user.status !='0'){ 
     	return res.json({ success : false,"error":"1", message : 'You are not activated yet contact to administrator' });
     	}
     
     req.login(user, function(err){     

     	if(err){
     		return next(err);  
     	}
      
          //res.redirect('/admin/dashboard');
          return res.json({ success : true,"error":"0" ,message : 'You have been successfully logged in...',info:info,userinfo:user});              
      });
 })(req, res, next);
});

/******************website login***********************/ 

apiRouter.post('/users/weblogin', function(req, res, next) {       
	passport.authenticate('local', function(err, user, info) { 
		if (err) {
         return next(err); // will generate a 500 error
     } 
     if (! user) {             
     	return res.json({ success : false,"error":"1", message : info.message });     
     } 
     
        if(user.role !='1'){
     	return res.json({ success : false,"error":"1", message : 'You are registered by app' });
     	}
        if(user.status !='0'){
     	return res.json({ success : false,"error":"1", message : 'You are not activated yet contact to administrator' });
     	}  
     
     req.login(user, function(err){     

     	if(err){
     		return next(err);  
     	}
          //res.redirect('/admin/dashboard');
          return res.json({ success : true,"error":"0" ,message : 'You have been successfully logged in...',info:info,userinfo:user});              
      });
 })(req, res, next);
});


apiRouter.post('/users/userdetailbyid', function(req, res) {
	console.log(req.body);
	User.findById({'_id': req.body.id}, function(err, user) {
		if (err){
//                res.send(err);
res.json({"message" : "No data Found","error" : 1 });
}else{
	res.json({"message" : "Result Fetched Successfully","error" : 0 ,"data" : user});
}
});
});


/*User Facebook login*/

apiRouter.post('/fbregister', function(req, res) {

	console.log(req.body);
	User.findOne({'facebook_id': req.body.facebook_id}, function(err, user) {
		console.log(user);
		User.register(new User({
			username: req.body.username,
			email: req.body.email,     
			role: 2,
			type:req.body.type, 
			complete_status:0,
			image:req.body.image,
			facebook_id : req.body.facebook_id
		}), req.body.password, function(err, userall) {
			console.log(userall);
			
			if (err) {
				console.error(err.message);
				res.send({"message":err.message,'error':1});
			} else {
				var userdata = {};
				userdata.id = userall._id;
				res.send({'message' : "You have successfully added user",'error':0, 'data' : userdata });
			}
		});
	});
});


/*User Twitter login*/

apiRouter.post('/twitterlogin', function(req, res) {
	console.log(req.body);
	User.findOne({'twitter_id': req.body.twitter_id}, function(err, user) {
		console.log(user);
		User.register(new User({
			username: req.body.username,
			email: req.body.email,     
			role: 2,
			type:req.body.type, 
			complete_status:0,
			image:req.body.image,
			twitter_id : req.body.twitter_id
		}), req.body.password, function(err, userall) {
			console.log(userall);
			
			if (err) {
				res.send({"message":err.message,'error':1});
			} else {
				var userdata = {};
				userdata.id = userall._id;
				res.send({'message' : "You have successfully added user",'error':0, 'status' : true, 'data' : userdata });
			}
		});
	});
});

/*User Google login*/

apiRouter.post('/googlelogin', function(req, res) {
	console.log(req.body);
	User.findOne({'google_id': req.body.google_id}, function(err, user) {
		console.log(user);
		User.register(new User({
			username: req.body.username,
			email: req.body.email,     
			role: 2,
			type:req.body.type, 
			image:req.body.image,
			complete_status:0,
			google_id : req.body.google_id
		}), req.body.password, function(err, userall) {
			console.log(userall);
			
			if (err) {
				res.send({"message":err.message,'error':1});
			} else {
				var userdata = {};
				userdata.id = userall._id;
				res.send({'message' : "You have successfully added user", 'status' : true,'error':0, 'data' : userdata });
			}
		});
	});
});



/*User Google/facebook/twitter register testing */

apiRouter.post('/allinoneexist', function(req, res) {
	var main =[];
	if(req.body.type=="facebook"){
		main =  {'facebook_id': req.body.id};
	}
	else if(req.body.type=="twitter"){
		main =  {'twitter_id': req.body.id};
	}
	else{
		main =  {'google_id': req.body.id};
	}
	
	User.findOne(main, function(err, user) {

		if (err) {
			res.send({'message' :err.message, 'error' :2 });
		} else {
			if(user){
                               if(user.status !='0'){ 
                                    return res.json({ success : false,"error":2, message : 'You are not activated yet contact to administrator' });
                                    }
				var userdata = {};
				userdata.id = user._id;
				res.send({'message' : "Already Exist", 'error' :0, 'data' : userdata });
			}
			else{
				res.send({'message' : "not exist", 'error' :1});
			}
			
		}
		
	});
});



apiRouter.post('/forgetpassword', function(req, res) { 

User.findOne({ 'email': req.body.email }).select('+salt +hash').exec(function(err, user) {
	if (user) {
                host = req.get('host');//remember the server (i.e host) address
                 link = "http://" + req.get('host') + "/resetpassword?id=" + user.salt;//create a url of the host server
                 var mailOptions = {
                 	from: 'Kirk.mclaren@icloud.com',
                 	to: user.email,
                 	subject: 'Forgot Password',
                 	html: "Hello " + user.email + ",<br> Please Click on the link to change password.<br><a href=" + link + ">Click here to Change Password</a>"
                 };
                 smtpTransport.sendMail(mailOptions, function(error, info) {
                 	if (error) {
                 		console.log(error);
                 		res.json({"error" : 1 ,"message" : "Email has not been sent!",data:user});
                 	} else {
                 		res.json({"error" : 0 ,"message" :"Email has been sent please check your email",data:user});
                 	}
                 });
             } else {
             	res.json({"error" : 2 , "message" :"Email has not been registered!",data:user});
             }

         }); 

});  


apiRouter.post('/change_passw', function(req, res) { 
	User.findById({'_id': req.body.salt}, function(err, sanitizedUser) { 
		console.log(sanitizedUser);
		if (sanitizedUser) {  
			sanitizedUser.setPassword(req.body.newpassword, function() {
				sanitizedUser.save();
				res.send({message:"Password reset Successfully"});
			}); 
		} else {
			res.json({message:"Error"});
		}
		
	}); 
});        


apiRouter.post('/editusrdetails', function(req, res) {

	User.findById({'_id': req.body.id}, function(err, user) {		 
		if (err){
			res.send({"error" : 2,"message" : "Unable to find user"});
		}
		else{			 
			user.available_status = req.body.available_status;
			user.description= req.body.description,
			user.available_from= req.body.available_from,
			user.available_to= req.body.available_to,
			user.shift= req.body.shift,
			user.address_city= req.body.address_city,
			user.address_country= req.body.address_country,
			user.charges= req.body.charges,			
			user.complete_status= 1			
			user.save(function(err) {
				if (err){
					res.send({"error" : 1,"message" : "Unable to edit user"});
				}
				else{ 
                                    ///////////////////email send to admin////////////////////////////
                                if(user.description == 'undefined'){
                                     var description11 =  '';
                                }else{   
                                     var description11 = user.description ;   
                                }   
                              
                                    
                                         var mailOptions = {       
                                                from: 'Kirk.mclaren@icloud.com',
                                                to: 'Kirk.mclaren@icloud.com, rupak@avainfotech.com,diksha@avainfotech.com',
                                                subject: 'New User Registration',
                                                html: '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>Email Confirm</title><link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500" rel="stylesheet"></head><body style="padding:15px 0; background: url(img/bgplait.png) repeat #dddddd; margin:0px auto; font-family: "Roboto", sans-serif; font-weight:400; background-size: 160px;"><div class="bg_style" style=" width:578px; height:660px; background:#fff;margin:0 auto;" ><table width="578" border="0" cellpadding="10" cellspacing="0" style="margin:0px auto; background:#fffefb; text-align:center;"><tr style="background:#fff;" ><td style="text-align:center; padding-top:10px; padding-bottom:10px; border-bottom:2px solid #00306b;"> <img src="https://s3.us-east-2.amazonaws.com/hospitalbuck/logo.png" alt="img" /></td></tr><table width="400" border="0" cellpadding="10" cellspacing="0" style="width:100%; background: #fffefb; text-align: center; box-shadow: none;"><tr><td align="center"><h2 style=" font-weight:500; margin-bottom:1px; font-size:18px; text-align:center;">New User Registration</h2><h3 style=" font-weight:500; margin-bottom:1px; font-size:15px; padding:12px 0px 2px 0; margin-top:0;">Hello Admin, <br> A user named '+user.username+' has registered on the PerDIEMz application. Find below the details:</h3></td></tr></table><table width="95%" border="0" cellpadding="10" bgcolor="#f2f2f2" style="background-color:#f9f9f9; margin:0px auto;"><thead><tr><td style="border-bottom: 1px solid #ccc; padding: 10px 5px;" class="pay_sum" align="left" style="text-align:left;">Available status :</td><td style="border-bottom: 1px solid #ccc; text-align: right; padding: 10px 7px;" class="brdr_btm" align="left" style="text-align:right;">'+user.available_status+'</td></tr></thead><tr><td style="border-bottom: 1px solid #ccc; padding: 10px 5px;" class="brdr_btmm1" align="left" style="text-align:left;">Description :</td><td style="border-bottom: 1px solid #ccc; text-align: right; padding: 10px 7px;" class="brdr_btm" align="left" style="text-align:right;">'+description11+'</td></tr><tr><td style="border-bottom: 1px solid #ccc; padding: 10px 5px;" class="brdr_btmm" align="left" style="text-align:left;">Available :</td><td style="border-bottom: 1px solid #ccc; text-align: right; padding: 10px 7px;" class="brdr_btm1" align="left" style="text-align:right;">'+user.available_from+'</td></tr><tr><td style="border-bottom: 1px solid #ccc; padding: 10px 5px;" class="brdr_btmm" align="left" style="text-align:left;">Shift :</td><td style="border-bottom: 1px solid #ccc; text-align: right; padding: 10px 7px;" class="brdr_btm1" align="left" style="text-align:right;">'+user.shift+'</td></tr><tr><td style="border-bottom: 1px solid #ccc; padding: 10px 5px;" class="brdr_btmm" align="left" style="text-align:left;">City :</td><td style="border-bottom: 1px solid #ccc; text-align: right; padding: 10px 7px;" class="brdr_btm1" align="left" style="text-align:right;">'+req.body.address_city+'</td></tr><tr><td style="border-bottom: 1px solid #ccc; padding: 10px 5px;" class="brdr_btmm" align="left" style="text-align:left;">Country :</td><td style="border-bottom: 1px solid #ccc; text-align: right; padding: 10px 7px;" class="brdr_btm1" align="left" style="text-align:right;">'+user.address_country+'</td></tr><tr><td style="border-bottom: 1px solid #ccc; padding: 10px 5px;" class="brdr_btmm" align="left" style="text-align:left;">Charges ($/hour):</td><td style="border-bottom: 1px solid #ccc; text-align: right; padding: 10px 7px;" class="brdr_btm1" align="left" style="text-align:right;">'+user.charges+'</td></tr></table><tr><td align="center"><p style="color:#000; font-weight:500; text-align:center; margin: 45px 0px 0 0; font-size:14px;">Thank You,<br> Perdiemz</p></td></tr></table></div></body></html>'
                                         };   
                                         smtpTransport.sendMail(mailOptions, function(error, info) {
                                                if (error) {
                                                        console.log(error);
                                                        res.json({"error" : 1 ,"message" : "Email has not been sent!",data:user});
                                                } else {
                                                        res.json({"error" : 0 ,"message" :"Email has been sent please check your email",data:user});
                                                } 
                                         });  
                                         
					res.json({"error":0,"message":'Thank you for registering with PerDIEMz. Your details have been sent to admin for review once approved by Admin you will get a confirmation email.','data':user});
				}
			})
		}
	});
	
});


apiRouter.post('/changePassword', function(req, res){
   

            User.findById({'_id': req.body.email }, {'hash': true, 'salt': true}, function(err, user) {

					
			user.authenticate(req.body.password, function(err, authenticated) {

			  if (!authenticated) {
				res.json({'message' : "Invalid old password", 'error' : 1, 'data' : "" });
			  }else{
				user.setPassword(req.body.newpassword, function() {
                                            user.save(function(err) {
                                                
                                                if(err) {  
						res.json({"error" : 1 ,"message" : "Password can not be changed!"});
                                                }
                                                    res.json({'message' : "Password has been changed.", 'error' : 0, 'data' : "" });
                                            });
				});  
			  }
			});	
           });
  
    
});


/* Complete user edit Api*/
apiRouter.post('/editfulldetail', function(req, res) {

	// var img = req.body.image;
	// buf = new Buffer(img.replace(/^data:image\/\w+;base64,/, ""),'base64');
	// console.log(buf);
	// var data = {
	// 	Body: buf,
	// 	ContentEncoding: 'base64',
	// 	ContentType: 'image/jpeg'
	// };

	// s3.putObject(data, function(err, data){
	// 	if (err){
	// 		res.send({"error" : 1,"message" : "Profile picture is not uploaded successfully"});
	// 	}
	// 	else{
	// 		var pro_pic = "https://s3.us-east-2.amazonaws.com/hospitalbuck/profile_pic/"+randomString+".jpg";   


	User.findById({'_id': req.body.id}, function(err, user) {

		if (err){
			res.send(err);
		}
		else{			 
			user.available_status = req.body.available_status;
			user.description= req.body.description,
			user.available_from= req.body.available_from,
			user.available_to= req.body.available_to,
			user.shift= req.body.shift,
			user.address_city= req.body.address_city,
			user.address_country= req.body.address_country,
			user.charges= req.body.charges,			
			user.username= req.body.username,			
			user.awards= req.body.awards,			
			user.experiance= req.body.experiance,			
			user.education= req.body.education,			
					// user.image= req.body.pro_pic,			
					user.save(function(err) {
						if (err){
							res.send({"error" : 1,"message" : "Unable to edit user"});
						}
						else{
							res.json({"error":0,"message":'User updated successfully!','data':user});
						}
					})
				}
			});
		// }

	// });
});


/* Complete user edit Api*/
apiRouter.post('/profilepicupload', function(req, res) {

	if(req.body.user_id == null)
	{
		res.json({'message' : "No user available", 'status' : false, 'data' : "" });
		return false;
	}
	var user_id = req.body.user_id;
	var pic = req.body.profile_picture;
        var dnewp = new Date();
        var pntime = dnewp.getTime();
          var keyp = pntime+".jpg";
        
	buf = new Buffer(pic.replace(/^data:image\/\w+;base64,/, ""),'base64');
        
     
        var s3 = new aws.S3({      
            endpoint: 'https://s3.us-east-2.amazonaws.com',
            region: 'us-east-2',
            signatureVersion: 'v4',
            ACL: 'public-read',
            params: { 
                Bucket: 'hospitalbuck',
                Key: 'profilepic/' + keyp
            }   
        });  
     
	var data = {
		Body: buf,
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg'
	};
	s3.putObject(data, function(err, data){     
		var pro_pic = "https://s3.us-east-2.amazonaws.com/hospitalbuck/profilepic/"+keyp;
		if (err) { 
			console.log(err);
			console.log('Error uploading data: ', data); 
		} else {
			User.findById(user_id, function(err, user) {
				if(err){


					res.json({'message' : "Unable to update profile Image.", 'status' : false, 'data' : "" , "error" : 1});

				}else{
					user.image = pro_pic;
					user.save(function(err) { 
						res.json({'message' : "Profile image updated.", 'status' : true, 'data' : pro_pic ,"error" : 0});
					});
				}
			})
			console.log('succesfully uploaded the image!');
		}
	});



});


apiRouter.post('/editusrID', function(req, res) {        
	User.findById({'_id': req.body.id}, function(err, user) {
		if (err)
			res.send(err);
		var role = 1;
		if(req.body.role!=1){
			role =2;
		}

		user.username = req.body.username; 
		user.dob = req.body.dob;
		user.role = role;
		user.type = req.body.role;             
		user.status = req.body.status;

		user.save(function(err) {
			if (err)
				res.send(err);
			res.json('User updated!');
		})

	});
});



 /*************edit profile***************/

    apiRouter.post('/editusrhome', function(req, res) {  
        //console.log(req.body);
        User.findById({'_id': req.body.id}, function(err, user) { 
            if (err)
                res.send(err);
            user.username = req.body.username;
            user.zip = req.body.zip;
            user.phone = req.body.phone;
            user.address = req.body.address;  
            user.address_country = req.body.address_country;  
            user.image = req.body.image;
            user.save(function(err) {
                if (err)
                    res.send(err);
                res.json('User updated!');
            })

        });
    });


  apiRouter.post('/uploaduserimage',userupload.array('file',3), function(req, res, next) {
       // console.log(req.body);
        console.log(req.files);
        res.send(req.files);
    });  

/* Complete user Doc upload Api*/
apiRouter.post('/docupload', function(req, res) { 
    
     
	if(req.body.user_id == null)
	{
		res.json({'message' : "No user available", 'error' : 1});
		return false;
	}

	var user_id = req.body.user_id;
	var pic = req.body.docs;    

             var dnew = new Date();
             var ntime = dnew.getTime();    
             var key = ntime+".jpg";
        
	buf = new Buffer(pic.replace(/^data:image\/\w+;base64,/, ""),'base64');
        
     
        var s3_cerificate = new aws.S3({   
            endpoint: 'https://s3.us-east-2.amazonaws.com',
            region: 'us-east-2',
            signatureVersion: 'v4',
            ACL: 'public-read',
            params: { 
                Bucket: 'hospitalbuck',
                Key: 'certificate/' + key
            }   
        });  
     
     
	var data = {  
		Body: buf,
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg'
	};
	s3_cerificate.putObject(data, function(err, data){ 
		var pro_pic = "https://s3.us-east-2.amazonaws.com/hospitalbuck/certificate/"+key ;
		if (err) { 
			res.json({'message' : "Unable to upload certificate.", 'data' : "" , "error" : 1});
		} else {
			User.findById(user_id, function(err, user) {
				if(err){
					res.json({'message' : "Unable to upload certificate.", 'data' : "" , "error" : 1});

				}else{
					user.docs.push({'name':pro_pic}); 
					user.save(function(err) {
						res.json({'message' : "Certificate uploaded succesfully." ,'data' : user.docs ,"error" : 0});
					});
				}
			})			
		}
	});
});

/* Remove Doc upload Api*/
apiRouter.post('/removedoc', function(req, res) {     
	if(req.body.user_id == null)
	{
		res.json({'message' : "No user available", 'error' : 2});
		return false;
	}

	var user_id = req.body.user_id;
	var doc_id = req.body.doc_id;

	User.findByIdAndUpdate({'_id' : user_id}, {
		$pull: {docs: {
			_id: doc_id 
		}}
	},  function(err, order) {

		if (err)
			res.json({'message' : "Something went Wrong. Try Again.", "error" : 1,"data":''});
                    
                    
               /*********************left docs*********************/
               
                  User.findById({'_id': user_id },function(err, user) {  
                      res.json({message: 'Doc deleted!', "error" : 0,"data":user.docs}); 
                  });
		      
	});
});

/***********************Home change password***************************/
 apiRouter.post('/changepwd', function(req, res) { 
        var oldPassword = req.body.oldpassword;
        if (req.body.newpassword !== req.body.cpassword) {
            res.json({'message' : "Password and confirm password do not match.", 'status' : false, 'data' : "" });
         }else{

            User.findById({'_id': req.body.path }, {'hash': true, 'salt': true}, function(err, user) {

					
			user.authenticate(oldPassword, function(err, authenticated) {

			  if (!authenticated) {
				res.json({'message' : "Invalid old password", 'status' : false, 'data' : "" });
			  }else{
				user.setPassword(req.body.newpassword, function() {
							user.save(function(err) {
								res.json({'message' : "Password has been changed.", 'status' : true, 'data' : "" });
							});
				});  
			  }
			});	
           });
        }

});


/****************App user list**********************/
  
    apiRouter.get('/getdoctor', function(req, res) {
    User.find({"role":'2'}, function(err, users) {  
      if (err)
        res.send(err);
      res.json(users);
    });
  });


}      