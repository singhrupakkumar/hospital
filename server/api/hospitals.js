var Hospital = require('../models/hospital');
var Favorite = require('../models/favorite');
var Review = require('../models/review');
var copyFile = require('quickly-copy-file');
var User = require('../models/user');
var uuid = require('node-uuid');
multiparty = require('multiparty');
var mongoose = require('mongoose');
// Hospitals API
module.exports = function(apiRouter) {


  apiRouter.get('/hospitals', function(req, res) { 
    Hospital.aggregate([{
      "$lookup": {
        "localField": "user_id",
        "from": "users",
        "foreignField": "_id",
        "as": "user_data"
      }
    }
    ], function(err, hospitals) {
      if (err) {
        res.json("Error");
        return false;
      }
      console.log(hospitals);

      res.json(hospitals);

    });
  });


  apiRouter.post('/hospitals', function(req, res) {

   var hospital = new Hospital();

   hospital.title = req.body.title;
   hospital.description = req.body.description;
   hospital.city = req.body.city;
   hospital.country = req.body.country;
   hospital.user_id = req.body.user_id;
   hospital.loc =  { type: "Point", coordinates: [req.body.longitude, req.body.latitude]};
   hospital.active = '1';
   Hospital.find({'user_id': req.body.user_id}, function(err, pst) {

    if (pst.length > 0) {

                    //res.send("Please make unique your account Its already exist!");
                    res.json({'message' : "Please make unique your account Its already exist!", 'status' : false, 'data' :'' });

                  }else{
                   hospital.save(function(err, post) {

                    if (err) {

                      res.send(err.message);
                    } else {
                     console.log(post);
                     res.json({'message' : "You have successfully added Hospital", 'status' : true, 'data' :post });
                           // res.send(post);
                         }
                       })
                 }
               });







 });

  apiRouter.post('/upload_banner_image', function(req, res) {

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      console.log(fields);

      var file = files.file[0];
      var contentType = file.headers['content-type'];
      var extension = file.path.substring(file.path.lastIndexOf('.'));
      // var destPath = '/' + user.id + '/profile' + '/' + uuid.v4() + extension;
      // var destPath = 'uploads/players/' + uuid.v4() + extension;
      var imageName = uuid.v4() + extension;
      var destPath = fields.upload_dir + imageName;

      console.log("destPath");
      console.log(destPath);


      var headers = {
        'x-amz-acl': 'public-read',
        'Content-Length': file.size,
        'Content-Type': contentType
      };

      copyFile(file.path, destPath, function(error) {
        if (error)
        {
          console.log("error in file uploading..");
          console.error(error);
        }
        Hospital.findById({'_id': fields._id}, function(err, hospital) {
          if (err)
            res.send(err);
          Hospital.bannerimage = imageName;
          Hospital.save(function(err) {
            if (err)
              res.send(err);

            if(fields.action == 'update')
              res.json("You have successfully updated hospital");
            else                        
              res.json("You have successfully added hospital");
          })

        });
          // return destPath;
          console.log('File was copied!');
        });


      console.log(fields._id);


      Hospital.findById({'_id': fields._id}, function(err, hospital) {
        if (err)
          res.send(err);

        console.log(imageName);
        hospital.bannerimage = imageName;
        hospital.save(function(err) {
          if (err)
            res.send(err);


          console.log("yes image saved..");
          if(fields.action == 'update')
            res.send("You have successfully updated hospital");
          else
            res.send("You have successfully update added hospital");
        })

      });
      console.log("outside yes image saved..");
      // return false;

      // var uploader = s3Client.upload(file.path, destPath, headers);
      // uploader.on('error', function(err) {
      //   //TODO handle this
      // });
      // uploader.on('end', function(url) {
      //   //TODO do something with the url
      //   console.log('file opened:', url);
      // });
    });
  });
  
  apiRouter.post('/upload_gallery_image', function(req, res) {
    var img = '';
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
   // console.log(files);
   console.log('raks');
   console.log(files.file.length);
   for (var x = 0; x < files.file.length; x++) {


    var file = files.file[x];
    var contentType = file.headers['content-type'];
    var extension = file.path.substring(file.path.lastIndexOf('.'));
      // var destPath = '/' + user.id + '/profile' + '/' + uuid.v4() + extension;
      // var destPath = 'uploads/players/' + uuid.v4() + extension;
      var imageName = uuid.v4() + extension;

      console.log(fields.upload_dir[x]);
      console.log(imageName);

      var destPath = fields.upload_dir[x] + imageName;

      console.log("destPath");
      console.log(destPath);


      var headers = {
        'x-amz-acl': 'public-read',
        'Content-Length': file.size,
        'Content-Type': contentType
      };
      console.log(file.path);
      console.log(fields._id);

      img += imageName+',';
      copyFile(file.path, destPath, function(error) {
        if (error)
        {
          console.log("error in file uploading..");
          console.error(error);
        }
        Hospital.findById({'_id': fields._id[0]}, function(err, hospital) {
          if (err)
            res.send(err);
          img.replace(/,\s*$/, "");
          console.log(img);
          hospital.image = img;
          Hospital.save(function(err) {
            if (err)
              res.send(err);

            if(fields.action[0] == 'update')
              res.json("You have successfully updated hospital");
            else                        
              res.json("You have successfully added hospital");
          })

        });
          // return destPath;
          console.log('File was copied!');
        });




      console.log("outside yes image saved..");
      // return false;

      // var uploader = s3Client.upload(file.path, destPath, headers);
      // uploader.on('error', function(err) {
      //   //TODO handle this
      // });
      // uploader.on('end', function(url) {
      //   //TODO do something with the url
      //   console.log('file opened:', url);
      // });
    }

    Hospital.findById({'_id': fields._id[0]}, function(err, hospital) {
      if (err)
        res.send(err);
      img.replace(/,\s*$/, "");
      console.log(img);
      hospital.image = img;
      hospital.save(function(err) {
        if (err)
          res.send(err);


        console.log("yes image saved..");
        if(fields.action[0] == 'update')
          res.send("You have successfully updated hospital");
        else
          res.send("You have successfully update added hospital");
      })

    });

  });
  }); 
  
  apiRouter.post('/edithospital', function(req, res) {
    console.log("in the hospital edithospital");
    console.log(req.body);
        // return false;
        Hospital.findById({'_id': req.body.id}, function(err, hospital) {
          if (err)
            res.send(err);
          hospital.title = req.body.title;
          hospital.description = req.body.description;
          hospital.address = req.body.address;
          hospital.save(function(err) {
            if (err)
              res.send(err);
                // res.send(player._id);
                //res.json(hospital._id);
                res.json({'message' : "Hospital updated successfully", 'status' : true, 'data' :hospital._id });
                // res.json('Player updated!');
              })

        });
      });
  apiRouter.post('/get_hospital', function(req, res) {
    Hospital.findById({'_id': req.body.id}, function(err, user) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
  apiRouter.post('/delete_hospital', function(req, res) {
    Hospital.remove({
      _id: req.body.id
    }, function(err, post) {
      if (err)
        res.send(err);
      res.json({message: 'Hospital deleted!'});
    })
  });
  apiRouter.get('/getusers', function(req, res) {
    User.find({}, function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  });


  apiRouter.post('/findhospitalbycordinates', function(req, res) {
      
      
      var queryx = [        
                    {   
                        "$geoNear": {
                            "near": { 
                                "type": "Point", 
                                "coordinates": [Number(req.body.longitude),Number(req.body.latitude)]
                            },
                            "distanceField": "loc",
                            "maxDistance": 300000, 
                            "minDistance": 0,
                            "spherical": true
                        }
                    },
                    {   
                        "$lookup": {  
                            "localField": "_id",
                            "from": "reviews",
                            "foreignField": "hospital_id",
                            "as": "reviews_info" 
                        }           
                    }];
      
      Hospital.aggregate(
       queryx
    ,
  function(err, hospital) {  

    if (err) {
      return res.send({ 'user_data': err, 'error': 1 });
    }
   
    if (hospital.length != 0) {
        
       
      var  hospital1 = [];
      var length = hospital.length - 1;
   
       hospital.forEach(function(value,index){

             
         
             var reviewlenght = value.reviews_info.length ;
            var ratings = 0;
            var avr_rating =0;
          value.reviews_info.forEach(function(value,index){
              
              ratings += value.rating ;
                
             }); 
     
            avr_rating =  ratings /reviewlenght ;      
            
        Favorite.findOne({$and:[{"hospital_id":value._id},{"user_id":req.body.user_id}]}, function (err, fav) {
           
            if(fav == null){ 

               var value1 = {
                    data : value,
                    like : '1',
                    avr_rating :avr_rating,
                }
              
                hospital1[index] = value1; 
                if(index == length){
                    setTimeout(function(){return res.send({ 'data': hospital1,'error':0}); }, 1000);
 
                } 
            }else{
              var value1 = {
                    data : value,
                    like : '0',
                    avr_rating :avr_rating,
                }
                
               hospital1[index] = value1;      
               if(index == length){
                    setTimeout(function(){return res.send({ 'data': hospital1,'error':0}); }, 1000);    
                    
                }
            }
            });
           
          }); 
 

    } else {
      return res.send({ 'data': '', 'error':2, 'msg': 'No data found' });
    }
  })   
  });  


  apiRouter.post('/findhospitalbyname', function(req, res) {

    Hospital.find({
      title: { '$regex': '.*' + req.body.name + '.*', $options: 'i' }
    },
    function(err, hospital) {
      if (err) {
        return res.send({ 'user_data': err, 'error': 1 });
      }
      if (hospital.length != 0) {
        return res.send({ 'data': hospital, 'error':0});
      } else {
        return res.send({ 'data': '', 'error':2, 'msg': 'No data found' });
      }
    })   
  });

  apiRouter.post('/hospitaldetail', function(req, res) {   
     
        Hospital.aggregate(
        [
            { 
                "$lookup":  
                {
                   "localField": "_id",
                   "from": "reviews",
                   "foreignField": "hospital_id",
                   "as": "reviews_info"
                }
            },
            {
                $match:{
                    "_id":  mongoose.Types.ObjectId(req.body.id)
                }
            }
        ]
            , function(err, hospital) {
        if (err){
          return res.send({ 'error':1, 'msg': 'No data found' });
        }
        else{
    
          if(hospital){  
           var reviewlenght = hospital[0].reviews_info.length ;
           var ratings = 0;
          hospital[0].reviews_info.forEach(function(value,index){
              
              ratings += value.rating ;
              
             }); 
            var avr_rating =  ratings /reviewlenght ;  
           Favorite.findOne({$and:[{"hospital_id":req.body.id},{"user_id":req.body.user_id}]}, function (err, fav) {
            if(fav == null){  
               return res.send({ 'data': hospital,'likestatus':1 ,avr_rating :avr_rating,'error':0});
            }else{
            return res.send({ 'data': hospital,'likestatus':0 ,avr_rating :avr_rating,'error':0});
            }
        }); 

          
          }
          else{
            return res.send({ 'data': '', 'error':2, 'msg': 'No data found' });
          }
        }      
      });

    });
    
    
    
       /**************filter hospital**********/
    
    apiRouter.post('/hospitals/filter', function(req, res){
        
        
       Hospital.aggregate(
        [
            { 
                    "$lookup":  
                {
                   "localField": "_id",
                   "from": "reviews",
                   "foreignField": "hospital_id",
                   "as": "reviews_info"
                }
                 
            },{ "$sort" : { "avg_rating": -1 }}
        ], function(err, list) {    

                    if (err)
                      res.send(err);
                 
                    var  hospital1 = [];
                     if(list  == null){  
                      res.json({error : 1 , data : '',message: 'Data not found'}); 
                     }else{
                          var aalength = list.length - 1;
                          list.forEach(function(value,index){
                              
                      
                          
                                var reviewlenght = value.reviews_info.length ;
                               
                                var ratings = 0;
                                var avr_rating =0;
                                   
                              value.reviews_info.forEach(function(value,index){

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
      
   
};  