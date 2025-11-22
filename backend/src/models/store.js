// In-memory data stores
export const carts = {}; // { userId: [{ itemId, name, price, qty }] }
export const orders = []; // [{ orderId, userId, items, total, discount, finalAmount, timestamp }]
export const coupons = {
  history: [], // [{ code, createdAt }]
  latestValid: null // { code, createdAt } or null
};
export const usedCoupons = new Set(); // Set of coupon codes that have been used

// Helper functions for store access
export const getCart = (userId) => {
  return carts[userId] || [];
};

export const setCart = (userId, items) => {
  carts[userId] = items;
};

export const addOrder = (order) => {
  orders.push(order);
  return order;
};

export const getAllOrders = () => {
  return orders;
};

export const addCoupon = (code) => {
  const coupon = { code, createdAt: new Date().toISOString() };
  coupons.history.push(coupon);
  coupons.latestValid = coupon;
  return coupon;
};

export const getLatestValidCoupon = () => {
  return coupons.latestValid;
};

export const getAllCoupons = () => {
  return coupons.history;
};

export const markCouponUsed = (code) => {
  usedCoupons.add(code);
};

export const isCouponUsed = (code) => {
  return usedCoupons.has(code);
};

export const getOrderCount = () => {
  return orders.length;
};

