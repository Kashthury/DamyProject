const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{ type:String, required: true},
    fee:{ type:Number, required: true},
   // price:{ type:Number, required: true},
   //productImage: {type: String, required: true}
    
});
module.exports=  mongoose.model('Subject',subjectSchema);