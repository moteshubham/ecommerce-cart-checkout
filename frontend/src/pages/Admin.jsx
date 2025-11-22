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
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={handleGenerateCoupon} style={{ padding: '0.5rem 1rem', marginRight: '1rem' }}>
          Generate Coupon
        </button>
        <button onClick={handleGetReport} style={{ padding: '0.5rem 1rem' }}>
          Get Report
        </button>
      </div>
      <div>
        <h2>Report</h2>
        <p>Report data will be displayed here</p>
      </div>
    </div>
  );
}

export default Admin;

