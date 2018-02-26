/**
 * @author harman
 * @description movie
 * @type type
 */
 var Request = require('../models/request');     
 var Hospital = require('../models/hospital');
// Posts API
module.exports = function(apiRouter,serialize){

    // add a hospital favorite

    apiRouter.post('/requests/add', function(req, res){    
        
     
          var ewquestsave = new Request();


              ewquestsave.request_to  = req.body.user_id;  
              ewquestsave.request_id  = req.body.current_user;
              
          Hospital.findOne({"user_id":req.body.current_user}, function (err, hospital) {
            
             if(hospital == null){
                return  res.json({error : 0 , data : '' , status:'0',message: 'You have no any hospital'});  
             }

              ewquestsave.hospital_id = hospital._id;   
              
                 Request.findOne({$and:[{"hospital_id":hospital._id},{"request_to":req.body.user_id}]}, function (err, request) {
            if(request == null){  
              ewquestsave.save(function(err, rate){                 
            if(err) return res.json({error : 1, message: 'Something went wrong. Try Again!'});
            res.json({error : 0 , data : rate , status:'0',message: ' Request successfully Send!'});  
             }) 
            }else{
             res.json({error : 0 , data : request ,status:'1', message: 'You already request sent!'});
            } 
            
            
        });  
              
          })       
          
       

        
    });
    

    };