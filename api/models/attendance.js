const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
  
  // date:{ type:Number, required: true},
 //  time:{ type:Number, required: true},
   //subject: {type: mongoose.Schema.Types.ObjectId, ref:'Subject',required : true},
   student: {type: mongoose.Schema.Types.ObjectId, ref:'Student',required : true},
   class: {type: mongoose.Schema.Types.ObjectId, ref:'Class',required : true}

   
    
});
module.exports=  mongoose.model('Class',attendanceSchema);