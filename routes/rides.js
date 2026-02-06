const express = require('express');
const {
  createRide,
  getRideById,
  updateRideStatus,
  setProposedPrice,
  acceptRide,
} = require('../services/rideService');
const { initializeChatForRide } = require('../services/chatService');

const router = express.Router();

/**
 * Ride lifecycle endpoints:
 * - create: REQUESTED
 * - offer: OFFERED
 * - accept: ACCEPTED
 * - status transitions continue via /status endpoint
 */
router.post('/rides', (req, res) => {
  const ride = createRide(req.body || {});

  // Ride-to-chat linkage: create a chat thread as soon as the ride exists.
  initializeChatForRide(ride.id);

  return res.status(201).json(ride);
});

router.get('/rides/:id', (req, res) => {
  const ride = getRideById(req.params.id);
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }

  return res.json(ride);
});

router.patch('/rides/:id/status', (req, res) => {
  const { status } = req.body || {};
  const ride = updateRideStatus(req.params.id, status);

  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }

  return res.json(ride);
});

router.post('/rides/:id/offer', (req, res) => {
  const { price } = req.body || {};
  const ride = setProposedPrice(req.params.id, price);

  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }

  return res.json(ride);
});

router.post('/rides/:id/accept', (req, res) => {
  const { driverId, agreedPrice } = req.body || {};
  const ride = acceptRide(req.params.id, driverId, agreedPrice);

  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }

  return res.json(ride);
});

module.exports = router;
