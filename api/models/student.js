const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    
    name:{ type:String, required: true},
    address:{type:String, required: true},
    gender:{type:String, required: true},
    telephoneno:{ type:Number, required: true},
    guardianname:{ type:String, required: true},
    dob:{type:Number,required: true},
    subject: {type: mongoose.Schema.Types.ObjectId, ref:'Subject',required : true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref:'Teacher',required : true}
    

    
});
module.exports=  mongoose.model('Student',studentSchema);