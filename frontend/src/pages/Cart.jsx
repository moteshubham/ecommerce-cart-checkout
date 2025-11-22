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
    <div style={{ padding: '2rem' }}>
      <h1>Shopping Cart</h1>
      {message && <div style={{ padding: '1rem', background: '#d4edda', marginBottom: '1rem' }}>{message}</div>}
      
      <div style={{ marginBottom: '1rem' }}>
        <label>User ID: </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button onClick={loadCart} style={{ padding: '0.5rem 1rem' }}>Refresh</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : cart ? (
        <div>
          {cart.items && cart.items.length > 0 ? (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ccc' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Item</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Price</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Quantity</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Subtotal</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map(item => (
                    <tr key={item.itemId} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '0.5rem' }}>{item.name}</td>
                      <td style={{ padding: '0.5rem' }}>${item.price.toFixed(2)}</td>
                      <td style={{ padding: '0.5rem' }}>{item.qty}</td>
                      <td style={{ padding: '0.5rem' }}>${(item.price * item.qty).toFixed(2)}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <button onClick={() => handleRemove(item.itemId)} style={{ padding: '0.25rem 0.5rem' }}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Total: ${cart.total.toFixed(2)}
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      ) : (
        <p>No cart data</p>
      )}
    </div>
  );
}

export default Cart;
