const express = require('express');
const rideRoutes = require('./routes/rides');
const driverRoutes = require('./routes/drivers');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/', rideRoutes);
app.use('/', driverRoutes);

app.listen(PORT, () => {
  console.log('Ride module initialized');
  console.log('Driver module initialized');
  console.log(`GoodWheels backend running on port ${PORT}`);
});
