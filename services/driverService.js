const { Driver } = require('../models/driver');

/**
 * In-memory driver storage for availability and assignment flows.
 * TODO: Move to persistent storage once auth and accounts are in place.
 */
const drivers = new Map();
let nextDriverId = 1;

function createDriver(data) {
  const driverId = String(nextDriverId++);
  const driver = new Driver({
    id: driverId,
    ...data,
    isOnline: data?.isOnline || false,
    activeRideId: data?.activeRideId || null,
  });

  drivers.set(driverId, driver);
  return driver;
}

function getDriverById(driverId) {
  return drivers.get(String(driverId)) || null;
}

function setDriverOnline(driverId) {
  const driver = getDriverById(driverId);
  if (!driver) {
    return null;
  }

  driver.isOnline = true;
  return driver;
}

function setDriverOffline(driverId) {
  const driver = getDriverById(driverId);
  if (!driver) {
    return null;
  }

  driver.isOnline = false;
  return driver;
}

function listOnlineDrivers() {
  return Array.from(drivers.values()).filter(
    (driver) => driver.isOnline && !driver.activeRideId,
  );
}

function assignRideToDriver(driverId, rideId) {
  const driver = getDriverById(driverId);
  if (!driver) {
    return null;
  }

  driver.activeRideId = String(rideId);
  return driver;
}

module.exports = {
  createDriver,
  setDriverOnline,
  setDriverOffline,
  listOnlineDrivers,
  assignRideToDriver,
  getDriverById,
};
