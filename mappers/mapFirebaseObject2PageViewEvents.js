const { Timestamp } = require('firebase').firestore;

const mapSingleObject = (singleObject) => {
  const { userIp = null, browserName = null, userId = null, pageId = null, timestamp = null, countryName = null } = singleObject;

  return {
    userIp,
    browserName,
    userId,
    pageId,
    countryName,
    timestamp: timestamp && new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate(),
  };
};

module.exports = (firebaseObject) => {
  return Object.keys(firebaseObject).map((key) => ({ id: key, ...mapSingleObject(firebaseObject[key]) }));
};
