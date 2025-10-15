// src/App.js - Updated with API fetch
import React, { useState, useEffect } from 'react';

export default function App() {
  const [billboards, setBillboards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://adview360.onrender.com')
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
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <h1>AdView360 - Indian Billboards</h1>
      <input
        placeholder="Search city, location or billboard name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 20, fontSize: 16 }}
      />
      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No billboards found.</p>
      ) : (
        filtered.map((b) => (
          <div key={b.id} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 15 }}>
            <h3>{b.name}</h3>
            <p>
              {b.city} - {b.location}
            </p>
            <p>Type: {b.type}</p>
            <p>Estimated Footfall: {b.footfall.toLocaleString()}</p>
            <p>Rent: ₹{b.costPerMonth.toLocaleString()} / month</p>
          </div>
        ))
      )}
    </div>
  );
}
