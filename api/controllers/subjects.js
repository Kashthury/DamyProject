const mongoose=require('mongoose');
const Subject = require("../models/subject");
const { success, error, validation } = require("../helpers/responseApi");

exports.subjects_get_all = (req,res,next)=>{
    Subject.find()
    .select("name fee")
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            subjects: docs.map(doc =>{
                return{
                    SubjectName: doc.name,
                    Fee:doc.fee,
                  
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/subjects/'+doc._id
                    }
                }
            })
        };
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

} 

exports.subjects_create_subject = (req, res, next)=> {
    const subject = new Subject({
                   _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    fee:req.body.fee,     
           
    });
    subject
    .save()
    .then(result => {
      
        const response = {
             message: "Created subject successfully",
             createdSubject: {
             name: result.name,
             fee:result.fee,
                   
             request: {
                type:'GET',
                url: "http://localhost:3000/subjects"+ result._id
               }
            }
          };
       
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
};

exports.subjects_get_subject = (req, res, next)=> {
    const id= req.params.subjectId;
    Subject.findById(id)
    .select('name fee')
    .exec()
    .then(doc => {
        console.log("From database",doc);
        if(doc){
            
             const response ={   
                 subject: doc,
                 requsest: {
                    type: 'GET',
                    url: 'http://localhost:3000/subjects'
                }
            };
         res.status(200).json(success("OK",response,res.statusCode));
          
        }else{
           
           res.status(404).json(error("Subject Not found", res.statusCode));

        }
        
    })

    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

}

exports.subjects_updates_subject = (req, res, next)=>{
    const id = req.params.subjectId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    Subject.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
       
        const response = {
            message:'Subject updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/subjects/'+ id
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
      

    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

};

exports.subjects_delete_subject = (req, res, next)=>{
    const id =req.params.subjectId;
    Subject.remove({_id: id})
    .exec()
    .then(result => {
       
        const response = {
            message:'Subject Deleted',
            request: {
             type: 'POST',
            url: 'http://localhost:3000/subject',
            body: { name:'String'}
 
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
       
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }
