import { useState } from 'react';
import { addToCart } from '../services/api';

function Home() {
  const [userId, setUserId] = useState('user1');
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('1');
  const [message, setMessage] = useState('');

  const demoItems = [
  ];

  const handleAddDemoItem = async (item) => {
    try {
      await addToCart(userId, item.itemId, item.name, item.price, 1);
      setMessage(`Added ${item.name} to cart!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`Error: ${error.message || 'Failed to add item. Make sure backend is running on port 3001.'}`);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addToCart(userId, itemId, name, parseFloat(price), parseInt(qty));
      setMessage('Item added to cart!');
      setItemId('');
      setName('');
      setPrice('');
      setQty('1');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`Error: ${error.message || 'Failed to add item. Make sure backend is running on port 3001.'}`);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="page-container">
      <h1>Ecommerce Store</h1>
      {message && <div className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</div>}
      
      <h2>Demo Items</h2>
      <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
        {demoItems.map(item => (
          <div key={item.itemId} className="card">
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>{item.name}</h3>
            <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              ${item.price.toFixed(2)}
            </p>
            <button onClick={() => handleAddDemoItem(item)} className="btn-primary" style={{ width: '100%' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Add Custom Item to Cart</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Item ID:</label>
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            min="1"
          />
        </div>
        <button type="submit" className="btn-primary">
          Add to Cart
        </button>
      </form>
    </div>
  );
}

export default Home;

