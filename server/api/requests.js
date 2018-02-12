/**
 * @author harman
 * @description movie
 * @type type
 */
 var Review = require('../models/request');     
 var Hospital = require('../models/hospital');
// Posts API
module.exports = function(apiRouter,serialize){

    // add a hospital favorite

    apiRouter.post('/reviews/add', function(req, res){    
        
          var reviewsave = new Review();

        reviewsave.hospital_id = req.body.hospital_id;
        reviewsave.user_id = req.body.user_id;  

          Review.findOne({$and:[{"hospital_id":req.body.hospital_id},{"user_id":req.body.user_id}]}, function (err, revi) {
            if(revi == null){  
              reviewsave.save(function(err, rate){               
            if(err) res.json({error : 1, message: 'Something went wrong. Try Again!'});
            res.json({error : 0 , data : rate , status:'0',message: ' Review save Successfully!'});
             }) 
            }else{
             res.json({error : 0 , data : revi ,status:'1', message: 'You have been already review done!'});
            }
            
            
        });  

        
    });
    

    };