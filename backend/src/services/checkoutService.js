import { getUserCart } from './cartService.js';
import { addOrder, getLatestValidCoupon, isCouponUsed, markCouponUsed, setCart } from '../models/store.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Validate and apply coupon code
 * Validates that the coupon exists, is the latest valid coupon, and hasn't been used
 * @param {string} couponCode - Coupon code to validate
 * @returns {Object} { valid: boolean, discount: number } - discount is 0.1 for 10% off
 */
export const validateCoupon = (couponCode) => {
  if (!couponCode) {
    return { valid: false, discount: 0 };
  }

  const latestCoupon = getLatestValidCoupon();
  
  // Check if coupon exists and matches the latest valid coupon
  if (!latestCoupon || latestCoupon.code !== couponCode) {
    return { valid: false, discount: 0 };
  }

  // Check if coupon has already been used
  if (isCouponUsed(couponCode)) {
    return { valid: false, discount: 0 };
  }

  // Valid coupon - return 10% discount
  return { valid: true, discount: 0.1 };
};

/**
 * Process checkout for a user
 * Validates cart, applies coupon if provided, creates order, and clears cart
 * @param {string} userId - User ID
 * @param {string} couponCode - Optional coupon code for discount
 * @returns {Object} Order details with orderId, items, totals, and timestamp
 * @throws {Error} If cart is empty or coupon is invalid
 */
export const processCheckout = (userId, couponCode = null) => {
  const cart = getUserCart(userId);

  // Validate cart has items
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
    // Calculate discount (10% of total)
    discount = total * couponValidation.discount;
    finalAmount = total - discount;
    // Mark coupon as used (single-use only)
    markCouponUsed(couponCode);
  }

  // Create order record
  const order = {
    orderId: uuidv4(),
    userId,
    items: [...cart.items], // Copy items array
    total,
    discount,
    finalAmount,
    timestamp: new Date().toISOString()
  };

  addOrder(order);

  // Clear user's cart after successful checkout
  setCart(userId, []);

  return order;
};

