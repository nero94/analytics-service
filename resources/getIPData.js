const axios = require('axios');

const BASE_URL = 'https://ipapi.co/';

module.exports = async (ip, format = 'json') => {
  const response = await axios.get(`${BASE_URL}/${ip}/${format}`);
  return response.data;
};
