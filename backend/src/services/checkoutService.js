import { getUserCart } from './cartService.js';
import { addOrder, getLatestValidCoupon, isCouponUsed, markCouponUsed, setCart } from '../models/store.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Validate and apply coupon code
 * @param {string} couponCode - Coupon code to validate
 * @returns {Object} { valid: boolean, discount: number }
 */
export const validateCoupon = (couponCode) => {
  if (!couponCode) {
    return { valid: false, discount: 0 };
  }

  const latestCoupon = getLatestValidCoupon();
  
  if (!latestCoupon || latestCoupon.code !== couponCode) {
    return { valid: false, discount: 0 };
  }

  if (isCouponUsed(couponCode)) {
    return { valid: false, discount: 0 };
  }

  return { valid: true, discount: 0.1 }; // 10% discount
};

/**
 * Process checkout for a user
 * @param {string} userId - User ID
 * @param {string} couponCode - Optional coupon code
 * @returns {Object} Order details
 */
export const processCheckout = (userId, couponCode = null) => {
  const cart = getUserCart(userId);

  if (!cart.items || cart.items.length === 0) {
    throw new Error('Cart is empty');
  }

  const total = cart.total;
  let discount = 0;
  let finalAmount = total;

  // Validate and apply coupon if provided
  if (couponCode) {
    const couponValidation = validateCoupon(couponCode);
    if (!couponValidation.valid) {
      throw new Error('Invalid or already used coupon code');
    }
    discount = total * couponValidation.discount;
    finalAmount = total - discount;
    markCouponUsed(couponCode);
  }

  // Create order
  const order = {
    orderId: uuidv4(),
    userId,
    items: [...cart.items],
    total,
    discount,
    finalAmount,
    timestamp: new Date().toISOString()
  };

  addOrder(order);

  // Clear cart
  setCart(userId, []);

  return order;
};

