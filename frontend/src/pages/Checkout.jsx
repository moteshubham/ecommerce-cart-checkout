import { useState } from 'react';

function Checkout() {
  const [userId, setUserId] = useState('user1');
  const [couponCode, setCouponCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will be implemented in next commit
    console.log('Checkout:', { userId, couponCode });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      {error && <div style={{ padding: '1rem', background: '#f8d7da', marginBottom: '1rem', color: '#721c24' }}>{error}</div>}
      {order && (
        <div style={{ padding: '1rem', background: '#d4edda', marginBottom: '1rem' }}>
          <h2>Order Confirmed!</h2>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          {order.discount > 0 && (
            <>
              <p><strong>Discount:</strong> ${order.discount.toFixed(2)}</p>
              <p><strong>Final Amount:</strong> ${order.finalAmount.toFixed(2)}</p>
            </>
          )}
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map(item => (
              <li key={item.itemId}>{item.name} x{item.qty} - ${item.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Coupon Code (optional):</label>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Processing...' : 'Complete Checkout'}
        </button>
      </form>
    </div>
  );
}

export default Checkout;

