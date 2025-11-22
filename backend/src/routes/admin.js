import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/generate-coupon', adminController.generateCoupon);

export default router;

