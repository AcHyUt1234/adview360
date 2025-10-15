import React, { useState, useEffect } from 'react';

export default function App() {
  const [billboards, setBillboards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://adview360-1.onrender.com/api/billboards')
      .then((res) => res.json())
      .then((data) => {
        setBillboards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = billboards.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', background: '#fafafc', padding: 0, margin: 0 }}>
      <header style={{ padding: '48px 0 24px 0', textAlign: 'center', background: 'linear-gradient(90deg, #3984ff 0%, #0047ab 100%)', color: '#fff', marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: '2.8rem', letterSpacing: '-2px' }}>AdView360</h1>
        <p style={{ margin: 0, fontSize: '1.3rem', opacity: 0.90, fontWeight: 400 }}>Discover Indian Billboards</p>
      </header>

      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '0 20px 48px' }}>
        <input
          placeholder="Search city, location or billboard name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            margin: '30px auto 32px auto',
            padding: '16px',
            borderRadius: 14,
            border: '1px solid #BFD5FF',
            fontSize: 18,
            boxShadow: '0 1px 6px 0 rgba(76,89,117,0.06)'
          }}
        />

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: 60, color: '#4472c9', fontSize: '1.18rem' }}>Loading billboards...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 100, color: '#929bad', fontSize: '1.12rem', fontWeight: 500 }}>
            No billboards found.
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            marginTop: 8,
            justifyContent: 'center'
          }}>
            {filtered.map((b) => (
              <div key={b.id}
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  boxShadow: '0 4px 18px 0 rgba(41,79,170,0.10)',
                  padding: '22px 26px 20px 26px',
                  maxWidth: 340,
                  minWidth: 280,
                  flex: '0 1 320px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                <h3 style={{ margin: 0, color: '#144b8a', fontSize: '1.25rem', fontWeight: 700 }}>{b.name}</h3>
                <div style={{ margin: '8px 0 13px 0', color: '#437ed7', fontWeight: 500, fontSize: '1.06rem' }}>
                  {b.city} &nbsp; &bull; &nbsp; {b.location}
                </div>
                <div style={{ margin: '6px 0', color: '#5f6b7a', fontSize: '0.96rem', letterSpacing: 0.3 }}>Type: <span style={{ color: '#0047ab', fontWeight: 500 }}>{b.type}</span></div>
                <div style={{ color: '#4f5863', fontSize: 15, margin: '3px 0 12px 0' }}>
                  Estimated Footfall: <span style={{ color: '#00af91', fontWeight: 600 }}>{b.footfall?.toLocaleString()}</span>
                </div>
                <div style={{ color: '#364a63', fontWeight: 600, fontSize: 18, marginTop: 4, letterSpacing: 0.2 }}>
                  ₹{b.costPerMonth?.toLocaleString()}<span style={{ fontWeight: 400, color: '#65778a', fontSize: 15 }}> / month</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
