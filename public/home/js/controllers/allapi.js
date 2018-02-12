/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('allapiCtr', function($scope,$rootScope) {
    
    var response = [];
    
    var base_url = window.location.origin+'/api';
    
    response.push({'descripiton':'User Register Api','url':base_url+'/users/register','parameter':'username:rakesh email:kumar@mail.com type:Doctor/Nurse/Helper password:123456'});

    response.push({'descripiton':'User Login Api','url':base_url+'/users/login','parameter':'email:kumar@mail.com password:123456'});

    response.push({'descripiton':'Get User Detail By id','url':base_url+'/users/userdetailbyid','parameter':'id:5a4f26a96de90e11a447f69cd'});

    response.push({'descripiton':'Facebook,Twiiter,Google register exit','url':base_url+'/allinoneexist','parameter':'type:facebook/twitter/google id:13515656s'});

    response.push({'descripiton':'Fb signup','url':base_url+'/fbregister','parameter':'email:kumardd@mail.com facebook_id:13515656 username:rakumoyal type:Helper password:Rakesh@123456 image:url'});

    response.push({'descripiton':'Twitter signup','url':base_url+'/twitterlogin','parameter':'email:kumardddd@mail.com twitter_id:13515656 username:rakumoyal type:Helper password:Rakesh@123456 image:url'});

    response.push({'descripiton':'Google Plus signup','url':base_url+'/googlelogin','parameter':'email:kumardddd@mail.com google_id:13515656 username:rakumoyal type:Helper password:Rakesh@123456 image:url'});

    response.push({'descripiton':'Forget Password','url':base_url+'/forgetpassword','parameter':'email:kumardddd@mail.com'});
    
    response.push({'descripiton':'Change Password','url':base_url+'/changePassword','parameter':'email:kumardddd@mail.com password:123456 newpassword:123'});
    
    response.push({'descripiton':'Edit user details','url':base_url+'/editusrdetails','parameter':'id:5a55d7ee4358c610e071caf4 available_status:Available/Not Available description:Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh available_from:Monday available_to:Sunday shift:am 7-3/pm 3-11/overnight 11-7/12 hour 7-7 address_city:Chandigarh address_country:India charges:25 image:base64'});
    
    response.push({'descripiton':'Edit user complete details','url':base_url+'/editfulldetail','parameter':'id:5a55d7ee4358c610e071caf4 available_status:Available/Not Available description:Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh Rakesh available_from:Monday available_to:Sunday shift:am 7-3/pm 3-11/overnight 11-7/12 hour 7-7 address_city:Chandigarh address_country:India charge:25 username:Er. Rakesh awards:Futurework experiance:10 education:B.tech, BCA, MA'});
    
    response.push({'descripiton':'Profile Picture upload','url':base_url+'/profilepicupload','parameter':'id:5a55d7ee4358c610e071caf4 image:sdfgasdgdsyhdfshfgjfvg'});

    response.push({'descripiton':'Add Note','url':base_url+'/availability/add','parameter':'date:2018-12-10 userid:5a55d7ee4358c610e071caf4 note:Hello How are you bro'});
    
    response.push({'descripiton':'All My note by date','url':base_url+'/availability/mynotes','parameter':'date:2018-12-10 userid:5a55d7ee4358c610e071caf4'});

    response.push({'descripiton':'Delete note by note_id','url':base_url+'/availability/delete','parameter':'id:5a586772095b750e4c6db143'});

    response.push({'descripiton':'Hospital Search by Lat-Long','url':base_url+'/findhospitalbycordinates','parameter':'latitude:30.739834 longitude:76.782702 user_id:5a5c6b9b08ffa2178926aa16'});

    response.push({'descripiton':'Hospital Search by Name','url':base_url+'/findhospitalbyname','parameter':'name:a user_id:5a5c6b9b08ffa2178926aa16'});

    response.push({'descripiton':'Hospital Detail by id','url':base_url+'/hospitaldetail','parameter':'id:5a603acb004b49127860c181'});

    response.push({'descripiton':'Contact us','url':base_url+'/contacts_us','parameter':'name:kuldeep email:kuldeep@gmail.com phone:1234569871 subject:test message:afdasdfasdfasfsadfsadfsadf'});

    response.push({'descripiton':'Page detail','url':base_url+'/pagedetail','parameter':'type:About Us/Terms And Conditions/Privacy Policy'});

    response.push({'descripiton':'User Doc upload','url':base_url+'/docupload','parameter':'user_id:5a681f3d7b582555822caa14 docs:base64imageupload'});

    response.push({'descripiton':'Remove Doc upload','url':base_url+'/removedoc','parameter':'user_id:5a681f3d7b582555822caa14 doc_id:5a6851b27acf3d09b8c717e1'});

    response.push({'descripiton':'Add favorite hospital','url':base_url+'/favorite/add','parameter':'user_id:5a681f3d7b582555822caa14 hospital_id:5a6723e0ae56410fc8b6e505'});
    
    response.push({'descripiton':'Favorite List','url':base_url+'/favorite/list','parameter':'user_id:5a71a7882a00eb126c90142a'}); 
    
     response.push({'descripiton':'Add Review','url':base_url+'/reviews/add','parameter':'user_id:5a681f3d7b582555822caa14, hospital_id:5a7ae00e75c22515db05aac2,text:Its really awesome!!!!,rating:5'});
    
    $scope.base_url = base_url;  
   
    $scope.data = response;

});
        