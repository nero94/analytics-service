const { celebrate } = require('celebrate');

const validateSchema = (schema) => celebrate(schema, { abortEarly: false });

module.exports = {
  validateSchema,
};
