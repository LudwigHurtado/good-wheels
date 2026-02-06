/**
 * Driver domain model for in-memory availability and matching.
 */
class Driver {
  constructor({
    id,
    name,
    isOnline = false,
    currentLocation = null,
    activeRideId = null,
  }) {
    this.id = id;
    this.name = name;
    this.isOnline = Boolean(isOnline);
    this.currentLocation = currentLocation;
    this.activeRideId = activeRideId;
  }
}

module.exports = {
  Driver,
};
