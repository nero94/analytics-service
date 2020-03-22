const config = require('config');

const verifyToken = (req, res, next) => {
  const authToken = req.headers['authorization'];

  if (authToken && authToken === config.get('authToken')) {
    return next();
  }
  return res.send(401);
};

module.exports = {
  verifyToken,
};
