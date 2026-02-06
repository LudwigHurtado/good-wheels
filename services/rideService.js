const { Ride, RIDE_STATUSES } = require('../models/ride');

/**
 * In-memory ride storage for lifecycle prototyping.
 * TODO: Replace this map with database repositories.
 */
const rides = new Map();
let nextRideId = 1;

function createRide(data) {
  const rideId = String(nextRideId++);
  const ride = new Ride({
    id: rideId,
    ...data,
    status: data.status || RIDE_STATUSES.REQUESTED,
  });

  rides.set(rideId, ride);
  return ride;
}

function getRideById(rideId) {
  return rides.get(String(rideId)) || null;
}

function updateRideStatus(rideId, status) {
  const ride = getRideById(rideId);
  if (!ride) {
    return null;
  }

  ride.status = status;
  return ride;
}

function assignDriver(rideId, driverId) {
  const ride = getRideById(rideId);
  if (!ride) {
    return null;
  }

  ride.driverId = driverId;
  return ride;
}

function setProposedPrice(rideId, price) {
  const ride = getRideById(rideId);
  if (!ride) {
    return null;
  }

  ride.proposedPrice = price;
  ride.status = RIDE_STATUSES.OFFERED;
  return ride;
}

function acceptRide(rideId, driverId, agreedPrice) {
  const ride = getRideById(rideId);
  if (!ride) {
    return null;
  }

  ride.driverId = driverId;
  ride.agreedPrice = agreedPrice;
  ride.status = RIDE_STATUSES.ACCEPTED;

  return ride;
}

module.exports = {
  createRide,
  getRideById,
  updateRideStatus,
  assignDriver,
  setProposedPrice,
  acceptRide,
};
