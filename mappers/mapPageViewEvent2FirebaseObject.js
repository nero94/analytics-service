const { Timestamp } = require('firebase').firestore;

module.exports = (analyticsEvent) => {
  const { userIp = null, browserName = null, userId = null, pageId = null, timestamp = null } = analyticsEvent;

  const firebaseTimestamp = timestamp && Timestamp.fromDate(timestamp);

  return {
    userIp,
    browserName,
    userId,
    pageId,
    timestamp: firebaseTimestamp,
  };
};
