var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');
	
module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://hospital:hospital@ds245347.mlab.com:45347/hospital_dbname',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		db: process.env.MONGOLAB_URI || 'you can add a mongolab uri here ($ heroku config | grep MONGOLAB_URI)',
		port: process.env.PORT || 8080
	}
        
};