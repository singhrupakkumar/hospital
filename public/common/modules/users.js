
var usersModule = angular.module('fwrk.users', []);

usersModule.service('Users', function($http) {

    return {
        all: function() {
            console.log("all");
            return $http.get('/api/users').then(function(userList) {
                return userList.data;
            });
        },contactall: function() { 
            return $http.get('/api/contactall').then(function(userList) {
                return userList.data;
            });
        },reviewall: function() { 
            return $http.get('/api/reviewall').then(function(reviewall) {
                return reviewall.data;
            });
        },
         doctorall: function() { 
            return $http.get('/api/getdoctor').then(function(userList) {  
                return userList.data;  
            });
        },
         dashboard: function() {   
            return $http.get('/api/dashboard').then(function(record) {     
                
            
                return record.data;    
            });
        },
        add: function(newUser) {
            console.log(newUser);
            return $http({
                method: 'post',
                url: '/api/adminusers',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        check: function(newUser) {
            console.log(newUser);
            return $http({
                method: 'post',
                url: '/api/users_login_check',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
           homeadd: function(newUser) { 
            return $http({
                method: 'post',
                url: '/api/users/home',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         login: function(newUser) { 
            return $http({
                method: 'post',
                url: '/api/users/weblogin',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         loginphone: function(newUser) {
             console.log(newUser);
            return $http({
                method: 'post',
                url: '/api/users/login',
                data: newUser
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        remove: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/deleteuser',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        update: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/editusrID',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
         homeupdate: function(usr) {   
            return $http({
                method: 'post',
                url: '/api/editusrhome',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        }
        ,
        singledata: function(id) {
            console.log(id);
            return $http({
                method: 'post',
                url: '/api/adminfetchuserdata',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        changepass: function(newUser) {
                    console.log("module");
                    console.log(newUser);
                return $http({
                    method: 'post',
                    url: '/api/change_passw',
                    data: newUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },
        changePassword: function(salt) {

            return $http({
                method: 'post',
                url: '/api/changePassword',
                data: salt
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong in changing the password!');
                console.error(err);
                return err;
            });

        },homechangepassword: function(usr) {

            return $http({
                method: 'post',
                url: '/api/changepwd',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
     	uploadimage: function(image) {
            
            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            return $http({
                method: 'post',
                url: '/api/uploaduserimage',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
            userForgot: function(forUser) { 
                return $http({
                    method: 'post',
                    url: '/api/forgetpassword',
                    data: forUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },   
                adminForgot: function(forUser) {
                    //console.log("module");
                    //console.log(forUser);
                return $http({
                    method: 'post',
                    url: '/api/forgetpassword',
                    data: forUser
                }).then(function(res) {
                    // return the new post
                    return res.data;
                }).catch(function(err) {
                    console.error('Something went wrong adding the post!');
                    console.error(err);
                    return err;
                });
                },  
              
            profileupdate: function(usr) {
            console.log(usr);
            return $http({
                method: 'post',
                url: '/api/editusrdetailsweb',
                data: usr
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });

        },
        verify: function(newUser) {
            console.log(newUser,"Hahaha");
            return $http({
                method: 'post',
                url: '/api/checkcode',
                data: newUser
            }).then(function(res) {
                            console.log("module response")

                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         adminlogin: function(newUser) { 
            return $http({
                method: 'post',
                url: '/adminfinallogin',  
                data: newUser
            }).then(function(res) {    
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        sigledata: function(id) {
            return $http({
                method: 'post',
                url: '/api/edituser',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        myhospital: function(id) {   
            return $http({
                method: 'post',
                url: '/api/myhospitaldata',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data; 
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        }
        ,
        sendrequest: function(id) {                     
            return $http({
                method: 'post',
                url: '/api/requests/add',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data; 
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
         sendemail: function(id) {    
            return $http({
                method: 'post',
                url: '/api/mailsend',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data; 
            }).catch(function(err) {  
                console.error(err);
                return err;
            });
        },
         contactmarktoread: function(id) {
            return $http({
                method: 'post',
                url: '/api/contactmarktoread',
                data: id
            }).then(function(res) {
                // return the new post
                return res.data; 
            }).catch(function(err) {  
                console.error(err);
                return err;
            });
        }
    }
});