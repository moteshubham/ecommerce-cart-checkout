import { useState } from 'react';
import { checkout } from '../services/api';

function Checkout() {
  const [userId, setUserId] = useState('user1');
  const [couponCode, setCouponCode] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const data = await checkout(userId, couponCode || null);
      setOrder(data);
      setCouponCode('');
    } catch (err) {
      setError(err.message || 'Checkout failed. Make sure backend is running and cart has items.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Checkout</h1>
      {error && <div className="error-message">{error}</div>}
      {order && (
        <div className="success-message" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginTop: 0, color: '#065f46' }}>Order Confirmed! 🎉</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <strong>Order ID:</strong>
              <p style={{ margin: '0.25rem 0', fontFamily: 'monospace', fontSize: '0.875rem' }}>{order.orderId}</p>
            </div>
            <div>
              <strong>Total:</strong>
              <p style={{ margin: '0.25rem 0', fontSize: '1.125rem' }}>${order.total.toFixed(2)}</p>
            </div>
            {order.discount > 0 && (
              <>
                <div>
                  <strong>Discount:</strong>
                  <p style={{ margin: '0.25rem 0', color: 'var(--success-color)', fontSize: '1.125rem' }}>-${order.discount.toFixed(2)}</p>
                </div>
                <div>
                  <strong>Final Amount:</strong>
                  <p style={{ margin: '0.25rem 0', fontSize: '1.25rem', fontWeight: '700' }}>${order.finalAmount.toFixed(2)}</p>
                </div>
              </>
            )}
          </div>
          <div style={{ marginTop: '1rem' }}>
            <strong>Items:</strong>
            <ul style={{ marginTop: '0.5rem' }}>
              {order.items.map(item => (
                <li key={item.itemId} style={{ marginBottom: '0.25rem' }}>
                  {item.name} x{item.qty} - ${item.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Coupon Code (optional):</label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%' }}>
          {loading ? 'Processing...' : 'Complete Checkout'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;

