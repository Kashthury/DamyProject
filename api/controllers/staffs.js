const mongoose=require('mongoose');
const Staff = require("../models/staff");

const { success, error, validation } = require("../helpers/responseApi");

exports.staffs_get_all = (req,res,next)=>{
    Staff.find()
    .select("name address gender salary position")
    .exec()
    .then(docs => {
        const response ={
             count: docs.length,
             staff: docs.map(doc =>{
                 return{
                    _id: doc._id,
                    StaffName: doc.name,
                    Address:doc.address,
                    Gender:doc.gender,
                    TelephoneNo:doc.telephoneno,
                    Salary:doc.salary,
                    Position:doc.position,
                   
                     request: {
                        type: 'GET',
                        url: 'http://localhost:3000/staffs/'+doc._id
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

exports.staffs_create_staff = (req, res, next)=> {
    const staff = new Staff({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            address:req.body.address,
            gender:req.body.gender,
            telephoneno:req.body.telephoneno,
            salary:req.body.salary,
            position:req.body.position 
           
    });
    staff
    .save()
    .then(result => {
       
        const response = {
             message: "Created staff successfully",
             createdStaff: {
             name: result.name,
             address:result.address,
             gender:result.gender,
             telephoneno:result.telephoneno,
             salary:result.salary,
             position:result.position,
                   
            //price: result.price,
            //_id: result._id,
             request: {
                type:'GET',
                url: "http://localhost:3000/staffs"+ result._id
               }
            }
          };
        //});
        res.status(200).json(success("OK",response,res.statusCode));
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
};

exports.staffs_get_staff = (req, res, next)=> {
    const id= req.params.staffId;
    Staff.findById(id)
    .select('name')
    .exec()
    .then(doc => {
        console.log("From database",doc);
        if(doc){
            
             const response ={   
                 staff: doc,
                 requsest: {
                    type: 'GET',
                    url: 'http://localhost:3000/staffs'
                }
            };
         res.status(200).json(success("OK",response,res.statusCode));
           
        }else{
           
           res.status(404).json(error("Staff Not found", res.statusCode));

        }
        
    })

    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

}

exports.staffs_updates_staff = (req, res, next)=>{
    const id = req.params.staffId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value;

    }
    Staff.update({_id: id},{$set: updateOps})
    .exec()
    .then(result => {
       // res.status(200).json({
        const response = {
            message:'Staff updated',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/staffs/'+ id
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
       // });

    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });

};

exports.staffs_delete_staff = (req, res, next)=>{
    const id =req.params.staffId;
    Staff.remove({_id: id})
    .exec()
    .then(result => {
       // res.status(200).json({
        const response = {
            message:'Staff Deleted',
            request: {
             type: 'POST',
            url: 'http://localhost:3000/staffs',
            body: { name:'String'}
 
            }
        }
        res.status(200).json(success("OK",response,res.statusCode));  
       // });
    })
    .catch((error) => {
        res.status(500).json(error("Something went wrong", res.statusCode));
      });
 }
