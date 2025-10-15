// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const sampleBillboards = [
  { id: 1, name: 'Connaught Place Billboard', city: 'Delhi', location: 'CP-Outer Circle', type: 'Hoarding', footfall: 50000, costPerMonth: 120000 },
  { id: 2, name: 'Bandra Sky Billboard', city: 'Mumbai', location: 'Bandra West', type: 'Digital Screen', footfall: 30000, costPerMonth: 90000 },
];

app.get('/api/billboards', (req, res) => {
  res.json(sampleBillboards);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
