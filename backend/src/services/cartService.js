import { getCart, setCart } from '../models/store.js';

/**
 * Add an item to a user's cart
 * @param {string} userId - User ID
 * @param {string} itemId - Item ID
 * @param {string} name - Item name
 * @param {number} price - Item price
 * @param {number} qty - Quantity
 * @returns {Array} Updated cart items
 */
export const addItemToCart = (userId, itemId, name, price, qty) => {
  const cart = getCart(userId);
  const existingItemIndex = cart.findIndex(item => item.itemId === itemId);

  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    cart[existingItemIndex].qty += qty;
  } else {
    // Add new item
    cart.push({ itemId, name, price, qty });
  }

  setCart(userId, cart);
  return cart;
};

/**
 * Get user's cart
 * @param {string} userId - User ID
 * @returns {Object} Cart with items and total
 */
export const getUserCart = (userId) => {
  const items = getCart(userId);
  const total = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  return { items, total };
};

/**
 * Remove an item from user's cart
 * @param {string} userId - User ID
 * @param {string} itemId - Item ID
 * @returns {Array} Updated cart items
 */
export const removeItemFromCart = (userId, itemId) => {
  const cart = getCart(userId);
  const filteredCart = cart.filter(item => item.itemId !== itemId);
  setCart(userId, filteredCart);
  return filteredCart;
};

