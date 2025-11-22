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
  return response.json();
};

export const getCart = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
  return response.json();
};

export const removeFromCart = async (userId, itemId) => {
  const response = await fetch(`${API_BASE_URL}/cart/${userId}/${itemId}`, {
    method: 'DELETE',
  });
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
  return response.json();
};

export const generateCoupon = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/generate-coupon`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const getReport = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/report`);
  return response.json();
};

