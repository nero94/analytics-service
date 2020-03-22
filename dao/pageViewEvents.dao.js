const { database } = require('../db');
const analyticsEventsRef = database.ref('analytics-events');
const logger = require('../common/logger');

const savePageViewEvent = async (analyticsEvent) => {
  const result = await analyticsEventsRef.push(analyticsEvent);
  logger.info('Page view event stored successfully in DB', { result });
  return result;
};

const getAllByPageId = async (pageId) => {
  const results = new Promise((resolve, reject) => {
    analyticsEventsRef.orderByChild('pageId').equalTo(pageId).once('value', (snapshot) => {
      resolve(snapshot.val());
    });
  });
  logger.info('Page view event by page id successfully fetched from DB', { results });
  return await results || [];
};

const getAllByBrowserName = async (browserName) => {
  const results = new Promise((resolve, reject) => {
    analyticsEventsRef.orderByChild('browserName').equalTo(browserName).once('value', (snapshot) => {
      resolve(snapshot.val());
    });
  });
  logger.info('Page view event by browser name successfully fetched from DB', { results });
  return await results || [];
};

const getAllByCountryName = async (countryName) => {
  const results = new Promise((resolve, reject) => {
    analyticsEventsRef.orderByChild('countryName').equalTo(countryName).once('value', (snapshot) => {
      resolve(snapshot.val());
    });
  });
  logger.info('Page view event by country name successfully fetched from DB', { results });
  return await results || [];
};

const getAllByReturningRates = async () => {
  const results = new Promise((resolve, reject) => {
    analyticsEventsRef.orderByChild('userId').once('value', (snapshot) => {
      resolve(snapshot.val());
    });
  });
  logger.info('Page view event by returning rates successfully fetched from DB', { results });
  return await results || [];
};

module.exports = {
  savePageViewEvent,
  getAllByPageId,
  getAllByBrowserName,
  getAllByCountryName,
  getAllByReturningRates,
};
