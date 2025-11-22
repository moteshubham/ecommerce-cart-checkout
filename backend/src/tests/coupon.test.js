import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import * as couponService from '../services/couponService.js';
import { orders, coupons, usedCoupons } from '../models/store.js';
import { addOrder, addCoupon, markCouponUsed } from '../models/store.js';

describe('Coupon Service', () => {
  beforeEach(() => {
    orders.length = 0;
    coupons.history = [];
    coupons.latestValid = null;
    usedCoupons.clear();
  });

  describe('shouldGenerateCoupon', () => {
    it('should return false for 0 orders', () => {
      expect(couponService.shouldGenerateCoupon()).toBe(false);
    });

    it('should return true for 2nd order (default NTH_ORDER=2)', () => {
      // Create 2 orders
      for (let i = 0; i < 2; i++) {
        addOrder({ orderId: `order${i}`, userId: 'user1', items: [], total: 100, discount: 0, finalAmount: 100, timestamp: new Date().toISOString() });
      }
      expect(couponService.shouldGenerateCoupon()).toBe(true);
    });

    it('should return false for 1st order', () => {
      for (let i = 0; i < 1; i++) {
        addOrder({ orderId: `order${i}`, userId: 'user1', items: [], total: 100, discount: 0, finalAmount: 100, timestamp: new Date().toISOString() });
      }
      expect(couponService.shouldGenerateCoupon()).toBe(false);
    });
  });

  describe('generateCouponIfEligible', () => {
    it('should generate coupon when condition is met and no coupon exists', () => {
      // Create 2 orders
      for (let i = 0; i < 2; i++) {
        addOrder({ orderId: `order${i}`, userId: 'user1', items: [], total: 100, discount: 0, finalAmount: 100, timestamp: new Date().toISOString() });
      }
      
      const result = couponService.generateCouponIfEligible();
      expect(result.generated).toBe(true);
      expect(result.coupon).toBeTruthy();
      expect(typeof result.coupon).toBe('string');
    });

    it('should return existing coupon if condition not met but coupon exists', () => {
      const existingCoupon = addCoupon('EXISTING123');
      
      const result = couponService.generateCouponIfEligible();
      expect(result.generated).toBe(false);
      expect(result.coupon).toBe('EXISTING123');
    });

    it('should return null if no coupon exists and condition not met', () => {
      // Create only 1 order (not 2)
      for (let i = 0; i < 1; i++) {
        addOrder({ orderId: `order${i}`, userId: 'user1', items: [], total: 100, discount: 0, finalAmount: 100, timestamp: new Date().toISOString() });
      }
      
      const result = couponService.generateCouponIfEligible();
      expect(result.coupon).toBeNull();
    });

    it('should generate new coupon when previous one is used', () => {
      // Create 2 orders
      for (let i = 0; i < 2; i++) {
        addOrder({ orderId: `order${i}`, userId: 'user1', items: [], total: 100, discount: 0, finalAmount: 100, timestamp: new Date().toISOString() });
      }
      
      // Generate first coupon
      const firstResult = couponService.generateCouponIfEligible();
      expect(firstResult.generated).toBe(true);
      
      // Mark it as used
      markCouponUsed(firstResult.coupon);
      
      // Create 2 more orders (total 4)
      for (let i = 2; i < 4; i++) {
        addOrder({ orderId: `order${i}`, userId: 'user1', items: [], total: 100, discount: 0, finalAmount: 100, timestamp: new Date().toISOString() });
      }
      
      // Should generate new coupon
      const secondResult = couponService.generateCouponIfEligible();
      expect(secondResult.generated).toBe(true);
      expect(secondResult.coupon).not.toBe(firstResult.coupon);
    });
  });
});

