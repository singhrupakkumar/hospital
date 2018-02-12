
var pagesModule = angular.module('fwrk.pages', []);

pagesModule.service('Pages', function($http){

	return {
                    alllist: function() {
                    return $http.get('/api/pages/pagelist').then(function(postList) {
                        return postList.data;
                    });
                },
            all:  function(act) {
            console.log(act);
            return $http({
                method: 'post',
                url: '/api/pagedetail',
                data: act
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the Actor!');
                console.error(err);
                return err;
            });
        },
               singledata: function(parmal) {

            return $http({
                method: 'post',
                url: '/api/pages/single',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
                       editdata: function(parmal) {

            return $http({
                method: 'post',
                url: '/api/pages/edit',
                data: parmal
            }).then(function(res) {
                // return the new post
                return res.data;
            }).catch(function(err) {
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        },
		add: function(newPost){
			return $http({
				method: 'post',
				url: '/api/pages/add',
				data: newPost
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong adding the post!');
				console.error(err);
				return err;
			});
		},

        contact: function(newPost){
            return $http({
                method: 'post',
                url: '/api/contacts_us',
                data: newPost
            }).then(function(res){
                // return the new post
                return res.data;
            }).catch(function(err){
                console.error('Something went wrong adding the post!');
                console.error(err);
                return err;
            });
        } 

	};
});