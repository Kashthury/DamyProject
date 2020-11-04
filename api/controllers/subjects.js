const mongoose=require('mongoose');
const Subject = require("../models/subject");

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
                   // price: doc.price,
                   // productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/subjects/'+doc._id
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

exports.subjects_create_subject = (req, res, next)=> {
    const subject = new Subject({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
                    fee:req.body.fee,     
           // price:req.body.price,
           // productImage : req.file.path
    });
    subject
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
        message: "Created subject successfully",
        createdSubject: {
            name: result.name,
            fee:result.fee,
                   
            //price: result.price,
            //_id: result._id,
            request: {
                type:'GET',
                url: "http://localhost:3000/subjects"+ result._id
            }
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

exports.subjects_get_subject = (req, res, next)=> {
    const id= req.params.subjectId;
    Subject.findById(id)
    .select('name fee')
    .exec()
    .then(doc => {
        console.log("From database",doc);
        if(doc){
            res.status(200).json({
                subject: doc,
                requsest: {
                    type: 'GET',
                    url: 'http://localhost:3000/subjects'
                }
            });
        }else{
            res.status(404).json({message: "No Valid entry found for subjectId "});

        }
        
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
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
        res.status(200).json({
            message:'Subject updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/subjects/'+ id
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

exports.subjects_delete_subject = (req, res, next)=>{
    const id =req.params.subjectId;
    Subject.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Subject Deleted',
            request: {
             type: 'POST',
            url: 'http://localhost:3000/subject',
            body: { name:'String'}
 
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
