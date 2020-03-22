const analyticsEventsService = require('../services/pageViewEvents.service');
const logger = require('../common/logger');

const savePageViewEvent = async (req, res, next) => {
  try {
    const { browser: browserName } = req.useragent;
    const userIp = req.clientIp;

    const analyticsEvent = {
      ...req.body,
      userIp,
      browserName,
    };

    logger.info('Analytics event received', { analyticsEvent });
    const result = await analyticsEventsService.savePageViewEvent(analyticsEvent);
    res.json({ result });
  } catch (error) {
    logger.error('Pushing analytics event failed', { error });
    next(error);
  }
};

const getPageViewEventsByPageId = async (req, res, next) => {
  const { pageId } = req.params;
  try {
    const analyticsEvents = await analyticsEventsService.getAllByPageId(pageId);
    logger.info('Analytics events by page id received', { analyticsEvents, pageId });
    res.json(analyticsEvents);
  } catch (error) {
    logger.error('Get analytics events by page id failed', { error });
    next(error);
  }
};

const getPageViewEventsByBrowserName = async (req, res, next) => {
  const { browserName } = req.params;
  try {
    const analyticsEvents = await analyticsEventsService.getAllByBrowserName(browserName);
    logger.info('Analytics events by browser name received', { analyticsEvents, browserName });
    res.json(analyticsEvents);
  } catch (error) {
    logger.error('Get analytics events by browser name failed', { error });
    next(error);
  }
};

const getPageViewEventsByCountryName = async (req, res, next) => {
  const { countryName } = req.params;
  try {
    const analyticsEvents = await analyticsEventsService.getAllByCountryName(countryName);
    logger.info('Analytics events by country name received', { analyticsEvents, countryName });
    res.json(analyticsEvents);
  } catch (error) {
    logger.error('Get analytics events by country name failed', { error });
    next(error);
  }
};

const getAllByReturningRates = async (req, res, next) => {
  try {
    const analyticsEvents = await analyticsEventsService.getAllByReturningRates();
    logger.info('Analytics events by returning rates received', { analyticsEvents });
    res.json(analyticsEvents);
  } catch (error) {
    logger.error('Get analytics events by returning rates failed', { error });
    next(error);
  }
};

module.exports = {
  savePageViewEvent,
  getPageViewEventsByPageId,
  getPageViewEventsByBrowserName,
  getPageViewEventsByCountryName,
  getAllByReturningRates,
};
