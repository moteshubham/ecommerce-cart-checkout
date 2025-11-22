function Admin() {
  const handleGenerateCoupon = () => {
    // Will be implemented in next commit
    console.log('Generate coupon');
  };

  const handleGetReport = () => {
    // Will be implemented in next commit
    console.log('Get report');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      {error && <div style={{ padding: '1rem', background: '#f8d7da', marginBottom: '1rem', color: '#721c24' }}>{error}</div>}
      
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={handleGenerateCoupon} 
          disabled={loading}
          style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}
        >
          {loading ? 'Generating...' : 'Generate Coupon'}
        </button>
        <button 
          onClick={handleGetReport} 
          disabled={loading}
          style={{ padding: '0.5rem 1rem' }}
        >
          {loading ? 'Loading...' : 'Get Report'}
        </button>
      </div>

      {coupon && (
        <div style={{ padding: '1rem', background: '#d4edda', marginBottom: '1rem' }}>
          <h2>Coupon Generated</h2>
          <p><strong>Code:</strong> {coupon.coupon}</p>
          <p><strong>Generated:</strong> {coupon.generated ? 'Yes' : 'No (existing coupon)'}</p>
        </div>
      )}

      {report && (
        <div>
          <h2>Report</h2>
          <div style={{ padding: '1rem', background: '#f8f9fa', border: '1px solid #ccc' }}>
            <p><strong>Total Items Purchased:</strong> {report.totalItemsPurchased}</p>
            <p><strong>Total Purchase Amount:</strong> ${report.totalPurchaseAmount.toFixed(2)}</p>
            <p><strong>Total Discount Given:</strong> ${report.totalDiscountGiven.toFixed(2)}</p>
            <p><strong>Orders Count:</strong> {report.ordersCount}</p>
            <div>
              <strong>Coupons:</strong>
              {report.coupons && report.coupons.length > 0 ? (
                <ul>
                  {report.coupons.map((c, idx) => (
                    <li key={idx}>{c.code} - {new Date(c.createdAt).toLocaleString()}</li>
                  ))}
                </ul>
              ) : (
                <p>No coupons generated yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

