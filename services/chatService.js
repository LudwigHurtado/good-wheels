/**
 * Chat skeleton storage.
 * TODO: Replace this in-memory map with persistent DB-backed chat storage.
 */
const chatsByRideId = new Map();

function initializeChatForRide(rideId) {
  if (!chatsByRideId.has(rideId)) {
    chatsByRideId.set(rideId, {
      rideId,
      // Messages in this chat are linked to the rideId lifecycle context.
      messages: [],
      createdAt: new Date().toISOString(),
    });
  }

  return chatsByRideId.get(rideId);
}

function addMessageToRideChat(rideId, message) {
  const chat = chatsByRideId.get(rideId) || initializeChatForRide(rideId);

  chat.messages.push({
    ...message,
    rideId, // Explicit linkage between each message and the ride.
    timestamp: new Date().toISOString(),
  });

  return chat;
}

module.exports = {
  initializeChatForRide,
  addMessageToRideChat,
};
