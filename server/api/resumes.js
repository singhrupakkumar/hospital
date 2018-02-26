/**
 * @author Ruapk
 * @description Resume
 * @type type
 */
 var Resume = require('../models/resume');     
 var User = require('../models/user');
 var Hospital = require('../models/hospital');
// Posts API
module.exports = function(apiRouter,serialize){

    // add a hospital favorite

    apiRouter.post('/resumes/add', function(req, res){  

          Resume.findOne({"user_id":req.body.user_id}, function (err, revi) {
            if(revi == null){
             var resume = new Resume(); 
            /**************Education****************/
            var voc_edu = [];  
            var obj = {};  
            obj["name_address"] = req.body.education.voc_edu.name_address;
            obj["date"] = req.body.education.voc_edu.date; 
            obj["graduate"] =  req.body.education.voc_edu.graduate; 
            obj["degree_earned"] = req.body.education.voc_edu.degree_earned;   
            voc_edu.push(obj);
            
            var hospital = [];
            var obj1 = {};
            obj1["name_address"] = req.body.education.hospital.name_address;
            obj1["date"] = req.body.education.hospital.date; 
            obj1["graduate"] =  req.body.education.hospital.graduate; 
            obj1["degree_earned"] = req.body.education.hospital.degree_earned;       
            hospital.push(obj1);
            
            var college = [];
            var obj2 = {};
            obj2["name_address"] = req.body.education.college.name_address;
            obj2["date"] = req.body.education.college.date; 
            obj2["graduate"] =  req.body.education.college.graduate; 
            obj2["degree_earned"] = req.body.education.college.degree_earned;       
            college.push(obj2);
            
            var additional_edu = [];
            var obj3 = {};
            obj3["name_address"] = req.body.education.additional_edu.name_address;
            obj3["date"] = req.body.education.additional_edu.date; 
            obj3["graduate"] =  req.body.education.additional_edu.graduate; 
            obj3["degree_earned"] = req.body.education.additional_edu.degree_earned;       
            additional_edu.push(obj3);
            
             /**************professional_ref****************/
             
            var ref_1 = [];
            var ref_1_obj1 = {};
            ref_1_obj1["degree_earned"] = req.body.professional_ref.ref_1.degree_earned;
            ref_1_obj1["phone"] = req.body.professional_ref.ref_1.phone; 
            ref_1_obj1["address"] =  req.body.professional_ref.ref_1.address; 
            ref_1_obj1["certification"] = req.body.professional_ref.ref_1.certification;       
            ref_1.push(ref_1_obj1);  
            
            var ref_2 = [];
            var ref_1_obj2 = {};
            ref_1_obj2["degree_earned"] = req.body.professional_ref.ref_2.degree_earned;
            ref_1_obj2["phone"] = req.body.professional_ref.ref_2.phone; 
            ref_1_obj2["address"] =  req.body.professional_ref.ref_2.address; 
            ref_1_obj2["certification"] = req.body.professional_ref.ref_2.certification;       
            ref_2.push(ref_1_obj2); 
           
            var ref_3 = [];    
            var ref_1_obj3 = {};
            ref_1_obj3["degree_earned"] = req.body.professional_ref.ref_3.degree_earned;
            ref_1_obj3["phone"] = req.body.professional_ref.ref_3.phone; 
            ref_1_obj3["address"] =  req.body.professional_ref.ref_3.address; 
            ref_1_obj3["certification"] = req.body.professional_ref.ref_3.certification;       
            ref_3.push(ref_1_obj3);
            
            var ref_4 = [];    
            var ref_1_obj4 = {};
            ref_1_obj4["degree_earned"] = req.body.professional_ref.ref_4.degree_earned;
            ref_1_obj4["phone"] = req.body.professional_ref.ref_4.phone; 
            ref_1_obj4["address"] =  req.body.professional_ref.ref_4.address; 
            ref_1_obj4["certification"] = req.body.professional_ref.ref_4.certification;       
            ref_4.push(ref_1_obj4);     
           
            /**************work_his****************/
            
            
            var pres_emp = [];    
            var pres_emp_obj1 = {};
            pres_emp_obj1["name"] = req.body.work_his.pres_emp.name;
            pres_emp_obj1["unit_floor"] = req.body.work_his.pres_emp.unit_floor; 
            pres_emp_obj1["address"] =  req.body.work_his.pres_emp.address; 
            pres_emp_obj1["city"] = req.body.work_his.pres_emp.city;
            pres_emp_obj1["state"] = req.body.work_his.pres_emp.state;
            pres_emp_obj1["zip"] = req.body.work_his.pres_emp.zip; 
            pres_emp_obj1["phone"] =  req.body.work_his.pres_emp.phone; 
            pres_emp_obj1["supervisor_name"] = req.body.work_his.pres_emp.supervisor_name;
            pres_emp_obj1["date"] = req.body.work_his.pres_emp.date;
            pres_emp_obj1["title"] = req.body.work_his.pres_emp.title; 
            pres_emp_obj1["position_duties"] =  req.body.work_his.pres_emp.position_duties; 
            pres_emp_obj1["shift_worked"] = req.body.work_his.pres_emp.shift_worked; 
            pres_emp_obj1["leav_reason"] = req.body.work_his.pres_emp.leav_reason; 
            pres_emp_obj1["sal_pay"] = req.body.work_his.pres_emp.sal_pay;   
            pres_emp.push(pres_emp_obj1);   
            
            var prev_1 = [];    
            var pres_emp_obj2 = {};
            pres_emp_obj2["name"] = req.body.work_his.prev_1.name;
            pres_emp_obj2["unit_floor"] = req.body.work_his.prev_1.unit_floor; 
            pres_emp_obj2["address"] =  req.body.work_his.prev_1.address; 
            pres_emp_obj2["city"] = req.body.work_his.prev_1.city;
            pres_emp_obj2["state"] = req.body.work_his.prev_1.state;
            pres_emp_obj2["zip"] = req.body.work_his.prev_1.zip; 
            pres_emp_obj2["phone"] =  req.body.work_his.prev_1.phone; 
            pres_emp_obj2["supervisor_name"] = req.body.work_his.prev_1.supervisor_name;
            pres_emp_obj2["date"] = req.body.work_his.prev_1.date;
            pres_emp_obj2["title"] = req.body.work_his.prev_1.title; 
            pres_emp_obj2["position_duties"] =  req.body.work_his.prev_1.position_duties; 
            pres_emp_obj2["shift_worked"] = req.body.work_his.prev_1.shift_worked; 
            pres_emp_obj2["leav_reason"] = req.body.work_his.prev_1.leav_reason; 
            pres_emp_obj2["sal_pay"] = req.body.work_his.prev_1.sal_pay;   
            prev_1.push(pres_emp_obj2);   
            
            
            var prev_2 = [];    
            var pres_emp_obj3 = {};
            pres_emp_obj3["name"] = req.body.work_his.prev_2.name;
            pres_emp_obj3["unit_floor"] = req.body.work_his.prev_2.unit_floor; 
            pres_emp_obj3["address"] =  req.body.work_his.prev_2.address; 
            pres_emp_obj3["city"] = req.body.work_his.prev_2.city;
            pres_emp_obj3["state"] = req.body.work_his.prev_2.state;
            pres_emp_obj3["zip"] = req.body.work_his.prev_2.zip; 
            pres_emp_obj3["phone"] =  req.body.work_his.prev_2.phone; 
            pres_emp_obj3["supervisor_name"] = req.body.work_his.prev_2.supervisor_name;
            pres_emp_obj3["date"] = req.body.work_his.prev_2.date;
            pres_emp_obj3["title"] = req.body.work_his.prev_2.title; 
            pres_emp_obj3["position_duties"] =  req.body.work_his.prev_2.position_duties; 
            pres_emp_obj3["shift_worked"] = req.body.work_his.prev_2.shift_worked; 
            pres_emp_obj3["leav_reason"] = req.body.work_his.prev_2.leav_reason; 
            pres_emp_obj3["sal_pay"] = req.body.work_his.prev_2.sal_pay;   
            prev_2.push(pres_emp_obj3);
            
            
            var prev_3 = [];    
            var pres_emp_obj4 = {};
            pres_emp_obj4["name"] = req.body.work_his.prev_3.name;
            pres_emp_obj4["unit_floor"] = req.body.work_his.prev_3.unit_floor; 
            pres_emp_obj4["address"] =  req.body.work_his.prev_3.address; 
            pres_emp_obj4["city"] = req.body.work_his.prev_3.city;
            pres_emp_obj4["state"] = req.body.work_his.prev_3.state;
            pres_emp_obj4["zip"] = req.body.work_his.prev_3.zip; 
            pres_emp_obj4["phone"] =  req.body.work_his.prev_3.phone; 
            pres_emp_obj4["supervisor_name"] = req.body.work_his.prev_3.supervisor_name;
            pres_emp_obj4["date"] = req.body.work_his.prev_3.date;
            pres_emp_obj4["title"] = req.body.work_his.prev_3.title; 
            pres_emp_obj4["position_duties"] =  req.body.work_his.prev_3.position_duties; 
            pres_emp_obj4["shift_worked"] = req.body.work_his.prev_3.shift_worked; 
            pres_emp_obj4["leav_reason"] = req.body.work_his.prev_3.leav_reason; 
            pres_emp_obj4["sal_pay"] = req.body.work_his.prev_3.sal_pay;       
            prev_3.push(pres_emp_obj4);  
            
            
           
            resume.user_id = req.body.user_id;   
            resume.education = {'voc_edu':voc_edu,'hospital':hospital,'college':college,'additional_edu':additional_edu}; 
            resume.professional_ref = {'ref_1':ref_1,'ref_2':ref_2,'ref_3':ref_3,'ref_4':ref_4};
            resume.work_his = {'pres_emp':pres_emp,'prev_1':prev_1,'prev_2':prev_2,'prev_3':prev_3}; 
            resume.save(function(err,update) {         
            if (err)
              res.send(err);  
              res.send({message:"Successfully Saved",error:0,data:update});  
          })
            
          }else{
            res.send({message:"Already data exist",error:1,data:revi});      
          }  
        });    

        
    });
    

    };