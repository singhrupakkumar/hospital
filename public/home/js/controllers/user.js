/**
 * post controller
 * @param {type} param1
 * @param {type} param2
 */
app.controller('UserCtrl', function ($scope, Users, $rootScope, $window, $timeout) {

           Users.doctorall().then(function (res) { 
                $scope.doctorlist = res;  
            });
 
    
    
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
    $scope.user = {};
    $scope.signup = function () {

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
    $scope.editprofileuser.country = $rootScope.currentUser.address_country;
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
          $scope.update = "The New password and Confirm password are not same";
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
            $scope.send = "Please enter your email!";
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
  
 
});
    