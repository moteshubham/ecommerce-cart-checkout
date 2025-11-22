/**
 * Validate user ID
 * @param {string} userId - User ID to validate
 * @returns {boolean} True if valid
 */
export const isValidUserId = (userId) => {
  return userId && typeof userId === 'string' && userId.trim().length > 0;
};

/**
 * Validate item ID
 * @param {string} itemId - Item ID to validate
 * @returns {boolean} True if valid
 */
export const isValidItemId = (itemId) => {
  return itemId && typeof itemId === 'string' && itemId.trim().length > 0;
};

/**
 * Validate price
 * @param {number} price - Price to validate
 * @returns {boolean} True if valid
 */
export const isValidPrice = (price) => {
  return typeof price === 'number' && price >= 0 && !isNaN(price);
};

/**
 * Validate quantity
 * @param {number} qty - Quantity to validate
 * @returns {boolean} True if valid
 */
export const isValidQuantity = (qty) => {
  return typeof qty === 'number' && qty > 0 && Number.isInteger(qty);
};

/**
 * Validate coupon code format
 * @param {string} couponCode - Coupon code to validate
 * @returns {boolean} True if valid format
 */
export const isValidCouponFormat = (couponCode) => {
  return couponCode && typeof couponCode === 'string' && couponCode.trim().length > 0;
};

