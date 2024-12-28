import express from "express";
import {createOrder, capturePaymentAndFinalizeOrder} from '../../controller/user/UserPaymentController.js'

const router = express.Router();

router.post('/create', createOrder )
router.post('/capture', capturePaymentAndFinalizeOrder)


export default router;