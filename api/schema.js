const JoiBase = require('@hapi/joi');
const JoiDate = require('@hapi/joi-date');
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

const savePageViewEventSchema = {
  body: {
    userId: Joi.string().allow(null),
    pageId: Joi.string().allow(null),
    timestamp: Joi.date().allow(null),
  },
};

module.exports = {
  savePageViewEventSchema,
};
