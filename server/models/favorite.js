var mongoose = require('mongoose');

var favoriteSchema = new mongoose.Schema({ 	
    hospital_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
    user_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
	status:{type:String}, 
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
});

favoriteSchema.pre('save', function(next){
favoriteSchema.index({loc: '2dsphere'});
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Favorite', favoriteSchema);