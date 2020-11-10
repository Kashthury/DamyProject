const mongoose=require('mongoose');
const Student = require('../models/student');
const Teacher = require("../models/teacher");
const Subject = require('../models/subject');

const { success, error, validation } = require("../helpers/responseApi");


exports.students_get_all = (req,res,next)=>{
    Student.find()
    .select(" subject name address gender telephoneno dob guardianname ")
    .populate('subject','name ')
    .populate('teacher','name ')
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            students: docs.map(doc =>{
                return{
                    
                    StudentName: doc.name,
                    _id: doc._id,
                    Address:doc.address,
                    Gender:doc.gender,
                    TP:doc.telephoneno,
                    DOB:doc.dob,
                    GuardianName:doc.guardianname,
                    subject: doc.subject,
                    teacher: doc.teacher,
                    /*name: doc.name,
                    address:doc.address,
                    gender:doc.gender,
                    telephoneno:doc.telephoneno,
                    dob:doc.dob,
                    guardianname:doc.guardianname,*/
                   // price: doc.price,
                   // productImage: doc.productImage,
                   
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/students/'+doc._id
                    }
                }
            })
        };
       
       res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
} ;

exports.students_create_student = (req, res, next)=> {
    Subject.findById(req.body.subjectId)
    .then(subject => {
        if(!subject){
            
          res.status(404).json(error("Student Not found", res.statusCode));
        }
        const student = new Student({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            address:req.body.address,
            gender:req.body.gender,
            telephoneno:req.body.telephoneno,
            dob:req.body.dob,
            guardianname:req.body.guardianname,
            subject: req.body.subjectId,
            teacher:req.body.teacherId
            
        });
        return student.save()
    })
    .then(result => {
       const response ={
              message: "Created student successfully",
              createdStudent: {
                _id: result._id,
                name: result.name,
                address:result.address,
                gender:result.gender,
                telephoneno:result.telephoneno,
                guardianname:result.guardianname,
                dob:result.dob,
                subject:result.subject,
                teacher:result.teacher          
               
               },
               request: {
                type:'GET',
                url: "http://localhost:3000/students"+ result._id
            }
        };
          res.status(200).json(success("OK",response,res.statusCode));
        
        })
   
     .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
};

exports.students_get_student = (req , res ,next)=>{
    Student.findById(req.params.studentId)
    
    .populate('subject')
    .populate('teacher')
    .exec()
    .then(student => {
        if(!student){
            res.status(404).json(error("Student Not found", res.statusCode));
        }
        
            const response = {
             
              student: student,
               request: {
                  type: 'GET',
                  url: 'http://localhost:3000/students/'
                }
            };
       
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 };

 exports.students_updates_student = (req, res, next)=>{
    const id = req.params.studentId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    Student.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        const response ={
            message:'Student updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/students/'+ id
            }
        }
        
        res.status(200).json(success("OK",response,res.statusCode));

    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

};


exports.students_delete_student = (req , res ,next)=>{
    Student.remove({_id: req.params.studentId})
    .exec()
    .then(result =>{
     const response = {
         message:"Student deleted",
         request: {
             type: "POST",
             url: 'http://localhost:3000/students/',
             body:{studentId: "ID"} /*doubt all attribute or not */
           }
        }
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

 } 