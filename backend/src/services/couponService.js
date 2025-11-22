import { getOrderCount, addCoupon, getLatestValidCoupon, isCouponUsed } from '../models/store.js';
import { v4 as uuidv4 } from 'uuid';

const NTH_ORDER = parseInt(process.env.NTH_ORDER) || 5;

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
 * @returns {Object} { coupon: string, generated: boolean }
 */
export const generateCouponIfEligible = () => {
  const latestCoupon = getLatestValidCoupon();
  const isLatestUsed = latestCoupon ? isCouponUsed(latestCoupon.code) : true;
  
  // If we should generate a new coupon
  if (shouldGenerateCoupon()) {
    // Generate if no coupon exists or latest coupon has been used
    if (!latestCoupon || isLatestUsed) {
      const code = generateCouponCode();
      addCoupon(code);
      return { coupon: code, generated: true };
    }
  }

  // Return latest valid coupon if it exists and hasn't been used
  if (latestCoupon && !isLatestUsed) {
    return { coupon: latestCoupon.code, generated: false };
  }

  // No coupon available
  return { coupon: null, generated: false };
};

