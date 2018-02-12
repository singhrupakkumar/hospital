var mongoose = require('mongoose');

var requestSchema = new mongoose.Schema({ 	
    request_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
    request_to: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
    hospital_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
    status:{type:Number,default : 1}, 
    created_at: { type: Date, default: Date.now },  
    updated_at: { type: Date, default: Date.now }
});

requestSchema.pre('save', function(next){  
requestSchema.index({loc: '2dsphere'});
  now = new Date();
  this.updated_at = now;
  next();
});  

module.exports = mongoose.model('Request', requestSchema);       