import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/generate-coupon', adminController.generateCoupon);
router.get('/report', adminController.getReport);

export default router;

