const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({

    name:{ type:String, required: true},
    address:{type:String, required: true},
    gender:{type:String, required: true},
    telephoneno:{ type:Number, required: true},
    salary:{ type:Number, required: true},
    position:{type:String, required: true}
    
});
module.exports=  mongoose.model('Staff',staffSchema);