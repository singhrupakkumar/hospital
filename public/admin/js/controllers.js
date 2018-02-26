adminApp.controller('AllPostsCtrl', function($scope, postList,$interval,Posts,$timeout) {
  $scope.posts = postList;
  $scope.activePost = false;
  $scope.setActive = function(post) {
    $scope.activePost = post;
  }
  $timeout(function() {
    $('#example1').DataTable();
    $('#example2').DataTable({
      'paging': true,
      'lengthChange': false,
      'searching': false,
      'ordering': true,
      'info': true,
      'autoWidth': false
    })
  }, 0.500);

  $scope.deletepost = function(id) {
    $scope.data={};
    $scope.data.id=id;
    $('.'+id).css('display','none');
        // console.log($scope.data);
        Posts.remove($scope.data).then(function(res) {
           // console.log(res);
           if (res) {                
            $scope.del = res.message;
               // alert(res.message);
                //window.location.reload();
              } else {
                $scope.del = "error";
              }
            });
      }
    }).controller('Adminlogin', function($scope,Users) {        

      $scope.user ={}
      $scope.admin_login = function (){  

        if(this.user.password==''){

          $scope.loginerror="Password Required"; 
          return;
        }
        Users.adminlogin(this.user).then(function(res) {  
          if (res) {   
            if(res.success==true){
                    //$scope.loginerror= res.message; 
                    if(res.userinfo.role =='admin'){ 
                      $scope.loginerror="";
                      $scope.loginsuccess=res.message;
                      window.location.href='/admin/dashboard'; 	

                    }else{

                      $scope.loginerror= 'You are not admin!';  
                      console.log('You are not admin!');
                    }

                  }
                  else{
                    $scope.loginerror=res.message; 
                  } 

                } else { 
                  $scope.loginerror=res.message;  
                }
              });  

      }

    });  
    adminApp.controller('AddUserCtrl', function($scope,Users,$rootScope) {

        
          $rootScope.country = [
{"name": "United States", "code": "US"},       
{"name": "Afghanistan", "code": "AF"},
{"name": "Åland Islands", "code": "AX"},
{"name": "Albania", "code": "AL"},
{"name": "Algeria", "code": "DZ"},
{"name": "American Samoa", "code": "AS"},
{"name": "AndorrA", "code": "AD"},
{"name": "Angola", "code": "AO"},
{"name": "Anguilla", "code": "AI"},
{"name": "Antarctica", "code": "AQ"},
{"name": "Antigua and Barbuda", "code": "AG"},
{"name": "Argentina", "code": "AR"},
{"name": "Armenia", "code": "AM"},
{"name": "Aruba", "code": "AW"},
{"name": "Australia", "code": "AU"},
{"name": "Austria", "code": "AT"},
{"name": "Azerbaijan", "code": "AZ"},
{"name": "Bahamas", "code": "BS"},
{"name": "Bahrain", "code": "BH"},
{"name": "Bangladesh", "code": "BD"},
{"name": "Barbados", "code": "BB"},
{"name": "Belarus", "code": "BY"},
{"name": "Belgium", "code": "BE"},
{"name": "Belize", "code": "BZ"},
{"name": "Benin", "code": "BJ"},
{"name": "Bermuda", "code": "BM"},
{"name": "Bhutan", "code": "BT"},
{"name": "Bolivia", "code": "BO"},
{"name": "Bosnia and Herzegovina", "code": "BA"},
{"name": "Botswana", "code": "BW"},
{"name": "Bouvet Island", "code": "BV"},
{"name": "Brazil", "code": "BR"},
{"name": "British Indian Ocean Territory", "code": "IO"},
{"name": "Brunei Darussalam", "code": "BN"},
{"name": "Bulgaria", "code": "BG"},
{"name": "Burkina Faso", "code": "BF"},
{"name": "Burundi", "code": "BI"},
{"name": "Cambodia", "code": "KH"},
{"name": "Cameroon", "code": "CM"},
{"name": "Canada", "code": "CA"},
{"name": "Cape Verde", "code": "CV"},
{"name": "Cayman Islands", "code": "KY"},
{"name": "Central African Republic", "code": "CF"},
{"name": "Chad", "code": "TD"},
{"name": "Chile", "code": "CL"},
{"name": "China", "code": "CN"},
{"name": "Christmas Island", "code": "CX"},
{"name": "Cocos (Keeling) Islands", "code": "CC"},
{"name": "Colombia", "code": "CO"},
{"name": "Comoros", "code": "KM"},
{"name": "Congo", "code": "CG"},
{"name": "Congo, The Democratic Republic of the", "code": "CD"},
{"name": "Cook Islands", "code": "CK"},
{"name": "Costa Rica", "code": "CR"},
{"name": "Cote DIvoire", "code": "CI"},
{"name": "Croatia", "code": "HR"},
{"name": "Cuba", "code": "CU"},
{"name": "Cyprus", "code": "CY"},
{"name": "Czech Republic", "code": "CZ"},
{"name": "Denmark", "code": "DK"},
{"name": "Djibouti", "code": "DJ"},
{"name": "Dominica", "code": "DM"},
{"name": "Dominican Republic", "code": "DO"},
{"name": "Ecuador", "code": "EC"},
{"name": "Egypt", "code": "EG"},
{"name": "El Salvador", "code": "SV"},
{"name": "Equatorial Guinea", "code": "GQ"},
{"name": "Eritrea", "code": "ER"},
{"name": "Estonia", "code": "EE"},
{"name": "Ethiopia", "code": "ET"},
{"name": "Falkland Islands (Malvinas)", "code": "FK"},
{"name": "Faroe Islands", "code": "FO"},
{"name": "Fiji", "code": "FJ"},
{"name": "Finland", "code": "FI"},
{"name": "France", "code": "FR"},
{"name": "French Guiana", "code": "GF"},
{"name": "French Polynesia", "code": "PF"},
{"name": "French Southern Territories", "code": "TF"},
{"name": "Gabon", "code": "GA"},
{"name": "Gambia", "code": "GM"},
{"name": "Georgia", "code": "GE"},
{"name": "Germany", "code": "DE"},
{"name": "Ghana", "code": "GH"},
{"name": "Gibraltar", "code": "GI"},
{"name": "Greece", "code": "GR"},
{"name": "Greenland", "code": "GL"},
{"name": "Grenada", "code": "GD"},
{"name": "Guadeloupe", "code": "GP"},
{"name": "Guam", "code": "GU"},
{"name": "Guatemala", "code": "GT"},
{"name": "Guernsey", "code": "GG"},
{"name": "Guinea", "code": "GN"},
{"name": "Guinea-Bissau", "code": "GW"},
{"name": "Guyana", "code": "GY"},
{"name": "Haiti", "code": "HT"},
{"name": "Heard Island and Mcdonald Islands", "code": "HM"},
{"name": "Holy See (Vatican City State)", "code": "VA"},
{"name": "Honduras", "code": "HN"},
{"name": "Hong Kong", "code": "HK"},
{"name": "Hungary", "code": "HU"},
{"name": "Iceland", "code": "IS"},
{"name": "India", "code": "IN"},
{"name": "Indonesia", "code": "ID"},
{"name": "Iran, Islamic Republic Of", "code": "IR"},
{"name": "Iraq", "code": "IQ"},
{"name": "Ireland", "code": "IE"},
{"name": "Isle of Man", "code": "IM"},
{"name": "Israel", "code": "IL"},
{"name": "Italy", "code": "IT"},
{"name": "Jamaica", "code": "JM"},
{"name": "Japan", "code": "JP"},
{"name": "Jersey", "code": "JE"},
{"name": "Jordan", "code": "JO"},
{"name": "Kazakhstan", "code": "KZ"},
{"name": "Kenya", "code": "KE"},
{"name": "Kiribati", "code": "KI"},
{"name": "Korea, Democratic People S Republic of", "code": "KP"},
{"name": "Korea, Republic of", "code": "KR"},
{"name": "Kuwait", "code": "KW"},
{"name": "Kyrgyzstan", "code": "KG"},
{"name": "Lao People'S Democratic Republic", "code": "LA"},
{"name": "Latvia", "code": "LV"},
{"name": "Lebanon", "code": "LB"},
{"name": "Lesotho", "code": "LS"},
{"name": "Liberia", "code": "LR"},
{"name": "Libyan Arab Jamahiriya", "code": "LY"},
{"name": "Liechtenstein", "code": "LI"},
{"name": "Lithuania", "code": "LT"},
{"name": "Luxembourg", "code": "LU"},
{"name": "Macao", "code": "MO"},
{"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
{"name": "Madagascar", "code": "MG"},
{"name": "Malawi", "code": "MW"},
{"name": "Malaysia", "code": "MY"},
{"name": "Maldives", "code": "MV"},
{"name": "Mali", "code": "ML"},
{"name": "Malta", "code": "MT"},
{"name": "Marshall Islands", "code": "MH"},
{"name": "Martinique", "code": "MQ"},
{"name": "Mauritania", "code": "MR"},
{"name": "Mauritius", "code": "MU"},
{"name": "Mayotte", "code": "YT"},
{"name": "Mexico", "code": "MX"},
{"name": "Micronesia, Federated States of", "code": "FM"},
{"name": "Moldova, Republic of", "code": "MD"},
{"name": "Monaco", "code": "MC"},
{"name": "Mongolia", "code": "MN"},
{"name": "Montserrat", "code": "MS"},
{"name": "Morocco", "code": "MA"},
{"name": "Mozambique", "code": "MZ"},
{"name": "Myanmar", "code": "MM"},
{"name": "Namibia", "code": "NA"},
{"name": "Nauru", "code": "NR"},
{"name": "Nepal", "code": "NP"},
{"name": "Netherlands", "code": "NL"},
{"name": "Netherlands Antilles", "code": "AN"},
{"name": "New Caledonia", "code": "NC"},
{"name": "New Zealand", "code": "NZ"},
{"name": "Nicaragua", "code": "NI"},
{"name": "Niger", "code": "NE"},
{"name": "Nigeria", "code": "NG"},
{"name": "Niue", "code": "NU"},
{"name": "Norfolk Island", "code": "NF"},
{"name": "Northern Mariana Islands", "code": "MP"},
{"name": "Norway", "code": "NO"},
{"name": "Oman", "code": "OM"},
{"name": "Pakistan", "code": "PK"},
{"name": "Palau", "code": "PW"},
{"name": "Palestinian Territory, Occupied", "code": "PS"},
{"name": "Panama", "code": "PA"},
{"name": "Papua New Guinea", "code": "PG"},
{"name": "Paraguay", "code": "PY"},
{"name": "Peru", "code": "PE"},
{"name": "Philippines", "code": "PH"},
{"name": "Pitcairn", "code": "PN"},
{"name": "Poland", "code": "PL"},
{"name": "Portugal", "code": "PT"},
{"name": "Puerto Rico", "code": "PR"},
{"name": "Qatar", "code": "QA"},
{"name": "Reunion", "code": "RE"},
{"name": "Romania", "code": "RO"},
{"name": "Russian Federation", "code": "RU"},
{"name": "RWANDA", "code": "RW"},
{"name": "Saint Helena", "code": "SH"},
{"name": "Saint Kitts and Nevis", "code": "KN"},
{"name": "Saint Lucia", "code": "LC"},
{"name": "Saint Pierre and Miquelon", "code": "PM"},
{"name": "Saint Vincent and the Grenadines", "code": "VC"},
{"name": "Samoa", "code": "WS"},
{"name": "San Marino", "code": "SM"},
{"name": "Sao Tome and Principe", "code": "ST"},
{"name": "Saudi Arabia", "code": "SA"},
{"name": "Senegal", "code": "SN"},
{"name": "Serbia and Montenegro", "code": "CS"},
{"name": "Seychelles", "code": "SC"},
{"name": "Sierra Leone", "code": "SL"},
{"name": "Singapore", "code": "SG"},
{"name": "Slovakia", "code": "SK"},
{"name": "Slovenia", "code": "SI"},
{"name": "Solomon Islands", "code": "SB"},
{"name": "Somalia", "code": "SO"},
{"name": "South Africa", "code": "ZA"},
{"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
{"name": "Spain", "code": "ES"},
{"name": "Sri Lanka", "code": "LK"},
{"name": "Sudan", "code": "SD"},
{"name": "Suriname", "code": "SR"},
{"name": "Svalbard and Jan Mayen", "code": "SJ"},
{"name": "Swaziland", "code": "SZ"},
{"name": "Sweden", "code": "SE"},
{"name": "Switzerland", "code": "CH"},
{"name": "Syrian Arab Republic", "code": "SY"},
{"name": "Taiwan, Province of China", "code": "TW"},
{"name": "Tajikistan", "code": "TJ"},
{"name": "Tanzania, United Republic of", "code": "TZ"},
{"name": "Thailand", "code": "TH"},
{"name": "Timor-Leste", "code": "TL"},
{"name": "Togo", "code": "TG"},
{"name": "Tokelau", "code": "TK"},
{"name": "Tonga", "code": "TO"},
{"name": "Trinidad and Tobago", "code": "TT"},
{"name": "Tunisia", "code": "TN"},
{"name": "Turkey", "code": "TR"},
{"name": "Turkmenistan", "code": "TM"},
{"name": "Turks and Caicos Islands", "code": "TC"},
{"name": "Tuvalu", "code": "TV"},
{"name": "Uganda", "code": "UG"},
{"name": "Ukraine", "code": "UA"},
{"name": "United Arab Emirates", "code": "AE"},
{"name": "United Kingdom", "code": "GB"},
{"name": "United States Minor Outlying Islands", "code": "UM"},
{"name": "Uruguay", "code": "UY"},
{"name": "Uzbekistan", "code": "UZ"},
{"name": "Vanuatu", "code": "VU"},
{"name": "Venezuela", "code": "VE"},
{"name": "Viet Nam", "code": "VN"},
{"name": "Virgin Islands, British", "code": "VG"},
{"name": "Virgin Islands, U.S.", "code": "VI"},
{"name": "Wallis and Futuna", "code": "WF"},
{"name": "Western Sahara", "code": "EH"},
{"name": "Yemen", "code": "YE"},
{"name": "Zambia", "code": "ZM"},
{"name": "Zimbabwe", "code": "ZW"}
];
  
        
        
        
        
        
      $scope.message=false;
      $scope.addUser=function(){
        if(this.user.password!=this.user.cpassword){
          $scope.message="Incorrect confirm password";
          return;
        }
        Users.add(this.user).then(function(res) {

          if (res.error==0) {
            $scope.message="User registered successfully.";
            console.log(res);
          } else {
            $scope.message=res.message;
            console.log(res);
          }
        });  
        
      }    

    });
    adminApp.controller('dashboardCtrl', function($scope,Users,$rootScope, $window, $timeout) { 
   
   
         /**************************get records*****************************/
          Users.dashboard().then(function (res) {

          $scope.alldata = res.data;
          $scope.hospitalss = res.hospital.length ;  
           var webuer = [];
      
            angular.forEach( $scope.alldata, function(value, key) {
            if(value.role =='1'){
               webuer.push(value)  ;
 
            }
    
            })
           $scope.hospitaladmin = webuer.length;  

         });
   
   
       $scope.mail = {};  
        $scope.sendemail = function (){
           $scope.msg = false ;
            if(!this.emailto){
                $scope.msg = "Please enter email";
                return;
            }else if(!this.message){
                $scope.msg = "Please write message";
                return;
            }else{
                
               $scope.mail.emailto = this.emailto;
               $scope.mail.message = this.message;
               $scope.mail.subject = this.subject;  
                
            Users.sendemail( $scope.mail).then(function(res) { 
          if (res) {
            $scope.msg = res.message;
                //window.location.reload();
              } else {
                $scope.msg = "error";  
              }
            });
        } 
        }
        
    });
    adminApp.controller('profileCtrl', function($scope) {

    });


 adminApp.controller('ChangePasswordCtrl', function($scope, $stateParams, Users) {

    $scope.params = {};

	$scope.changePassword = function(){  
		
		    $scope.params.path = $stateParams.id; 
			$scope.params.oldpassword = this.params.oldpassword;
			$scope.params.newpassword = this.params.newpassword;
			$scope.params.cpassword = this.params.cpassword;	
			$scope.update = {};
                    Users.changePassword($scope.params).then(function(res) {
        if (res == null) {
            $scope.update = "";
        } else {
            console.log(res);
            $scope.update = res.message;
			if($scope.update == "Password has been changed."){
				window.location.href = "/logout";
			}
			//Users.logout();
			
			
        }
    });
	}



})



    adminApp.controller('userListCtrl', function($scope, $interval,Users,userList,$timeout,$window) {
      $scope.users = userList;
      $scope.activeUser = false;
      $scope.setActive = function(user) {
        console.log(user);
        $scope.activeUser = user;
        $scope.hideShow = false;
      }
      $scope.hideShow = true;
      $scope.listShow = function(value){
        if(value == true){
          $scope.hideShow = false;
        }else{
          $scope.hideShow = true;
        }
      }  
      $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false
        })
      }, 0.500);

      $scope.deleteUser = function(id) {
          
        if ($window.confirm("Are you sure you want to delete ?")) {     
        $scope.data={};
        $scope.data.id=id;
        $('.'+id).css('display','none');
        // console.log($scope.data);
        Users.remove($scope.data).then(function(res) {
          console.log(res);
          if (res) {
            $scope.del = res.message;
                //window.location.reload();
              } else {
                $scope.del = "error";
              }
            });
            
      }else{
          return false;
      }    
            
      }
    });

    /*******************************Contact List****************************************/
      adminApp.controller('contactListCtrl', function($scope, $interval,Users,contactList,$timeout,$window) {     
      $scope.contacts = contactList;  
        
        $scope.marktoread = function (id,index){ 
             $scope.data={};
             $scope.data.id=id;
            Users.contactmarktoread($scope.data).then(function(res) {
                if(res.error == '0'){           
                $scope.contacts[index].status = 0;          
                }
             });   
              
        }     
       $(document).ready(function() {
          $('#contactlist').DataTable();
       } );
     
    });  
    
    
     /*******************************Review List****************************************/
      adminApp.controller('reviewListCtrl', function($scope, $interval,Users,reviewList,$timeout,$window) {     
      $scope.reviews = reviewList;       
       $(document).ready(function() {
          $('#reviewlist').DataTable();
       } );
     
    });  
    


    /******************************Hospitals list*****************************************/

    adminApp.controller('hospitalListCtrl', function($scope, $interval,Hospitals,hospitalList,$timeout, $window) {



      $scope.hospitals = hospitalList;
      $scope.activeHospital = false;
      $scope.setActive = function(hospital) {
  
        $scope.activeHospital = hospital;
        var img = hospital.image;
        if(img){
        console.log(img);
        var im = img.replace(/,\s*$/, "");
        $scope.galleryimgs = im.split(',');
          
        }
        else{
          $scope.galleryimgs="";
        }
        $scope.hideShow = false;
      }
      $scope.hideShow = true;
      $scope.listShow = function(value){
        if(value == true){
          $scope.hideShow = false;
        }else{
          $scope.hideShow = true;
        }
      }  
      $timeout(function() {
        $('#example1').DataTable();
        $('#example2').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false
        })
      }, 0.500);

      $scope.deleteHospital = function(id) {
          
        if ($window.confirm("Are you sure you want to delete ?")) {  
            
              $scope.data={};
        $scope.data.id=id;
        $('.'+id).css('display','none');
        // console.log($scope.data);
        Hospitals.remove($scope.data).then(function(res) {
          console.log(res);
          if (res) {
            $scope.del = res.message;
                //window.location.reload();
              } else {
                $scope.del = "error";
              }
            });   

        } else {

             return false 
         }

      }
      
    });




    /***************************add hospital*****************************/

    adminApp.controller('AddHospitalCtrl', function($scope, Hospitals,$rootScope) {

      console.log("AddHospitalCtrl in admin js controller..");	
      $scope.userlist = {};
      Hospitals.getusers().then(function(res) {
        console.log(res);
        if (res == null) {
          $scope.userlist = "";
        } else {
          $scope.userlist = res;
        }
      }); 


      $scope.addHospital = function(hospitalData) { 


        Hospitals.add(hospitalData).then(function(res) {             
          if (res.status === true) {
            var file = angular.element(document.querySelector('#banner_image')).prop("files")[0];
            $scope.files = [];
            $scope.files.push(file);
            Hospitals.onFileSelect($scope.files, res.data._id, 'add').then(function(response) {
             if (response) {

              var filesgallery = angular.element(document.querySelector('#gallery_image')).prop("files");
              console.log(filesgallery);
				//return false;
       $scope.filesg = [];
       $scope.filesg.push(filesgallery);

       console.log('multipletttt');
					//return false;
					console.log($scope.filesg);
					//return false;
					if($scope.filesg[0].length != 0){
						
						Hospitals.onFileSelectgallery($scope.filesg, res.data._id, 'add').then(function(resp) {
							if (resp) {
								$scope.message=res.message;
								window.location.href='/admin/dashboard#/hospitalList';
							} else {
								$scope.message="error";
							}
						});
						
						
					}else{
						$scope.message=res.message;
						window.location.href='/admin/dashboard#/hospitalList';
					}		
       } else {
        $scope.message="error";
      }
    });

          } else {
            $scope.message=res.message;
          }
        });           
      };
    });




    adminApp.controller('EditHospitalCtrl', function($scope, Hospitals, $stateParams) {
     $scope.userlist = {};
     Hospitals.getusers().then(function(res) {
      console.log(res);
      if (res == null) {
        $scope.userlist = "";
      } else {
        $scope.userlist = res;
      }
    });
     $scope.hospital = {};
     $scope.hospital.id = $stateParams.id;

     Hospitals.sigledata($scope.hospital).then(function(res) {
       console.log("check if res avalable");
       console.log(res);
       console.log(res.title);
       if (res == null) {
        window.location.href = '/404';
      } else {
       console.log(res);
       $scope.hospital.title = res.title;
       $scope.hospital.description = res.description;
       $scope.hospital.address = res.address;
       $scope.hospital.bannerimage = res.bannerimage;
       $scope.hospital.user_id = res.user_id;
       var img = res.image;
       var im = img.replace(/,\s*$/, "");
       $scope.galleryimgs = im.split(',');


     }
   });
     $scope.editHospital = function() {
      $scope.update=false;
      $scope.newHospital = {};
      $scope.newHospital.title = this.hospital.title;
      $scope.newHospital.description = this.hospital.description;
      $scope.newHospital.address = this.hospital.address;	
      $scope.newHospital.user_id = this.hospital.user_id;	
      $scope.newHospital.id = this.hospital.id;

      console.log(this.hospital);
// return false;


Hospitals.update($scope.newHospital).then(function(res) {
  console.log(res);
  if (res) {


    var file = angular.element(document.querySelector('#banner_image')).prop("files")[0];
    if (file == null){
      $scope.message=res.message;
    }else{
     $scope.files = [];
     $scope.files.push(file);
     Hospitals.onFileSelect($scope.files, res.data, 'update').then(function(response) {
       if (response) {

        var files = angular.element(document.querySelector('.banner_image')).prop("files");
        console.log(files);
        $scope.filesg = [];
        $scope.filesg.push(files);
        console.log('multiple');
        console.log($scope.filesg[0]);
        if($scope.filesg[0].length != 0){

          Hospitals.onFileSelectgallery($scope.filesg, res.data, 'update').then(function(resp) {
           if (resp) {
            $scope.message=res.message;
          } else {
            $scope.message='Error';
          }
        });


        }else{
          $scope.message=res.message;
        }
      } else {
        $scope.message='Error';
      }
    });
   }
 } else {
  $scope.update = "error";
}
            // console.log(res);
          });
}
})





    adminApp.controller('EditUsersCtrl', function($scope, Users, $stateParams,$rootScope) {

        
       $rootScope.country = [
{"name": "United States", "code": "US"},       
{"name": "Afghanistan", "code": "AF"},
{"name": "Åland Islands", "code": "AX"},
{"name": "Albania", "code": "AL"},
{"name": "Algeria", "code": "DZ"},
{"name": "American Samoa", "code": "AS"},
{"name": "AndorrA", "code": "AD"},
{"name": "Angola", "code": "AO"},
{"name": "Anguilla", "code": "AI"},
{"name": "Antarctica", "code": "AQ"},
{"name": "Antigua and Barbuda", "code": "AG"},
{"name": "Argentina", "code": "AR"},
{"name": "Armenia", "code": "AM"},
{"name": "Aruba", "code": "AW"},
{"name": "Australia", "code": "AU"},
{"name": "Austria", "code": "AT"},
{"name": "Azerbaijan", "code": "AZ"},
{"name": "Bahamas", "code": "BS"},
{"name": "Bahrain", "code": "BH"},
{"name": "Bangladesh", "code": "BD"},
{"name": "Barbados", "code": "BB"},
{"name": "Belarus", "code": "BY"},
{"name": "Belgium", "code": "BE"},
{"name": "Belize", "code": "BZ"},
{"name": "Benin", "code": "BJ"},
{"name": "Bermuda", "code": "BM"},
{"name": "Bhutan", "code": "BT"},
{"name": "Bolivia", "code": "BO"},
{"name": "Bosnia and Herzegovina", "code": "BA"},
{"name": "Botswana", "code": "BW"},
{"name": "Bouvet Island", "code": "BV"},
{"name": "Brazil", "code": "BR"},
{"name": "British Indian Ocean Territory", "code": "IO"},
{"name": "Brunei Darussalam", "code": "BN"},
{"name": "Bulgaria", "code": "BG"},
{"name": "Burkina Faso", "code": "BF"},
{"name": "Burundi", "code": "BI"},
{"name": "Cambodia", "code": "KH"},
{"name": "Cameroon", "code": "CM"},
{"name": "Canada", "code": "CA"},
{"name": "Cape Verde", "code": "CV"},
{"name": "Cayman Islands", "code": "KY"},
{"name": "Central African Republic", "code": "CF"},
{"name": "Chad", "code": "TD"},
{"name": "Chile", "code": "CL"},
{"name": "China", "code": "CN"},
{"name": "Christmas Island", "code": "CX"},
{"name": "Cocos (Keeling) Islands", "code": "CC"},
{"name": "Colombia", "code": "CO"},
{"name": "Comoros", "code": "KM"},
{"name": "Congo", "code": "CG"},
{"name": "Congo, The Democratic Republic of the", "code": "CD"},
{"name": "Cook Islands", "code": "CK"},
{"name": "Costa Rica", "code": "CR"},
{"name": "Cote DIvoire", "code": "CI"},
{"name": "Croatia", "code": "HR"},
{"name": "Cuba", "code": "CU"},
{"name": "Cyprus", "code": "CY"},
{"name": "Czech Republic", "code": "CZ"},
{"name": "Denmark", "code": "DK"},
{"name": "Djibouti", "code": "DJ"},
{"name": "Dominica", "code": "DM"},
{"name": "Dominican Republic", "code": "DO"},
{"name": "Ecuador", "code": "EC"},
{"name": "Egypt", "code": "EG"},
{"name": "El Salvador", "code": "SV"},
{"name": "Equatorial Guinea", "code": "GQ"},
{"name": "Eritrea", "code": "ER"},
{"name": "Estonia", "code": "EE"},
{"name": "Ethiopia", "code": "ET"},
{"name": "Falkland Islands (Malvinas)", "code": "FK"},
{"name": "Faroe Islands", "code": "FO"},
{"name": "Fiji", "code": "FJ"},
{"name": "Finland", "code": "FI"},
{"name": "France", "code": "FR"},
{"name": "French Guiana", "code": "GF"},
{"name": "French Polynesia", "code": "PF"},
{"name": "French Southern Territories", "code": "TF"},
{"name": "Gabon", "code": "GA"},
{"name": "Gambia", "code": "GM"},
{"name": "Georgia", "code": "GE"},
{"name": "Germany", "code": "DE"},
{"name": "Ghana", "code": "GH"},
{"name": "Gibraltar", "code": "GI"},
{"name": "Greece", "code": "GR"},
{"name": "Greenland", "code": "GL"},
{"name": "Grenada", "code": "GD"},
{"name": "Guadeloupe", "code": "GP"},
{"name": "Guam", "code": "GU"},
{"name": "Guatemala", "code": "GT"},
{"name": "Guernsey", "code": "GG"},
{"name": "Guinea", "code": "GN"},
{"name": "Guinea-Bissau", "code": "GW"},
{"name": "Guyana", "code": "GY"},
{"name": "Haiti", "code": "HT"},
{"name": "Heard Island and Mcdonald Islands", "code": "HM"},
{"name": "Holy See (Vatican City State)", "code": "VA"},
{"name": "Honduras", "code": "HN"},
{"name": "Hong Kong", "code": "HK"},
{"name": "Hungary", "code": "HU"},
{"name": "Iceland", "code": "IS"},
{"name": "India", "code": "IN"},
{"name": "Indonesia", "code": "ID"},
{"name": "Iran, Islamic Republic Of", "code": "IR"},
{"name": "Iraq", "code": "IQ"},
{"name": "Ireland", "code": "IE"},
{"name": "Isle of Man", "code": "IM"},
{"name": "Israel", "code": "IL"},
{"name": "Italy", "code": "IT"},
{"name": "Jamaica", "code": "JM"},
{"name": "Japan", "code": "JP"},
{"name": "Jersey", "code": "JE"},
{"name": "Jordan", "code": "JO"},
{"name": "Kazakhstan", "code": "KZ"},
{"name": "Kenya", "code": "KE"},
{"name": "Kiribati", "code": "KI"},
{"name": "Korea, Democratic People S Republic of", "code": "KP"},
{"name": "Korea, Republic of", "code": "KR"},
{"name": "Kuwait", "code": "KW"},
{"name": "Kyrgyzstan", "code": "KG"},
{"name": "Lao People'S Democratic Republic", "code": "LA"},
{"name": "Latvia", "code": "LV"},
{"name": "Lebanon", "code": "LB"},
{"name": "Lesotho", "code": "LS"},
{"name": "Liberia", "code": "LR"},
{"name": "Libyan Arab Jamahiriya", "code": "LY"},
{"name": "Liechtenstein", "code": "LI"},
{"name": "Lithuania", "code": "LT"},
{"name": "Luxembourg", "code": "LU"},
{"name": "Macao", "code": "MO"},
{"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
{"name": "Madagascar", "code": "MG"},
{"name": "Malawi", "code": "MW"},
{"name": "Malaysia", "code": "MY"},
{"name": "Maldives", "code": "MV"},
{"name": "Mali", "code": "ML"},
{"name": "Malta", "code": "MT"},
{"name": "Marshall Islands", "code": "MH"},
{"name": "Martinique", "code": "MQ"},
{"name": "Mauritania", "code": "MR"},
{"name": "Mauritius", "code": "MU"},
{"name": "Mayotte", "code": "YT"},
{"name": "Mexico", "code": "MX"},
{"name": "Micronesia, Federated States of", "code": "FM"},
{"name": "Moldova, Republic of", "code": "MD"},
{"name": "Monaco", "code": "MC"},
{"name": "Mongolia", "code": "MN"},
{"name": "Montserrat", "code": "MS"},
{"name": "Morocco", "code": "MA"},
{"name": "Mozambique", "code": "MZ"},
{"name": "Myanmar", "code": "MM"},
{"name": "Namibia", "code": "NA"},
{"name": "Nauru", "code": "NR"},
{"name": "Nepal", "code": "NP"},
{"name": "Netherlands", "code": "NL"},
{"name": "Netherlands Antilles", "code": "AN"},
{"name": "New Caledonia", "code": "NC"},
{"name": "New Zealand", "code": "NZ"},
{"name": "Nicaragua", "code": "NI"},
{"name": "Niger", "code": "NE"},
{"name": "Nigeria", "code": "NG"},
{"name": "Niue", "code": "NU"},
{"name": "Norfolk Island", "code": "NF"},
{"name": "Northern Mariana Islands", "code": "MP"},
{"name": "Norway", "code": "NO"},
{"name": "Oman", "code": "OM"},
{"name": "Pakistan", "code": "PK"},
{"name": "Palau", "code": "PW"},
{"name": "Palestinian Territory, Occupied", "code": "PS"},
{"name": "Panama", "code": "PA"},
{"name": "Papua New Guinea", "code": "PG"},
{"name": "Paraguay", "code": "PY"},
{"name": "Peru", "code": "PE"},
{"name": "Philippines", "code": "PH"},
{"name": "Pitcairn", "code": "PN"},
{"name": "Poland", "code": "PL"},
{"name": "Portugal", "code": "PT"},
{"name": "Puerto Rico", "code": "PR"},
{"name": "Qatar", "code": "QA"},
{"name": "Reunion", "code": "RE"},
{"name": "Romania", "code": "RO"},
{"name": "Russian Federation", "code": "RU"},
{"name": "RWANDA", "code": "RW"},
{"name": "Saint Helena", "code": "SH"},
{"name": "Saint Kitts and Nevis", "code": "KN"},
{"name": "Saint Lucia", "code": "LC"},
{"name": "Saint Pierre and Miquelon", "code": "PM"},
{"name": "Saint Vincent and the Grenadines", "code": "VC"},
{"name": "Samoa", "code": "WS"},
{"name": "San Marino", "code": "SM"},
{"name": "Sao Tome and Principe", "code": "ST"},
{"name": "Saudi Arabia", "code": "SA"},
{"name": "Senegal", "code": "SN"},
{"name": "Serbia and Montenegro", "code": "CS"},
{"name": "Seychelles", "code": "SC"},
{"name": "Sierra Leone", "code": "SL"},
{"name": "Singapore", "code": "SG"},
{"name": "Slovakia", "code": "SK"},
{"name": "Slovenia", "code": "SI"},
{"name": "Solomon Islands", "code": "SB"},
{"name": "Somalia", "code": "SO"},
{"name": "South Africa", "code": "ZA"},
{"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
{"name": "Spain", "code": "ES"},
{"name": "Sri Lanka", "code": "LK"},
{"name": "Sudan", "code": "SD"},
{"name": "Suriname", "code": "SR"},
{"name": "Svalbard and Jan Mayen", "code": "SJ"},
{"name": "Swaziland", "code": "SZ"},
{"name": "Sweden", "code": "SE"},
{"name": "Switzerland", "code": "CH"},
{"name": "Syrian Arab Republic", "code": "SY"},
{"name": "Taiwan, Province of China", "code": "TW"},
{"name": "Tajikistan", "code": "TJ"},
{"name": "Tanzania, United Republic of", "code": "TZ"},
{"name": "Thailand", "code": "TH"},
{"name": "Timor-Leste", "code": "TL"},
{"name": "Togo", "code": "TG"},
{"name": "Tokelau", "code": "TK"},
{"name": "Tonga", "code": "TO"},
{"name": "Trinidad and Tobago", "code": "TT"},
{"name": "Tunisia", "code": "TN"},
{"name": "Turkey", "code": "TR"},
{"name": "Turkmenistan", "code": "TM"},
{"name": "Turks and Caicos Islands", "code": "TC"},
{"name": "Tuvalu", "code": "TV"},
{"name": "Uganda", "code": "UG"},
{"name": "Ukraine", "code": "UA"},
{"name": "United Arab Emirates", "code": "AE"},
{"name": "United Kingdom", "code": "GB"},
{"name": "United States Minor Outlying Islands", "code": "UM"},
{"name": "Uruguay", "code": "UY"},
{"name": "Uzbekistan", "code": "UZ"},
{"name": "Vanuatu", "code": "VU"},
{"name": "Venezuela", "code": "VE"},
{"name": "Viet Nam", "code": "VN"},
{"name": "Virgin Islands, British", "code": "VG"},
{"name": "Virgin Islands, U.S.", "code": "VI"},
{"name": "Wallis and Futuna", "code": "WF"},
{"name": "Western Sahara", "code": "EH"},
{"name": "Yemen", "code": "YE"},
{"name": "Zambia", "code": "ZM"},
{"name": "Zimbabwe", "code": "ZW"}
];
    
        
        
        
        
        
     $scope.user = {};
     $scope.params = {};
     $scope.params.id = $stateParams.id;
   // console.log( $scope.params.path);
   Users.sigledata($scope.params).then(function(res) {
    if (res == null) {
      window.location.href = '/404';
    } else {
      console.log(res);
      $scope.user = res;
   
      $scope.user.role = res.role;
      if(res.status){
        $scope.user.status = res.status;
      }else{
        $scope.user.status = 0;
      }
      $scope.user.email = res.email;
      $scope.user.dob = new Date(res.dob);
      $scope.user.id = res._id;
      console.log($scope.user);
    }
  });
   $scope.editUser = function() {    

    $scope.update=false;
     if(this.user.role == '2'){
         $scope.update = "Please select role"; 
         return false; 
     }
    $scope.newUser = {};
    $scope.newUser.username = this.user.username; 
    $scope.newUser.available_from = this.user.available_from; 
    $scope.newUser.available_status = this.user.available_status; 
    $scope.newUser.awards = this.user.awards; 
    $scope.newUser.charges = this.user.charges; 
    $scope.newUser.description = this.user.description;
    $scope.newUser.education = this.user.education;
    $scope.newUser.shift = this.user.shift;
    $scope.newUser.address = this.user.address;
    $scope.newUser.phone = this.user.phone;
    $scope.newUser.available_to = this.user.available_to;
    $scope.newUser.status = this.user.status;
    if(this.user.role =='Doctor' || this.user.role =='Nurse' || this.user.role =='Helper' || this.user.role =='1'){
       $scope.newUser.role = this.user.role;  
    }  
    
    $scope.newUser.id = this.user.id;
    if($rootScope.currentUser.role == 'admin'){
      $scope.newUser.role = 'admin';     
    }
    Users.update($scope.newUser).then(function(res) {

      if (res) {
        $scope.update = res;
      } else {
        $scope.update = "error";
      }
            // console.log(res);
          });
  }
})


//page list ctrl

adminApp.controller('pageslistCtrl', function($scope,Pages,$rootScope,$sce,$stateParams) {
  $("#mydiv").hide(); 

  Pages.alllist().then(function(res) {  



   $scope.pages = res.data;
   console.log($scope.pages);

   $(document).ready(function() {
     $('#example1').DataTable();
   } );

 });
  $scope.setActive = function(post) {
    $scope.active = true;

    $scope.activePost = post;
    
  }
  
    $scope.listShow = function(value){
        if(value == true){
          $scope.active = false;
        }else{
          $scope.active = true;
        }
      }  

})

adminApp.controller('editPageCtrl', function($scope,Pages,$rootScope,$sce,$stateParams) {
 $scope.data = {};
 $scope.newdata = {};
 $scope.data.id = $stateParams.paraml;
 Pages.singledata($scope.data).then(function(data){

   $scope.post = data.data;
 });
 $scope.editpage = function(){
   $scope.newdata.id = $scope.data.id;
   $scope.newdata.title = this.post.title;
   $scope.newdata.description = this.post.description;

   Pages.editdata($scope.newdata).then(function(data){

    alert(data.message);
    window.location.href = '/admin/dashboard#/pageslist'; 
  });

 }
})
