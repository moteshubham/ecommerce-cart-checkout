import { useState } from 'react';
import { generateCoupon, getReport } from '../services/api';

function Admin() {
  const [coupon, setCoupon] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateCoupon = async () => {
    setLoading(true);
    setError('');
    setCoupon(null);
    try {
      const data = await generateCoupon();
      if (data.error) {
        setError(data.error);
      } else {
        setCoupon(data);
      }
    } catch (err) {
      setError(err.message || 'Failed to generate coupon. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetReport = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getReport();
      setReport(data);
    } catch (err) {
      setError(err.message || 'Failed to get report. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>
      {error && <div className="error-message">{error}</div>}
      
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={handleGenerateCoupon} 
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Generating...' : 'Generate Coupon'}
        </button>
        <button 
          onClick={handleGetReport} 
          disabled={loading}
          className="btn-secondary"
        >
          {loading ? 'Loading...' : 'Get Report'}
        </button>
      </div>

      {coupon && (
        <div className="success-message" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginTop: 0, color: '#065f46' }}>Coupon Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <strong>Code:</strong>
              <p style={{ margin: '0.25rem 0', fontFamily: 'monospace', fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                {coupon.coupon}
              </p>
            </div>
            <div>
              <strong>Status:</strong>
              <p style={{ margin: '0.25rem 0', fontSize: '1.125rem' }}>
                {coupon.generated ? '✅ Newly Generated' : '📋 Existing Coupon'}
              </p>
            </div>
          </div>
        </div>
      )}

      {report && (
        <div className="card">
          <h2>Analytics Report</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Items Purchased</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>{report.totalItemsPurchased}</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Purchase Amount</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>${report.totalPurchaseAmount.toFixed(2)}</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Discount Given</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success-color)' }}>${report.totalDiscountGiven.toFixed(2)}</div>
            </div>
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Orders Count</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>{report.ordersCount}</div>
            </div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <h3>Coupon History</h3>
            {report.coupons && report.coupons.length > 0 ? (
              <div style={{ marginTop: '1rem' }}>
                {report.coupons.map((c, idx) => (
                  <div key={idx} style={{ padding: '0.75rem', marginBottom: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: '600' }}>{c.code}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No coupons generated yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

