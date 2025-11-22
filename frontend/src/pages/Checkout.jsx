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
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Complete Checkout
        </button>
      </form>
    </div>
  );
}

export default Checkout;

