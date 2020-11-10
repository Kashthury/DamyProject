const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const StudentsController= require ('../controllers/students');

router.get("/", checkAuth,StudentsController.students_get_all);

router.post('/',checkAuth,StudentsController.students_create_student);

router.get('/:studentId',checkAuth,StudentsController.students_get_student);

router.patch('/:studentId',checkAuth,StudentsController.students_updates_student);

router.delete('/:studentId',checkAuth,StudentsController.students_delete_student);

module.exports = router;