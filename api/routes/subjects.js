const express =require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const SubjectsController = require('../controllers/subjects');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
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


router.get("/",SubjectsController.subjects_get_all);

router.post("/",checkAuth,upload.single('productImage'),SubjectsController.subjects_create_subject);

router.get("/:subjectId",SubjectsController.subjects_get_subject);

router.patch("/:subjectId",checkAuth,SubjectsController.subjects_updates_subject);

router.delete("/:subjectId",checkAuth,SubjectsController.subjects_delete_subject);

module.exports = router;