const express =require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const StaffController = require('../controllers/staffs');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null,Date.now+ file.originalname);
    
  }
});
 const fileFilter =(req,file,cb) => {
     if(file.mimetype === 'image/jpeg'|| file.mimetype === 'image/pnp'){
        cb(null,true);
     }else{
        cb(null,false);
     }   
 };

const upload = multer({
    storage: storage, 
    limits: {
    fileSize:1024*1024*5
     },
     fileFilter: fileFilter

});


router.get("/",StaffController.staffs_get_all);

router.post("/",checkAuth,upload.single('productImage'),StaffController.staffs_create_staff);

router.get("/:staffId",StaffController.staffs_get_staff);

router.patch("/:staffId",checkAuth,StaffController.staffs_updates_staff);

router.delete("/:staffId",checkAuth,StaffController.staffs_delete_staff);

module.exports = router;