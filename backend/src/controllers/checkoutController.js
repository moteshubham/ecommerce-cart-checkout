import * as checkoutService from '../services/checkoutService.js';
import { isValidUserId, isValidCouponFormat } from '../utils/validate.js';

export const checkout = (req, res) => {
  try {
    const { userId, couponCode } = req.body;

    if (!isValidUserId(userId)) {
      return res.status(400).json({ error: 'Invalid or missing userId' });
    }

    if (couponCode !== undefined && couponCode !== null && !isValidCouponFormat(couponCode)) {
      return res.status(400).json({ error: 'Invalid coupon code format' });
    }

    const order = checkoutService.processCheckout(userId, couponCode || null);
    res.status(200).json(order);
  } catch (error) {
    if (error.message === 'Cart is empty') {
      return res.status(400).json({ error: error.message });
    }
    if (error.message.includes('coupon') || error.message.includes('Coupon')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

