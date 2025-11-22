import { getOrderCount, addCoupon, getLatestValidCoupon, isCouponUsed } from '../models/store.js';
import { v4 as uuidv4 } from 'uuid';

// Configuration: Generate coupon every Nth order (default: 2)
const NTH_ORDER = parseInt(process.env.NTH_ORDER) || 2;

/**
 * Generate a random coupon code
 * @returns {string} Coupon code
 */
const generateCouponCode = () => {
  // Generate a short readable code
  return uuidv4().substring(0, 8).toUpperCase();
};

/**
 * Check if a new coupon should be generated based on order count
 * @returns {boolean} True if coupon should be generated
 */
export const shouldGenerateCoupon = () => {
  const orderCount = getOrderCount();
  return orderCount > 0 && orderCount % NTH_ORDER === 0;
};

/**
 * Generate a new coupon if condition is met, or return latest valid coupon
 * Coupons are generated every Nth order. Only one valid coupon exists at a time.
 * @returns {Object} { coupon: string|null, generated: boolean }
 */
export const generateCouponIfEligible = () => {
  const latestCoupon = getLatestValidCoupon();
  const isLatestUsed = latestCoupon ? isCouponUsed(latestCoupon.code) : true;
  
  // Check if we've reached the Nth order threshold
  if (shouldGenerateCoupon()) {
    // Generate new coupon if:
    // 1. No coupon exists, OR
    // 2. Latest coupon has been used
    if (!latestCoupon || isLatestUsed) {
      const code = generateCouponCode();
      addCoupon(code);
      return { coupon: code, generated: true };
    }
  }

  // Return existing valid coupon if it exists and hasn't been used
  if (latestCoupon && !isLatestUsed) {
    return { coupon: latestCoupon.code, generated: false };
  }

  // No coupon available (condition not met or all coupons used)
  return { coupon: null, generated: false };
};

