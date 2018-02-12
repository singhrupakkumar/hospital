
var hospitalsModule = angular.module('fwrk.hospitals', []);

hospitalsModule.service('Hospitals', function($http) {

    return {
		all: function() {
            return $http.get('/api/hospitals').then(function(hospitalList) {
                return hospitalList.data;
            });
        },
        onFileSelect : function(image, id, action) {

            if (angular.isArray(image)) {
                console.log(image[0]);
                image = image[0];
            }

            var fd = new FormData();
            //Take the first selected file
            fd.append("file", image);
            fd.append("_id", id);
            fd.append("action", action);
            fd.append("upload_dir", 'public/admin/uploads/hospitals/');

            // This is how I handle file types in client side
            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }


            // return $http.upload({
            return $http({
                method: 'post',
                url: '/api/upload_banner_image',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                console.log("uploaded file name : ");
                console.log(res);
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
		onFileSelectgallery : function(image, id, action) {
			console.log('jjjjrakhi');
console.log(image[0]);


            var fd = new FormData();
            //Take the first selected file
			
			for (var x = 0; x < image[0].length; x++) {
					
					fd.append("file", image[0][x]);
                    fd.append("_id", id);
					fd.append("action", action);
					fd.append("upload_dir", 'public/admin/uploads/hospitals/gallery/');
				}
			


            // This is how I handle file types in client side
           /* if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                alert('Only PNG and JPEG are accepted.');
                return;
            }*/


            // return $http.upload({
            return $http({
                method: 'post',
                url: '/api/upload_gallery_image',
                data: fd,
                withCredentials: true,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).then(function(res) {
                // return the new post
                console.log("uploaded file name : ");
                console.log(res);
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
        add: function(newHospital) {
	  
            return $http({
                method: 'post',
                url: '/api/hospitals',
                data: newHospital
            }).then(function(res) {
                console.log(res);
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the hospital!');
                console.error(err);
                return err;
            });
        },
        update: function(newHospital) {
            return $http({
                method: 'post',
                url: '/api/edithospital',
                data: newHospital
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the hospital!');
                console.error(err);
                return err;
            });

        },
		sigledata: function(id) {
            return $http({
                method: 'post',
                url: '/api/get_hospital',
                data: id
            }).then(function(res) {
                console.log(res.data);
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the hospital!');
                console.error(err);
                return err;
            });
        },
		remove: function(newHospital) {
            return $http({
                method: 'post',
                url: '/api/delete_hospital',
                data: newHospital
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the hospital!');
                console.error(err);
                return err;
            });
        },
		getusers: function() {
        return $http.get('/api/getusers').then(function(users) {
            console.log("in the getusers module..");
                return users.data;
            }).catch(function(err) {
                console.error('Something went wrong getting getusers!');
                console.error(err);
                return err;
            });;
        }

    };
});