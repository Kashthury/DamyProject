const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    
    date:{type:Number,required: true},
    amount:{type:Number,required: true},
    ispay:{ type:String, required: true},
    subject: {type: mongoose.Schema.Types.ObjectId, ref:'Subject',required : true},
    student: {type: mongoose.Schema.Types.ObjectId, ref:'Student',required : true}

   
    
});
module.exports=  mongoose.model('Payment',paymentSchema);