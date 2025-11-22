import { describe, it, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import cors from 'cors';
import healthRouter from '../routes/health.js';
import cartRouter from '../routes/cart.js';
import checkoutRouter from '../routes/checkout.js';
import adminRouter from '../routes/admin.js';
import { carts, orders, coupons, usedCoupons } from '../models/store.js';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/health', healthRouter);
app.use('/cart', cartRouter);
app.use('/checkout', checkoutRouter);
app.use('/admin', adminRouter);

describe('Integration Tests', () => {
  beforeEach(() => {
    // Clear all stores
    Object.keys(carts).forEach(key => delete carts[key]);
    orders.length = 0;
    coupons.history = [];
    coupons.latestValid = null;
    usedCoupons.clear();
  });

  describe('Cart + Checkout Flow', () => {
    it('should complete full cart to checkout flow', async () => {
      const userId = 'user1';

      // Add items to cart
      const addResponse = await request(app)
        .post('/cart/add')
        .send({
          userId,
          itemId: 'item1',
          name: 'T-shirt',
          price: 100,
          qty: 2
        });

      expect(addResponse.status).toBe(200);
      expect(addResponse.body.items).toHaveLength(1);
      expect(addResponse.body.total).toBe(200);

      // Get cart
      const getResponse = await request(app)
        .get(`/cart/${userId}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body.items).toHaveLength(1);

      // Checkout
      const checkoutResponse = await request(app)
        .post('/checkout')
        .send({ userId });

      expect(checkoutResponse.status).toBe(200);
      expect(checkoutResponse.body).toHaveProperty('orderId');
      expect(checkoutResponse.body.total).toBe(200);
      expect(checkoutResponse.body.finalAmount).toBe(200);

      // Verify cart is cleared
      const cartAfterCheckout = await request(app)
        .get(`/cart/${userId}`);

      expect(cartAfterCheckout.body.items).toHaveLength(0);
    });
  });

  describe('Coupon Generation and Usage Flow', () => {
    it('should generate coupon after nth order and allow usage', async () => {
      const userId = 'user1';
      const NTH_ORDER = 2;

      // Create 2 orders to trigger coupon generation (auto-generated after 2nd checkout)
      for (let i = 0; i < NTH_ORDER; i++) {
        // Add item to cart
        await request(app)
          .post('/cart/add')
          .send({
            userId: `user${i}`,
            itemId: `item${i}`,
            name: 'Product',
            price: 100,
            qty: 1
          });

        // Checkout (this will auto-generate coupon after 2nd order)
        await request(app)
          .post('/checkout')
          .send({ userId: `user${i}` });
      }

      // Get coupon (should already be auto-generated, so generated: false)
      const couponResponse = await request(app)
        .post('/admin/generate-coupon');

      expect(couponResponse.status).toBe(200);
      expect(couponResponse.body).toHaveProperty('coupon');
      // Coupon was auto-generated, so generated will be false when retrieved via admin API
      expect(couponResponse.body.coupon).toBeTruthy();
      const couponCode = couponResponse.body.coupon;

      // Use coupon in checkout
      await request(app)
        .post('/cart/add')
        .send({
          userId: 'user_coupon',
          itemId: 'item_coupon',
          name: 'Product',
          price: 100,
          qty: 1
        });

      const checkoutWithCoupon = await request(app)
        .post('/checkout')
        .send({
          userId: 'user_coupon',
          couponCode
        });

      expect(checkoutWithCoupon.status).toBe(200);
      expect(checkoutWithCoupon.body.discount).toBe(10); // 10% of 100
      expect(checkoutWithCoupon.body.finalAmount).toBe(90);

      // Try to use same coupon again - should fail
      await request(app)
        .post('/cart/add')
        .send({
          userId: 'user_coupon2',
          itemId: 'item_coupon2',
          name: 'Product',
          price: 100,
          qty: 1
        });

      const checkoutWithUsedCoupon = await request(app)
        .post('/checkout')
        .send({
          userId: 'user_coupon2',
          couponCode
        });

      expect(checkoutWithUsedCoupon.status).toBe(400);
      expect(checkoutWithUsedCoupon.body.error).toContain('coupon');
    });
  });

  describe('Admin Report Flow', () => {
    it('should generate accurate admin report', async () => {
      // Create some orders
      for (let i = 0; i < 3; i++) {
        await request(app)
          .post('/cart/add')
          .send({
            userId: `user${i}`,
            itemId: `item${i}`,
            name: 'Product',
            price: 100,
            qty: 2
          });

        await request(app)
          .post('/checkout')
          .send({ userId: `user${i}` });
      }

      // Generate report
      const reportResponse = await request(app)
        .get('/admin/report');

      expect(reportResponse.status).toBe(200);
      expect(reportResponse.body).toHaveProperty('totalItemsPurchased', 6); // 3 orders * 2 items
      expect(reportResponse.body).toHaveProperty('totalPurchaseAmount', 600); // 3 orders * 200
      expect(reportResponse.body).toHaveProperty('ordersCount', 3);
      expect(reportResponse.body).toHaveProperty('coupons');
      expect(reportResponse.body).toHaveProperty('totalDiscountGiven');
    });
  });

  describe('Error Handling', () => {
    it('should return 400 for invalid cart add request', async () => {
      const response = await request(app)
        .post('/cart/add')
        .send({
          userId: 'user1',
          // Missing required fields
        });

      expect(response.status).toBe(400);
    });

    it('should return 400 for checkout with empty cart', async () => {
      const response = await request(app)
        .post('/checkout')
        .send({ userId: 'user1' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Cart is empty');
    });

    it('should return 400 for invalid coupon code', async () => {
      await request(app)
        .post('/cart/add')
        .send({
          userId: 'user1',
          itemId: 'item1',
          name: 'Product',
          price: 100,
          qty: 1
        });

      const response = await request(app)
        .post('/checkout')
        .send({
          userId: 'user1',
          couponCode: 'INVALID_COUPON'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('coupon');
    });
  });
});

