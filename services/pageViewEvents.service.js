const { pageViewEventsDao } = require('../dao');
const getIpData = require('../resources/getIPData');
const mapPageViewEvent2FirebaseObject = require('../mappers/mapPageViewEvent2FirebaseObject');
const mapFirebaseObject2PageViewEvents = require('../mappers/mapFirebaseObject2PageViewEvents');
const mapPageViewEventsByReturningRates = require('../mappers/mapPageViewEventsByReturningRates');
const logger = require('../common/logger');
const { UNRECOGNIZED_COUNTRY, LOCALHOST_IPV4, LOCALHOST_IPV6 } = require('../common/constants');

const attachCountry = async (analyticsEvent) => {
  const { userIp } = analyticsEvent;
  if (userIp && ![LOCALHOST_IPV4, LOCALHOST_IPV6].includes(userIp)) {
    try {
      const ipData = await getIpData(userIp);
      const { country_name: countryName } = ipData;
      analyticsEvent.countryName = countryName;
      logger.info('IP country fetched successfully', { countryName, userIp });
      return;
    } catch (error) {
      logger.error('Fetching IP data failed', { userIp, error });
      analyticsEvent.countryName = UNRECOGNIZED_COUNTRY;
    }
  }
  analyticsEvent.countryName = UNRECOGNIZED_COUNTRY;
};

const savePageViewEvent = async (analyticsEvent) => {
  const analyticsEventMapped = mapPageViewEvent2FirebaseObject(analyticsEvent);
  logger.info('Analytics event mapped', { analyticsEventMapped });
  await attachCountry(analyticsEventMapped);
  return await pageViewEventsDao.savePageViewEvent(analyticsEventMapped);
};

const getAllByPageId = async (pageId) => {
  const analyticsEvents = await pageViewEventsDao.getAllByPageId(pageId);
  const analyticsEventMapped = mapFirebaseObject2PageViewEvents(analyticsEvents);
  logger.info('Analytics events by page id mapped', { analyticsEventMapped });
  return analyticsEventMapped;
};

const getAllByBrowserName = async (browserName) => {
  const analyticsEvents = await pageViewEventsDao.getAllByBrowserName(browserName);
  const analyticsEventMapped = mapFirebaseObject2PageViewEvents(analyticsEvents);
  logger.info('Analytics events by browser name mapped', { analyticsEventMapped });
  return analyticsEventMapped;
};

const getAllByCountryName = async (coutryName) => {
  const analyticsEvents = await pageViewEventsDao.getAllByCountryName(coutryName);
  const analyticsEventMapped = mapFirebaseObject2PageViewEvents(analyticsEvents);
  logger.info('Analytics events by country name mapped', { analyticsEventMapped });
  return analyticsEventMapped;
};

const getAllByReturningRates = async () => {
  const analyticsEvents = await pageViewEventsDao.getAllByReturningRates();
  const analyticsEventMapped = mapFirebaseObject2PageViewEvents(analyticsEvents);
  const mappedByRates = mapPageViewEventsByReturningRates(analyticsEventMapped);
  logger.info('Analytics events by returning rates mapped', { mappedByRates });
  return mappedByRates;
};

module.exports = {
  savePageViewEvent,
  getAllByPageId,
  getAllByBrowserName,
  getAllByCountryName,
  getAllByReturningRates,
};
