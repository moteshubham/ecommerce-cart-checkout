import { useState } from 'react';

function Home() {
  const [userId, setUserId] = useState('user1');
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Will be implemented in next commit
    console.log('Add to cart:', { userId, itemId, name, price, qty });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Ecommerce Store</h1>
      {message && <div style={{ padding: '1rem', background: '#d4edda', marginBottom: '1rem' }}>{message}</div>}
      
      <h2>Demo Items</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {demoItems.map(item => (
          <div key={item.itemId} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleAddDemoItem(item)} style={{ padding: '0.5rem 1rem' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2>Add Custom Item to Cart</h2>
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
          <label>Item ID:</label>
          <input
            type="text"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Quantity:</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Add to Cart
        </button>
      </form>
    </div>
  );
}

export default Home;

