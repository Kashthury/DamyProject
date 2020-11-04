const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const TeachersController= require ('../controllers/teachers');

router.get("/", checkAuth,TeachersController.teachers_get_all);

router.post('/',checkAuth,TeachersController.teachers_create_teacher);

router.get('/:teacherId',checkAuth,TeachersController.teachers_get_teacher);

router.patch('/:teacherId',checkAuth,TeachersController.teachers_updates_teacher);

router.delete('/:teacherId',checkAuth,TeachersController.teachers_delete_teacher );

module.exports = router;