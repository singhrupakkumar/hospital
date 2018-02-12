
var Page= require('../models/page');

// Posts API
module.exports = function(apiRouter,s3, randomString,userupload){
	
	
        // get all posts
	apiRouter.get('/pages/pagelist', function(req, res){
		Page.find({}, function(err, posts){
			if (err) res.send(err);

			res.json({error : 0 , data : posts});
		}).sort({ created_at : -1 });
	})
        apiRouter.post('/pagedetail', function(req, res) {

                Page.find({type:req.body.type}, function(err, page) {
                    if (err)
                        res.send(err);
                    res.json({error: 0, data: page});
                });
            });
    

	// add a post
	apiRouter.post('/pages/add', function(req, res){
		console.log(req.body);
		var page = new Page();
		page.title = req.body.title;
		page.description = req.body.desc;
                page.type = req.body.typename;
             
                console.log(page);
		page.save(function(err, page){
                    
			if(err) res.send(err);

			res.json({msg:'page added'});
		})
	});
        
///pages/edit
    apiRouter.post('/pages/edit', function(req, res) {
        Page.findById({'_id': req.body.id}, function(err, page) {
            if (err){
                res.send(err);
            }else{
            page.title = req.body.title;
            page.description = req.body.description;
            page.type = page.type;
            page.save(function(err,page) {
                if (err){
                    res.send({"error" : 1,"message" : "Unable to edit page"});
                }else{
                res.json({"error":0,"message":'Page description successfully updated!','data':page});
            }
            })
        }
        });
    })
    //pages/single
    
            apiRouter.post('/pages/single', function(req, res){
            console.log(req.body.id);
		Page.findById(req.body.id, function(err, post){
			if (err) res.send(err);

			res.json({error : 0 , data : post});
		});
	});
    
    
    
};