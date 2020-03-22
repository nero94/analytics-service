const express = require('express');
const useragent = require('express-useragent');
const requestIp = require('request-ip');
const router = express.Router();

const schemaValidator = require('../common/schemaValidator');
const { savePageViewEventSchema } = require('./schema');
const controller = require('./controller');
const { verifyToken } = require('./middleware');

router.post('/', schemaValidator.validateSchema(savePageViewEventSchema), useragent.express(), requestIp.mw(), controller.savePageViewEvent);

router.get('/').use(verifyToken);
router.get('/page/:pageId', controller.getPageViewEventsByPageId);
router.get('/browser/:browserName', controller.getPageViewEventsByBrowserName);
router.get('/country/:countryName', controller.getPageViewEventsByCountryName);
router.get('/returning-rates', controller.getAllByReturningRates);

module.exports = router;
