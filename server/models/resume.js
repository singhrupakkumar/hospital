var mongoose = require('mongoose');
/*************education************/
var voc_edu = new mongoose.Schema({  
        name_address: {type: String},
        date: {type: Date}, 
        graduate: {type: String},    
        degree_earned: {type: String},
});  

var hospital = new mongoose.Schema({  
        name_address: {type: String},
        date: {type: Date}, 
        graduate: {type: String},    
        degree_earned: {type: String},
}); 

var college = new mongoose.Schema({  
        name_address: {type: String},
        date: {type: Date}, 
        graduate: {type: String},    
        degree_earned: {type: String},
}); 

var additional_edu = new mongoose.Schema({  
        name_address: {type: String},
        date: {type: Date}, 
        graduate: {type: String},    
        degree_earned: {type: String},
}); 

/*************professional_ref************/

var ref_1 = new mongoose.Schema({  
        degree_earned: {type: String},
        phone: {type: String}, 
        address: {type: String},    
        certification: {type: String},
}); 

var ref_2 = new mongoose.Schema({  
        degree_earned: {type: String},
        phone: {type: String}, 
        address: {type: String},    
        certification: {type: String},
}); 

var ref_3 = new mongoose.Schema({  
        degree_earned: {type: String},
        phone: {type: String}, 
        address: {type: String},    
        certification: {type: String},
}); 

var ref_4 = new mongoose.Schema({  
        degree_earned: {type: String},
        phone: {type: String}, 
        address: {type: String},    
        certification: {type: String},
}); 

/*************work_his************/

var pres_emp = new mongoose.Schema({  
        name: {type: String},
        unit_floor: {type: String}, 
        address: {type: String},    
        city: {type: String},
        state: {type: String},
        zip: {type: String},    
        phone: {type: String},
        supervisor_name: {type: String},
        date: {type: Date},    
        title: {type: String},
        position_duties: {type: String},
        shift_worked: {type: String},    
        leav_reason: {type: String},
        sal_pay: {type: String}, 
}); 


var prev_1 = new mongoose.Schema({  
        name: {type: String},
        unit_floor: {type: String}, 
        address: {type: String},    
        city: {type: String},
        state: {type: String},
        zip: {type: String},    
        phone: {type: String},
        supervisor_name: {type: String},
        date: {type: Date},    
        title: {type: String},
        position_duties: {type: String},
        shift_worked: {type: String},    
        leav_reason: {type: String},
        sal_pay: {type: String}, 
}); 

var prev_2 = new mongoose.Schema({  
        name: {type: String},
        unit_floor: {type: String}, 
        address: {type: String},    
        city: {type: String},
        state: {type: String},
        zip: {type: String},    
        phone: {type: String},
        supervisor_name: {type: String},
        date: {type: Date},    
        title: {type: String},
        position_duties: {type: String},
        shift_worked: {type: String},    
        leav_reason: {type: String},
        sal_pay: {type: String}, 
});

var prev_3 = new mongoose.Schema({    
        name: {type: String},
        unit_floor: {type: String}, 
        address: {type: String},    
        city: {type: String},
        state: {type: String},
        zip: {type: String},    
        phone: {type: String},
        supervisor_name: {type: String},
        date: {type: Date},    
        title: {type: String},
        position_duties: {type: String},
        shift_worked: {type: String},    
        leav_reason: {type: String},
        sal_pay: {type: String}, 
});


var resumeSchema = new mongoose.Schema({ 	
    user_id: { type: mongoose.Schema.Types.ObjectId, required: '{PATH} is required!'},
    status:{type:Number,default : 0},  
    education:[{voc_edu:[voc_edu],hospital:[hospital],college:[college],additional_edu:[additional_edu]}], 
    professional_ref:[{ref_1:[ref_1],ref_2:[ref_2],ref_3:[ref_3],ref_4:[ref_4]}], 
    work_his:[{pres_emp:[pres_emp],prev_1:[prev_1],prev_2:[prev_2],prev_3:[prev_3]}], 
    created_at: { type: Date, default: Date.now },  
    updated_at: { type: Date, default: Date.now } 
});

resumeSchema.pre('save', function(next){        
resumeSchema.index({loc: '2dsphere'});
  now = new Date();
  this.updated_at = now;
  next();  
});  

module.exports = mongoose.model('Resume', resumeSchema);   