/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var Contact = require('../models/contact');
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
module.exports = function(apiRouter) { 
	apiRouter.post('/contacts_us', function(req, res){
		var post = new Contact();
		post.name = req.body.name;
		post.email = req.body.email;
		post.phone = req.body.phone;
		post.subject = req.body.subject;
		post.message = req.body.message;
		post.save(function(err, post){
			if(err) res.send(err);
			var mailOptions = {  
				to: 'Kirk_mclaren@hotmail.com',
				subject:'Contact',
				html: '<html xmlns="http://www.w3.org/1999/xhtml"> <head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" /> <title>PerDIEMz</title> <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500" rel="stylesheet"> </head> <body style="padding:15px 0; background: url(https://s3.us-east-2.amazonaws.com/hospitalbuck/bg.png) repeat #dddddd; margin:0px auto; font-family: Roboto, sans-serif; font-weight:400; background-size: 160px;"> <table width="600" border="0" cellpadding="10" cellspacing="0" style="margin:0px auto; background:#f0f0f0; text-align:center;"> <tr style="background:#fff;"> <td style="text-align:center; padding-top:20px; padding-bottom:20px;"> <img src="https://s3.us-east-2.amazonaws.com/hospitalbuck/logo.png" alt="img" /> </td> </tr> <tr> <td style="text-align:left; "> <h3>Hi Admin,</h3> <p>'+req.body.name+', wants to contact. Below is the query:</p> </td> </tr> <tr> <td> <table width="100%" border="0" cellpadding="2" style="background:#fff; border:1px solid #ddd; border-radius:5px; padding:10px;"> <tr> <td colspan="2" style="float:left; text-align:left;"> <p style="margin:0; color:#999;">Name : '+req.body.name+'</p> <p style="margin:0; color:#999;">Email : '+req.body.email+'</p> <p style="margin:0; color:#999;">Phone : '+req.body.phone+'</p><p style="margin:0; color:#999;">Subject : '+req.body.subject+'</p> <p style="margin:0; color:#999;">Message : '+req.body.message+'</p> </td> </tr> </table> </td> </tr> <td style="text-align:center; "> <h3>Thankyou,</h3> </td> </tr> <tr style="background:#fff;"> <td style="text-align:center; padding-top:20px; padding-bottom:20px;"> <img src="https://s3.us-east-2.amazonaws.com/hospitalbuck/logo.png" alt="img" /> </td> </tr> </body> </html>'
			};
			smtpTransport.sendMail(mailOptions, function(error, info) {
				console.log("mail");
				if (error) { 
					res.json({"error" : 1 ,"message" : "Email has not been sent!","err":error});
				} else { 
					res.json({"error" : 0 ,"message" :"Email has been sent please check your email","data":post});
				}
			});
		})
	});
}