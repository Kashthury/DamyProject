const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PaymentsController= require ('../controllers/payments');

router.get("/", checkAuth,PaymentsController.payments_get_all);

router.post('/',checkAuth,PaymentsController.payments_create_payment);

router.get('/:paymentId',checkAuth,PaymentsController.payments_get_payment);


module.exports = router;