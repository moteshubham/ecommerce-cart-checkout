import * as checkoutService from '../services/checkoutService.js';

export const checkout = (req, res) => {
  try {
    const { userId, couponCode } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const order = checkoutService.processCheckout(userId, couponCode || null);
    res.status(200).json(order);
  } catch (error) {
    if (error.message === 'Cart is empty') {
      return res.status(400).json({ error: error.message });
    }
    if (error.message.includes('coupon')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

