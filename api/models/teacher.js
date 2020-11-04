const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: {type: mongoose.Schema.Types.ObjectId, ref:'Subject',required : true},
    student: {type: mongoose.Schema.Types.ObjectId, ref:'Student',required : true},
    name:{ type:String, required: true},
    address:{type:String, required: true},
    gender:{type:String, required: true},
    telephoneno:{ type:Number, required: true},
    salary:{ type:Number, required: true},
   // price:{ type:Number, required: true},
   //productImage: {type: String, required: true}
    
});
module.exports=  mongoose.model('Teacher',teacherSchema);