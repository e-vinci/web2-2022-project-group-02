const express = require('express');
const { register, login } = require('../models/users');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) throw new Error('Pseudo ou mot de passe invalide');

  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) {
    res.status(409); // 409 Conflict
    throw new Error('Pseudo déjà utilisé');
  }

  return res.json(authenticatedUser);
});

/* Login a user */
router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) throw new Error('Pseudo ou mot de passe invalide');

  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) {
    res.status(401); // 401 Unauthorized
    throw new Error('Pseudo ou mot de passe invalide');
  }

  return res.json(authenticatedUser);
});

module.exports = router;
