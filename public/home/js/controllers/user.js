/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('UserCtrl', function ($scope, Users, $rootScope, $window, $timeout) {

    Users.doctorall().then(function (res) { 
         $scope.doctorlist = res;  
     });
 
 
 
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
 
 
    /************send_request******************/ 
    $scope.send = false;
    $scope.send_request = function(event,id){
     
        $scope.param = {};
     if(!$rootScope.currentUser._id){
        $window.location.href = '/login'; 
     }else{   
        $scope.param.user_id = id ;   
        $scope.param.current_user = $rootScope.currentUser._id ;  
       console.log($scope.param);     
        Users.sendrequest($scope.param).then(function (res) {

            if (res) {  
             $('#'+event.target.id).html(res.message);  
            }else{    
           $('#'+event.target.id).html(res.message);   

            }
        });
     }
    }
    
    $scope.loginerror = false;
    $scope.user = {};
    $scope.login = function () {
        //console.log(this.user);

        if (this.user.password == '') {
            $scope.loginerror = "Password Reuired";
            return;
        }
        Users.login(this.user).then(function (res) {

            if (res) {

                if (res.success) {
                    $window.localStorage['email'] = JSON.stringify(res.userinfo.email);
                    $window.localStorage['fullname'] = JSON.stringify(res.userinfo.fullname);
                    $window.localStorage['phone'] = JSON.stringify(res.userinfo.phone);
                    var myprofile = function () {
                        $window.location.reload();
                    };
                    $timeout(myprofile, 1000);
                }
                $scope.loginerror = res.message;
                console.log(res);
            } else {
                $scope.loginerror = res.message;
                console.log(res);
            }

        });
    }

    /********************user signup*********************/
    $scope.signerror = false; 
    $scope.termaccept = false;
    $scope.user = {};
    $scope.signup = function () {
  
        if (!this.user.term) {  
            $scope.termaccept = "Please accept term and conditions";
            return;
        }
        
        $scope.termaccept = '';
        if (this.user.password != this.user.cpassword) {
            $scope.signerror = "Incorrect confirm password";
            return;
        }
        Users.homeadd(this.user).then(function (res) {
            if (res) {
                $scope.signerror = res;
                // console.log(res);
            } else {
                $scope.signerror = res;
                //console.log(res);
            }
        });
    }



    $scope.uploadFile = function (input) {

        $scope.loading = true;
        // console.log(input.files[0]);
        Users.uploadimage(input.files[0]).then(function (res) {
            console.log(res[0].location);
            $scope.loading = false;
            if (res) {
                $rootScope.imgshow = res[0].location;
            }
        });
    }


    $scope.editprofileuser = {};
    if($rootScope.currentUser){
    $scope.editprofileuser.username = $rootScope.currentUser.username;
    $scope.editprofileuser.zip = $rootScope.currentUser.zip;
    $scope.editprofileuser.email = $rootScope.currentUser.email;
    $scope.editprofileuser.dob = $rootScope.currentUser.dob;
    $scope.editprofileuser.address = $rootScope.currentUser.address;
    $scope.editprofileuser.phone = $rootScope.currentUser.phone;
    $scope.editprofileuser.address_country = $rootScope.currentUser.address_country;  
    $scope.editprofileuser.image = $rootScope.currentUser.image;
    } 



    $scope.update = false;
    $scope.editUser = function (usr) {
   
        $scope.newUser = {};
        $scope.newUser.username = usr.username;
        if ($rootScope.imgshow) {
            $scope.newUser.image = $rootScope.imgshow;
        } else {
            $scope.newUser.image = $scope.editprofileuser.image;
        }

        $scope.newUser.zip = usr.zip;
        $scope.newUser.phone = usr.phone;
        if (usr.country) {
            $scope.newUser.address_country = usr.country.name;
        } else { 
            $scope.newUser.address_country = usr.address_country;
        }
        $scope.newUser.address = usr.address;
        $scope.newUser.id = $rootScope.currentUser._id;

        Users.homeupdate($scope.newUser).then(function (res) {

            if (res) {
                $scope.update = res;
            } else {
                $scope.update = "error";
            }
            // console.log(res);
        });
    }

    /*****************change password********************/
     $scope.update = false;  
    $scope.params = {};
    $scope.changePassword = function () {  
     
    if (this.params.oldpassword == '' && this.params.newpassword == '') {
          $scope.update = "Please enter password && new password";
          return false;
      } else if (!this.params.oldpassword) {
          $scope.update = "Please enter old password!";
          return false;
      } else if (!this.params.newpassword) {
          $scope.update = "Please enter new password!";
          return false;
      } else if (!this.params.cpassword) {
          $scope.update = "Please enter confirm password!";
          return false;
      }
      else if (this.params.newpassword != this.params.cpassword) { 
          $scope.update = "The new password and Confirm password are not same";
          return false;
      }

        $scope.params.path = $rootScope.currentUser._id;
        $scope.params.oldpassword = this.params.oldpassword;
        $scope.params.newpassword = this.params.newpassword;
        $scope.params.cpassword = this.params.cpassword;
        $scope.update = {};
        Users.homechangepassword($scope.params).then(function (res) {
            if (res == null) {
                $scope.update = "";
            } else {
                $scope.update = res.message;
                if ($scope.update == "Password has been changed.") {
                    window.location.href = "/logout";
                }

            }
        });
    }


    /*************forgot password*******************/
    $scope.send = false;
    $scope.user = {};
    $scope.forgotpassword = function () {
        //console.log(this.user);
        if (Object.keys(this.user).length == 0) {
            $scope.send = "Enter the registered email address";
            return false;
        }
        Users.userForgot(this.user).then(function (res) {
            if (res) {
                $scope.send = res.message;
                // console.log(res);
            } else {
                $scope.send = res.message;
                //console.log(res);
            }
        });
    }

    /********************Reset Password**********************/
    $scope.update = false;
    $scope.user = {};
    $scope.resetpassword = function () {

        if (this.user.newpassword == '' && this.user.cpassword == '') {
            $scope.update = "Please enter password && confirm password";
            return false;
        } else if (!this.user.newpassword) {
            $scope.update = "Please enter password!";
            return false;
        } else if (!this.user.cpassword) {
            $scope.update = "Please enter confirm password!";
            return false;
        } else if (this.user.newpassword != this.user.cpassword) {
            $scope.update = "The password and confirm password are not same";
            return false;
        }
        this.user.salt = $rootScope.currentUser._id;

        Users.changepass(this.user).then(function (res) {

            if (res) {
                //console.log(res.message);
                $rootScope.update = res.message;
                //window.close();
            } else {
                $rootScope.update = res.message;
                //window.location = '/login';
            }
        });
    }





});
/*******************My hospital*************************/  
app.controller('Myhospital', function ($scope, Users ,$rootScope) {    
    $scope.params = {};
    $scope.params.user_id = $rootScope.currentUser._id;
    Users.myhospital($scope.params).then(function (res) {
       if(res.error == 1){
           alert('You have no any hospital');
            window.location.href = "/";
       }else{
          $scope.myhospital = res.data;   
       }
              
      });
 
 
}).filter("commaBreak",
        function () {

            return function (value) {

                if (undefined !== value && value.length) { 
                    return value.split(',');
                } else {
                    return false
                }

                // if( !value.length ) return; 

                //  return value.split(',');

            }

});
app.controller('MyaccountCtrl', function ($scope, Paymentstatus, Plans, Payments, Users, Category, $rootScope) {
    window.localStorage.setItem("lastrandom", $rootScope.currentUser.random);
    var cat = window.localStorage.getItem("lastrandom");
//    alert(cat);
    //  console.log(cat);
    if ($rootScope.currentUser.random !== cat) {
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href = "/logout";
    }
    Category.all().then(function (res) {
        //  console.log(res);
        $rootScope.movies = res.data;
    });
    $scope.params = {};
    $scope.params.userid = $rootScope.currentUser._id;
    Payments.plandata($scope.params).then(function (res) {
        //   console.log(res);
//      $scope.planname        
        if (res.length > 0) {
            //  console.log(res[0].planid);
            $scope.params.id = res[0].planid;
            Plans.singledata($scope.params).then(function (res) {
                //     console.log(res);
                $scope.s_plan = res.data;


                $scope.planimage = res.data.planimage;
                $scope.plantitle = res.data.title;
//            return false;
                $scope.days = res.data.days;
                Paymentstatus.check($scope.params).then(function (res) {
                    //      console.log(res);
                    var status = res.pay[0].status;
                    var d = res.pay[0].created_at;
//         var de=res.pay[0].created_at;
//         console.log(d);
//         console.log(de);
                    Date.prototype.addDays = function (days) {
                        var dat = new Date(d);
                        // console.log(dat);
                        dat.setDate(dat.getDate() + days);
                        return dat;
                    };

                    var dat = new Date(d);
                    // console.log(d);
                    //  console.log(dat);
                    //  console.log(dat.addDays(45));
                    //  console.log($scope.days);
                    var ldate = dat.addDays($scope.days);

                    //   console.log(ldate);
                    $scope.lastday = ldate;
                    var today = new Date();
                    //  console.log(today);
                    if (ldate >= today) {
                        //   console.log("Subscription remaining");
                        $scope.plan = 1;
                    } else {
                        //   console.log("Subscription ends");
                        $scope.plan = 0;
                        status = 0;
                        $scope.param = {};
                        $scope.param.status = status;
                        $scope.param.userid = $rootScope.currentUser._id;
                        Payments.updatestatus($scope.params).then(function (res) {
                            //   console.log(res);

                        });

                    }
                });

            });
        } else {
            $scope.plan = 0;
        }

    });
});
app.controller('EditprofileCtrl', function ($scope, Users, Category, $rootScope) {
    var cat = window.localStorage.getItem("lastrandom");
//    alert(cat);
    // console.log(cat);
    if ($rootScope.currentUser.random !== cat) {
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href = "/logout";
    }
    Category.all().then(function (res) {

        $rootScope.movies = res.data;
    });
    $scope.user = {};
    $scope.user.username = $rootScope.currentUser.username;
    $scope.user.phone = $rootScope.currentUser.phone;
    $scope.user.image = $rootScope.currentUser.image;
    // upload image
    $scope.uploadFile = function (input) {
        $scope.loading = true;
        $scope.updateprofile = '';
        //console.log(input.files[0]);
        Users.uploadimage(input.files[0]).then(function (res) {
            // console.log(res[0].location);
            $scope.loading = false;
            $scope.updateprofile = 1;
            if (res) {
                $scope.imgshow = res[0].location;
                $scope.user.image = $scope.imgshow;
            }
        });
    };
    $scope.updateprofile = 1;

    $scope.editUser = function (usr) {
        $scope.newUser = {};
        $scope.newUser.username = usr.username;
        $scope.newUser.id = $rootScope.currentUser._id;
        $scope.newUser.phone = usr.phone;
        $scope.updateprofile = 1;
        if ($scope.imgshow) {
            $scope.newUser.image = $scope.imgshow;
        }
        // console.log($scope.newUser);
        Users.profileupdate($scope.newUser).then(function (res) {
            //   console.log(res);
            $scope.update = res.message;
        });
    };
});

app.controller('changePasswordCtrl', function ($scope, Users, Category, $rootScope) {
    var cat = window.localStorage.getItem("lastrandom");
//    alert(cat);
    //  console.log(cat);
    if ($rootScope.currentUser.random !== cat) {
        alert("You are Logged in from another device");
        localStorage.removeItem("lastrandom");
        window.location.href = "/logout";
    }
    Category.all().then(function (res) {

        $rootScope.movies = res.data;
    });

    $scope.user = {};
    $scope.user.id = $rootScope.currentUser._id;
    $scope.changepass = function () {

        if (this.user.cpassword != this.user.newpassword)
        {
            alert("Password and confirm password do not match.");
        } else
        {
            $scope.psd = {};
            $scope.psd.email = $rootScope.currentUser.email;
            $scope.psd.password = this.user.password;
            $scope.psd.newpassword = this.user.newpassword;

//        $scope.psd.id = this.user.id;
            //  console.log($scope.psd);
            Users.changePassword($scope.psd).then(function (res) {
                //   console.log(res);
                if (res.data !== "Unauthorized") {

                    if (res) {
                        $scope.message = res.message;

                    } else {
                        $scope.message = "error";

                    }
                } else {
                    $scope.errormsg = 'Invalid crediential';

                }

            });
        }
    };
});
app.controller('Appuserlist', function ($scope, Users, $rootScope) {
    
        Users.doctorall().then(function (res) {     
                $scope.doctorlist = res;  
            });
            
         /************send_request******************/ 
    $scope.send = false;
    $scope.send_request = function(event,id){
     
        $scope.param = {};
     if(!$rootScope.currentUser._id){
        $window.location.href = '/login'; 
     }else{   
        $scope.param.user_id = id ;   
        $scope.param.current_user = $rootScope.currentUser._id ;  
       console.log($scope.param);     
        Users.sendrequest($scope.param).then(function (res) {

            if (res) {  
             $('#'+event.target.id).html(res.message);  
            }else{    
           $('#'+event.target.id).html(res.message);   

            }
        });
     }
    }      
  
 
});
    