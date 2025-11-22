// API base URL - change this if backend runs on different host/port
const API_BASE_URL = 'http://localhost:3001';

export const addToCart = async (userId, itemId, name, price, qty) => {
  const response = await fetch(`${API_BASE_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, itemId, name, price, qty }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add item to cart');
  }
  
  return response.json();
};

export const getCart = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get cart');
  }
  
  return response.json();
};

export const removeFromCart = async (userId, itemId) => {
  const response = await fetch(`${API_BASE_URL}/cart/${userId}/${itemId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to remove item from cart');
  }
  
  return response.json();
};

export const checkout = async (userId, couponCode = null) => {
  const response = await fetch(`${API_BASE_URL}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, couponCode }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Checkout failed');
  }
  
  return response.json();
};

export const generateCoupon = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/generate-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // 404 is acceptable for "no coupon available"
  if (!response.ok && response.status !== 404) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate coupon');
  }
  
  return response.json();
};

export const getReport = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/report`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get report');
  }
  
  return response.json();
};

