var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
	name: { type: String},
        email: { type: String},
        phone: { type: String},
        subject: { type: String},
        message: { type: String},
        status: { type: String, default: 1},    
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
            
});

contactSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Contact', contactSchema);