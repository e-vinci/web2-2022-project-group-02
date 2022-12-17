const jwt = require('jsonwebtoken');
const { readOneUserFromId } = require('../models/users');

const jwtSecret = 'iloveCats!';

const authorize = (req, res, next) => {
  const token = req.get('authorization');
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const { id } = decoded;

    const existingUser = readOneUserFromId(id);

    if (!existingUser) return res.sendStatus(401);

    req.user = existingUser; // request.user object is available in all other middleware functions
    return next();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('authorize: ', err);
    return res.sendStatus(401);
  }
};

const isAdmin = (req, res, next) => {
  const { username } = req.user;

  if (username !== 'admin') return res.sendStatus(403);
  return next();
};

module.exports = { authorize, isAdmin };
