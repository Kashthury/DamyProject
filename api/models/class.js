const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  
   date:{ type:Number, required: true},
   time:{ type:Number, required: true},
   subject: {type: mongoose.Schema.Types.ObjectId, ref:'Subject',required : true},
   teacher: {type: mongoose.Schema.Types.ObjectId, ref:'Teacher',required : true}

   
    
});
module.exports=  mongoose.model('Class',classSchema);