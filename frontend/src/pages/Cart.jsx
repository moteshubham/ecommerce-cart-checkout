import { useState, useEffect } from 'react';
import { getCart, removeFromCart } from '../services/api';

function Cart() {
  const [userId, setUserId] = useState('user1');
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await getCart(userId);
      setCart(data);
    } catch (error) {
      setMessage(`Error: ${error.message || 'Failed to load cart'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  const handleRemove = async (itemId) => {
    try {
      const data = await removeFromCart(userId, itemId);
      setCart(data);
      setMessage('Item removed from cart');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`Error: ${error.message || 'Failed to remove item'}`);
    }
  };

  return (
    <div className="page-container">
      <h1>Shopping Cart</h1>
      {message && <div className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</div>}
      
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ marginBottom: 0, flex: '1' }}>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button onClick={loadCart} className="btn-secondary">Refresh</button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading...</p>
      ) : cart ? (
        <div>
          {cart.items && cart.items.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map(item => (
                    <tr key={item.itemId}>
                      <td><strong>{item.name}</strong></td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.qty}</td>
                      <td><strong>${(item.price * item.qty).toFixed(2)}</strong></td>
                      <td>
                        <button onClick={() => handleRemove(item.itemId)} className="btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                  Total: ${cart.total.toFixed(2)}
                </div>
              </div>
            </>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>Your cart is empty</p>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>No cart data</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
