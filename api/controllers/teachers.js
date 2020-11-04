const mongoose=require('mongoose');
const Teacher = require("../models/teacher");
const Subject = require('../models/subject');
const Student = require('../models/student');


exports.teachers_get_all = (req,res,next)=>{
    Teacher.find()
    .select(" subject name address gender telephoneno salary")
    .populate('subject','name fee')
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            teachers: docs.map(doc =>{
                return{
                    subject: doc.subject,
                    TeacherName: doc.name,
                    Address:doc.address,
                    Gender:doc.gender,
                    TP:doc.telephoneno,
                    Salary:doc.salary,
                   // price: doc.price,
                   // productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/teachers/'+doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
         error: err   
        });
    });

} 

exports.teachers_create_teacher = (req, res, next)=> {
    Subject.findById(req.body.subjectId)
    .then(subject => {
        if(!subject){
            return res.status(404).json({
                message:"Subject not fount"
            });
        }
        const teacher = new Teacher({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            address:req.body.address,
            gender:req.body.gender,
            telephoneno:req.body.telephoneno,
            salary:req.body.salary,
            subject: req.body.subjectId
            
        });
        return teacher.save()
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
        message: "Created teacher successfully",
        createdTeacher: {
            _id: result._id,
            subject:result.subject,
            name: result.name,
            address:result.address,
            gender:result.gender,
            telephoneno:result.telephoneno,
            salary:result.salary           
            //price: result.price,
            },
            request: {
                type:'GET',
                url: "http://localhost:3000/teachers"+ result._id
            }
        
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });   
     });
}

exports.teachers_get_teacher = (req , res ,next)=>{
    Teacher.findById(req.params.teacherId)
    .populate('subject')
    .exec()
    .then(teacher => {
        if(!teacher){
            res.status(404).json({
                message:"Teacher not found"
            });
        }
        res.status(200).json({
            teacher: teacher,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/teachers/'
            }
        });
 
    })
    .catch(err => {
        res.status(500).json({
         error: err
        });
    });
 }

 exports.teachers_updates_teacher = (req, res, next)=>{
    const id = req.params.teacherId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    Teacher.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Teacher updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/teachers/'+ id
            }
        });

    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });


}

 exports.teachers_delete_teacher = (req , res ,next)=>{
    Teacher.remove({_id: req.params.teacherId})
    .exec()
    .then(result =>{
     res.status(200).json({
         message:"Teacher deleted",
         request: {
             type: "POST",
             url: 'http://localhost:3000/teachers/',
             body:{SubjectId: "ID",fee:"Number"}
         }
     });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
 }