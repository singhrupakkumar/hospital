

var mongoose = require('mongoose'),
passportLocalMongoose = require('passport-local-mongoose');



var userphysicalinfo = new mongoose.Schema({  
        prev_physical: {type: String},
        phy_date: {type: String}, 
        phy_copy: {type: String}, 
        tb_test: {type: String},
        tb_date: {type: String}, 
        tb_copy: {type: String},
        cpr_cer: {type: String}, 
        cpr_exp_date: {type: String},
        cpr_card: {type: String},
        nursing_lic: {type: String},
        nur_lic_exp: {type: String},
        fmlycre_reg: {type: String},
        drug_screen: {type: String},      
 
});  

 var docupload = new mongoose.Schema({
    name: {type: String},   
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

var User = new mongoose.Schema({     
  email: {type: String, unique: true},
  image:{type:String, default : ''},
  username:{type: String},
  facebook_id:{ type: String},
  facebook_token:{ type: String}, 
  twitter_id:{ type: String},
  google_id:{ type: String},
  type:{type:String},
  complete_status: { type: String}, // for complete profile
  role:{type:String},

  available_status:{type:String}, // available status
  description:{type:String},
  available_from:{type:String},
  available_to:{type:String},
  shift:{type:String},
  phone: { type: String},
  zip: { type: String},
  address_city:{type:String},   
  address:{type:String},
  gender:{type:String},
  ssn:{type:String},  
  userphysicalinfo:[userphysicalinfo],
  address_country:{type:String,default : 'United States'},
  charges:{type:String},
  awards:{type:String},
  experiance:{type:String},
  education:{type:String},
  docs: [docupload],
     
  resetPasswordToken: { type: String},
  resetPasswordExpires: { type: String},
 

   status: { type: String, default: 1}, // activate/deactivate status
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

User.plugin(passportLocalMongoose, { usernameField: 'email' });
User.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('User', User);