var mongoose = require('mongoose');




var hospitalSchema = new mongoose.Schema({
	title: { type: String, required: '{PATH} is required!'},
	description: { type: String, required: '{PATH} is required!'},
        image: { type: String, default: null},
		bannerimage: { type: String, default: null},		
        user_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
		city: { type: String},		
		country: { type: String},		
        active:	{ type: Number},   
        avg_rating :{type: Number,default: 0},
        loc :  { type: {type:String}, coordinates: [Number]},
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now }
});



hospitalSchema.pre('save', function(next){
hospitalSchema.index({loc: '2dsphere'});
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Hospital', hospitalSchema);