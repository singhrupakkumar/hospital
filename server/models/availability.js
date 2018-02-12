var mongoose = require('mongoose');

var availabilitySchema = new mongoose.Schema({
  date: { type: String  },
  userid: { type: String  },
  note: { type: String},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

availabilitySchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Availability', availabilitySchema);