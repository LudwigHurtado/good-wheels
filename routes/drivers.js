const express = require('express');
const {
  createDriver,
  setDriverOnline,
  setDriverOffline,
  listOnlineDrivers,
} = require('../services/driverService');

const router = express.Router();

router.post('/drivers', (req, res) => {
  const driver = createDriver(req.body || {});
  return res.status(201).json(driver);
});

router.patch('/drivers/:id/online', (req, res) => {
  const driver = setDriverOnline(req.params.id);
  if (!driver) {
    return res.status(404).json({ error: 'Driver not found' });
  }

  return res.json(driver);
});

router.patch('/drivers/:id/offline', (req, res) => {
  const driver = setDriverOffline(req.params.id);
  if (!driver) {
    return res.status(404).json({ error: 'Driver not found' });
  }

  return res.json(driver);
});

router.get('/drivers/online', (_req, res) => {
  return res.json(listOnlineDrivers());
});

module.exports = router;
