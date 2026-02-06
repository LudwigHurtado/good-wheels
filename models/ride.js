const RIDE_STATUSES = {
  REQUESTED: 'REQUESTED',
  OFFERED: 'OFFERED',
  ACCEPTED: 'ACCEPTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELED: 'CANCELED',
};

/**
 * Ride domain model used by the lifecycle skeleton.
 *
 * This is intentionally simple and in-memory friendly for now.
 * Once a database is introduced, this shape can be migrated to an ORM schema.
 */
class Ride {
  constructor({
    id,
    passengerId,
    driverId = null,
    pickupLocation,
    dropoffLocation,
    pricingMode,
    proposedPrice = null,
    agreedPrice = null,
    charityCategory,
    status = RIDE_STATUSES.REQUESTED,
  }) {
    this.id = id;
    this.passengerId = passengerId;
    this.driverId = driverId;
    this.pickupLocation = pickupLocation;
    this.dropoffLocation = dropoffLocation;
    this.pricingMode = pricingMode;
    this.proposedPrice = proposedPrice;
    this.agreedPrice = agreedPrice;
    this.charityCategory = charityCategory;
    this.status = status;
  }
}

module.exports = {
  Ride,
  RIDE_STATUSES,
};
