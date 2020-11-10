const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    
    name:{ type:String, required: true},
    fee:{ type:Number, required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref:'Teacher',required : true}
  
    
});
module.exports=  mongoose.model('Subject',subjectSchema);