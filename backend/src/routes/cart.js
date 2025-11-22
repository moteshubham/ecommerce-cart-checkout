import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', cartController.addItem);
router.get('/:userId', cartController.getCart);
router.delete('/:userId/:itemId', cartController.removeItem);

export default router;

