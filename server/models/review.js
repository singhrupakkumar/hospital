var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({ 	
    hospital_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
    user_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
	status:{type:Number,default : 0},
        image:{type:String},     
        text:{type:String,default:"It's really awesome!!!!"},   
        rating:{type:Number,default : 0}, 
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

reviewSchema.pre('save', function(next){  
reviewSchema.index({loc: '2dsphere'});
  now = new Date();
  this.updated_at = now;
  next();
});  

module.exports = mongoose.model('Review', reviewSchema);   