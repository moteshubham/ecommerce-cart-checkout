import { describe, it, expect, beforeEach } from '@jest/globals';
import * as cartService from '../services/cartService.js';
import { carts, setCart } from '../models/store.js';

describe('Cart Service', () => {
  beforeEach(() => {
    // Clear carts before each test
    Object.keys(carts).forEach(key => delete carts[key]);
  });

  describe('addItemToCart', () => {
    it('should add a new item to an empty cart', () => {
      const result = cartService.addItemToCart('user1', 'item1', 'T-shirt', 499.99, 2);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        itemId: 'item1',
        name: 'T-shirt',
        price: 499.99,
        qty: 2
      });
    });

    it('should update quantity if item already exists', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 499.99, 2);
      const result = cartService.addItemToCart('user1', 'item1', 'T-shirt', 499.99, 3);
      expect(result).toHaveLength(1);
      expect(result[0].qty).toBe(5);
    });

    it('should add multiple different items', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 499.99, 2);
      const result = cartService.addItemToCart('user1', 'item2', 'Jeans', 799.99, 1);
      expect(result).toHaveLength(2);
    });
  });

  describe('getUserCart', () => {
    it('should return empty cart for new user', () => {
      const result = cartService.getUserCart('user1');
      expect(result.items).toEqual([]);
      expect(result.total).toBe(0);
    });

    it('should calculate total correctly', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 100, 2);
      cartService.addItemToCart('user1', 'item2', 'Jeans', 200, 1);
      const result = cartService.getUserCart('user1');
      expect(result.total).toBe(400); // (100 * 2) + (200 * 1)
    });
  });

  describe('removeItemFromCart', () => {
    it('should remove item from cart', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 499.99, 2);
      cartService.addItemToCart('user1', 'item2', 'Jeans', 799.99, 1);
      const result = cartService.removeItemFromCart('user1', 'item1');
      expect(result).toHaveLength(1);
      expect(result[0].itemId).toBe('item2');
    });

    it('should handle removing non-existent item gracefully', () => {
      cartService.addItemToCart('user1', 'item1', 'T-shirt', 499.99, 2);
      const result = cartService.removeItemFromCart('user1', 'item999');
      expect(result).toHaveLength(1);
    });
  });
});

