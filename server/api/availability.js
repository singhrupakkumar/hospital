/**
 * @author harman
 * @description movie
 * @type type
 */
 var Availability = require('../models/availability');
// Posts API
module.exports = function(apiRouter,serialize){


   apiRouter.post('/availability/mynotes', function(req, res){

       Availability.find({'date': req.body.date,'userid':req.body.userid}, function(err, user) {

         if (err) res.json({error : 1, message: 'No data found!'});

         res.json({error : 0 , data : user});                               

     }).sort({ created_at : 1 });

   });



    /*******************check dates*********************/

       apiRouter.post('/availability/check', function(req, res){  

       Availability.find({'userid':req.body.userid}, function(err, data) {  

         if (err) res.json({error : 1, message: 'No data found!'}); 
         
         var dataarray = [];
           data.forEach(function(value,index){
               
              dataarray.push( value.date);  
               
           });
 

         res.json({error : 0 , data : dataarray});                               

     }).sort({ created_at : 1 });

   });



    // add a post
    apiRouter.post('/availability/add', function(req, res){
        var availability = new Availability();
        availability.userid = req.body.userid;
        availability.date = req.body.date;
        availability.note = req.body.note;
        availability.save(function(err, movie){              
            if(err) res.json({error : 1, message: 'Try Again Something went wrong!'});
            res.json({error : 0 , data : movie , message: 'Note added Successfully!'});
        })
    });
        //delete note
        apiRouter.post('/availability/delete', function(req, res){


           Availability.remove({
             _id: req.body.id
         }, function(err, post){
             if(err)  res.json({ error : 0 ,message: 'Not deleted!' });

             res.json({ error : 0 , message: 'Post deleted!' });
         })
       });




    };