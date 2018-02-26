/**
 * @author harman
 * @description movie
 * @type type
 */
 var Review = require('../models/review');  
 var User = require('../models/user');
 var Hospital = require('../models/hospital');
// Posts API
module.exports = function(apiRouter,serialize){

    // add a hospital favorite

    apiRouter.post('/reviews/add', function(req, res){    
        
          var reviewsave = new Review();

        reviewsave.hospital_id = req.body.hospital_id;
        reviewsave.user_id = req.body.user_id; 
        reviewsave.text = req.body.text; 
         reviewsave.rating = req.body.rating;

          Review.findOne({$and:[{"hospital_id":req.body.hospital_id},{"user_id":req.body.user_id}]}, function (err, revi) {
            if(revi == null){
             
                
             User.findById({'_id': req.body.user_id}, function(err, user) {
                 
           
               if(user != null){
                 reviewsave.image = user.image;   
               } else{
                   reviewsave.image = '';  
               }  
                  
              })  
             
              reviewsave.save(function(err, rate){                
            if(err) res.json({error : 1, message: 'Something went wrong. Try Again!'});
              Hospital.findById({'_id': req.body.hospital_id}, function(err, hos) {     
              
                 hos.avg_rating = req.body.avgrate;   
              hos.save(function(err, post) { 
                setTimeout(function(){ res.json({error : 0 , data : rate , status:'0',message: ' Review save Successfully!'}); }, 3000);     
             });
              }) 
              
              
           
             }) 
            }else{
             res.json({error : 0 , data : revi ,status:'1', message: 'You have been already review done!'});
            }
            
            
        });  

        
    });
    

    };