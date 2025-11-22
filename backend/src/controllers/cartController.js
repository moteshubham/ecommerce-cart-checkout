import * as cartService from '../services/cartService.js';
import { isValidUserId, isValidItemId, isValidPrice, isValidQuantity } from '../utils/validate.js';

export const addItem = (req, res) => {
  try {
    const { userId, itemId, name, price, qty } = req.body;

    // Validation
    if (!userId || !itemId || !name || price === undefined || qty === undefined) {
      return res.status(400).json({ error: 'Missing required fields: userId, itemId, name, price, qty' });
    }

    if (typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'Price must be a non-negative number' });
    }

    if (typeof qty !== 'number' || qty <= 0 || !Number.isInteger(qty)) {
      return res.status(400).json({ error: 'Quantity must be a positive integer' });
    }

    const cart = cartService.addItemToCart(userId, itemId, name, price, qty);
    const result = cartService.getUserCart(userId);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!isValidUserId(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    const result = cartService.getUserCart(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeItem = (req, res) => {
  try {
    const { userId, itemId } = req.params;
    
    if (!isValidUserId(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    if (!isValidItemId(itemId)) {
      return res.status(400).json({ error: 'Invalid itemId' });
    }

    const cart = cartService.removeItemFromCart(userId, itemId);
    const result = cartService.getUserCart(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

