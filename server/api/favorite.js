/**
 * @author harman
 * @description movie
 * @type type
 */
 var Favorite = require('../models/favorite');
 var Hospital = require('../models/hospital');
 var mongoose = require('mongoose');
// Posts API
module.exports = function(apiRouter,serialize){

    // add a hospital favorite

    apiRouter.post('/favorite/add', function(req, res){
       
        var availability = new Favorite();
        availability.hospital_id = req.body.hospital_id;
        availability.user_id = req.body.user_id;
        

          Favorite.findOne({$and:[{"hospital_id":req.body.hospital_id},{"user_id":req.body.user_id}]}, function (err, fav) {
            if(fav == null){
              availability.save(function(err, movie){              
            if(err) res.json({error : 1, message: 'Something went wrong. Try Again!'});
            res.json({error : 0 , data : movie , status:'0',message: 'Hospital favorite Successfully!'});
             }) 
            }else{
  
                Favorite.remove({
                        _id: fav._id   
                }, function(err, user) {
                        if(err)  res.json({ error : 0 ,message: 'Not deleted!' });

                    res.json({error : 0 , data : '' ,status:'1', message: 'Hospital favorite removed!'});
                });
             
            }
          
            
        });  

        
    });
      
    /**************fav list**********/
    
    apiRouter.post('/favorite/list', function(req, res){
        
        
            Favorite.aggregate(
        [
            { 
                "$lookup":  
                {
                   "localField": "hospital_id",
                   "from": "hospitals",
                   "foreignField": "_id",
                   "as": "hospitals"
                }
            },
            { 
                "$lookup":  
                {
                   "localField": "hospital_id",
                   "from": "reviews",
                   "foreignField": "hospital_id",
                   "as": "hospitals_reviews"
                } 
            },
            {
                $match:{
                    "user_id":  mongoose.Types.ObjectId(req.body.user_id)
                }
            }
        ], function(err, list) {   
                    if (err)
                      res.send(err);
                 
                    var  hospital1 = [];
                     if(list  == null){  
                      res.json({error : 1 , data : '',message: 'Data not found'}); 
                     }else{
                          var aalength = list.length - 1;
                          list.forEach(function(value,index){
                              
                      
                          
                                var reviewlenght = value.hospitals_reviews.length ;
                               
                                var ratings = 0;
                                var avr_rating =0;
                                   
                              value.hospitals_reviews.forEach(function(value,index){

                                  ratings += value.rating ;

                                 }); 

                                avr_rating =  ratings /reviewlenght ; 
                                
                             var value1 = {
                                    data : value,
                                    avr_rating :avr_rating,
                                }

                                hospital1[index] = value1;   
                                
                                
                                if(index == aalength){  
                                    setTimeout(function(){return res.json({error : 0 , data : hospital1,message: ''}); }, 1000);

                                }    

                          });  
                         
                           
                     }
                  });
  
 
    });
    
        //delete note
        apiRouter.post('/favorite/delete', function(req, res){


         Favorite.remove({ 
           _id: req.body.id
       }, function(err, post){
           if(err)  res.json({ error : 0 ,message: 'Not deleted!' });

           res.json({ error : 0 , message: 'Post deleted!' });
       })
     });




    };