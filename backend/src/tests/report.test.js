import { describe, it, expect, beforeEach } from '@jest/globals';
import * as reportService from '../services/reportService.js';
import { orders, coupons } from '../models/store.js';
import { addOrder, addCoupon } from '../models/store.js';

describe('Report Service', () => {
  beforeEach(() => {
    orders.length = 0;
    coupons.history = [];
    coupons.latestValid = null;
  });

  it('should generate empty report for no orders', () => {
    const report = reportService.generateReport();
    expect(report.totalItemsPurchased).toBe(0);
    expect(report.totalPurchaseAmount).toBe(0);
    expect(report.totalDiscountGiven).toBe(0);
    expect(report.ordersCount).toBe(0);
    expect(report.coupons).toEqual([]);
  });

  it('should calculate total items purchased correctly', () => {
    addOrder({
      orderId: 'order1',
      userId: 'user1',
      items: [
        { itemId: 'item1', name: 'T-shirt', price: 100, qty: 2 },
        { itemId: 'item2', name: 'Jeans', price: 200, qty: 1 }
      ],
      total: 400,
      discount: 0,
      finalAmount: 400,
      timestamp: new Date().toISOString()
    });

    const report = reportService.generateReport();
    expect(report.totalItemsPurchased).toBe(3); // 2 + 1
  });

  it('should calculate total purchase amount correctly', () => {
    addOrder({
      orderId: 'order1',
      userId: 'user1',
      items: [{ itemId: 'item1', name: 'T-shirt', price: 100, qty: 2 }],
      total: 200,
      discount: 0,
      finalAmount: 200,
      timestamp: new Date().toISOString()
    });

    addOrder({
      orderId: 'order2',
      userId: 'user2',
      items: [{ itemId: 'item2', name: 'Jeans', price: 200, qty: 1 }],
      total: 200,
      discount: 0,
      finalAmount: 200,
      timestamp: new Date().toISOString()
    });

    const report = reportService.generateReport();
    expect(report.totalPurchaseAmount).toBe(400); // 200 + 200
  });

  it('should calculate total discount given correctly', () => {
    addOrder({
      orderId: 'order1',
      userId: 'user1',
      items: [{ itemId: 'item1', name: 'T-shirt', price: 100, qty: 2 }],
      total: 200,
      discount: 20, // 10% discount
      finalAmount: 180,
      timestamp: new Date().toISOString()
    });

    addOrder({
      orderId: 'order2',
      userId: 'user2',
      items: [{ itemId: 'item2', name: 'Jeans', price: 200, qty: 1 }],
      total: 200,
      discount: 0,
      finalAmount: 200,
      timestamp: new Date().toISOString()
    });

    const report = reportService.generateReport();
    expect(report.totalDiscountGiven).toBe(20);
  });

  it('should include all coupons in report', () => {
    addCoupon('COUPON1');
    addCoupon('COUPON2');

    const report = reportService.generateReport();
    expect(report.coupons).toHaveLength(2);
    expect(report.coupons[0]).toHaveProperty('code');
    expect(report.coupons[0]).toHaveProperty('createdAt');
  });

  it('should return correct orders count', () => {
    for (let i = 0; i < 5; i++) {
      addOrder({
        orderId: `order${i}`,
        userId: 'user1',
        items: [],
        total: 100,
        discount: 0,
        finalAmount: 100,
        timestamp: new Date().toISOString()
      });
    }

    const report = reportService.generateReport();
    expect(report.ordersCount).toBe(5);
  });
});

