import { describe, it, expect, beforeEach } from '@jest/globals';
import * as checkoutService from '../services/checkoutService.js';
import * as cartService from '../services/cartService.js';
import { carts, orders, usedCoupons, coupons } from '../models/store.js';
import { addCoupon } from '../models/store.js';

describe('Checkout Service', () => {
  beforeEach(() => {
    // Clear all stores before each test
    Object.keys(carts).forEach(key => delete carts[key]);
    orders.length = 0;
    usedCoupons.clear();
    coupons.history = [];
    coupons.latestValid = null;
  });

  describe('validateCoupon', () => {
    it('should return invalid for null coupon code', () => {
      const result = checkoutService.validateCoupon(null);
      expect(result.valid).toBe(false);
      expect(result.discount).toBe(0);
    });

    it('should return invalid for non-existent coupon', () => {
      const result = checkoutService.validateCoupon('INVALID123');
      expect(result.valid).toBe(false);
    });

    it('should return valid for latest valid coupon', () => {
      const coupon = addCoupon('VALID123');
      const result = checkoutService.validateCoupon('VALID123');
      expect(result.valid).toBe(true);
      expect(result.discount).toBe(0.1);
    });

    it('should return invalid for already used coupon', () => {
      const coupon = addCoupon('USED123');
      usedCoupons.add('USED123');
      const result = checkoutService.validateCoupon('USED123');
      expect(result.valid).toBe(false);
    });
  });

  describe('processCheckout', () => {
    it('should throw error for empty cart', () => {
      expect(() => {
        checkoutService.processCheckout('user1');
      }).toThrow('Cart is empty');
    });

    it('should create order without coupon', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 100, 2);
      const order = checkoutService.processCheckout('user1');
      
      expect(order).toHaveProperty('orderId');
      expect(order).toHaveProperty('userId', 'user1');
      expect(order).toHaveProperty('items');
      expect(order).toHaveProperty('total', 200);
      expect(order).toHaveProperty('discount', 0);
      expect(order).toHaveProperty('finalAmount', 200);
      expect(order).toHaveProperty('timestamp');
    });

    it('should apply 10% discount with valid coupon', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 100, 2);
      addCoupon('COUPON123');
      const order = checkoutService.processCheckout('user1', 'COUPON123');
      
      expect(order.total).toBe(200);
      expect(order.discount).toBe(20); // 10% of 200
      expect(order.finalAmount).toBe(180);
    });

    it('should throw error for invalid coupon', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 100, 2);
      expect(() => {
        checkoutService.processCheckout('user1', 'INVALID');
      }).toThrow('Invalid or already used coupon code');
    });

    it('should clear cart after checkout', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 100, 2);
      checkoutService.processCheckout('user1');
      const cart = cartService.getUserCart('user1');
      expect(cart.items).toHaveLength(0);
    });
  });
});

