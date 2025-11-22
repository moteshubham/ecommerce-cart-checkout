import { getAllOrders, getAllCoupons, getOrderCount } from '../models/store.js';

/**
 * Generate admin report with analytics
 * @returns {Object} Report data
 */
export const generateReport = () => {
  const orders = getAllOrders();
  const coupons = getAllCoupons();
  
  // Calculate total items purchased
  const totalItemsPurchased = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.qty, 0);
  }, 0);

  // Calculate total purchase amount (before discount)
  const totalPurchaseAmount = orders.reduce((sum, order) => sum + order.total, 0);

  // Calculate total discount given
  const totalDiscountGiven = orders.reduce((sum, order) => sum + order.discount, 0);

  // Get orders count
  const ordersCount = getOrderCount();

  return {
    totalItemsPurchased,
    totalPurchaseAmount,
    coupons: coupons.map(c => ({ code: c.code, createdAt: c.createdAt })),
    totalDiscountGiven,
    ordersCount
  };
};

