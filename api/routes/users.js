const express = require('express');
const crypto = require('crypto');
const {
  login,
  readOneUserFromId,
  getProgress,
  setProgress,
  updateAccount,
  deleteAccount,
} = require('../models/users');
const { deleteAuthorPosts } = require('../models/forum');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.get('/progress', authorize, async (req, res) => {
  const { course } = req.query;
  if (course === undefined) return res.sendStatus(400);

  const response = await getProgress(req.user.id, course);

  if (response === -1) return res.sendStatus(404);

  return res.json(response || {});
});

router.post('/progress', authorize, async (req, res) => {
  const { course, chapter, progress, page } = req.body;
  if (course === undefined) return res.sendStatus(400);

  await setProgress(req.user.id, course, chapter ?? 0, progress ?? 0, page ?? 0);

  return res.json({});
});

/* Get user info */
router.get('/:id?', authorize, async (req, res) => {
  const id = req.params.id || req.user.id;

  const user = await readOneUserFromId(id);

  if (!user) return res.sendStatus(404);

  const canSeeSensitiveInfo = req.user.username === 'admin' || req.user.id === Number(id);

  return res.json({
    id: user.id,
    username: user.username,
    email: canSeeSensitiveInfo ? user.email : undefined,
    registerTime: user.registerTime,
    courses: user.courses,
  });
});

/* Update user info */
router.put('/:id?', authorize, async (req, res) => {
  const id = Number(req.params.id || req.user.id);

  if (id !== req.user.id && req.user.username !== 'admin') return res.sendStatus(401);

  if (id === 1) {
    res.status(403);
    throw new Error('Impossible de modifier le compte admin');
  }

  const { email, username, password, passwordConfirm } = req.body;

  if (
    passwordConfirm === undefined ||
    (email === undefined && username === undefined && password === undefined)
  )
    return res.sendStatus(400);

  await updateAccount(id, { email, username, password, passwordConfirm });

  const user = await readOneUserFromId(id);

  const authentifiedUser = await login(user.username, password || passwordConfirm);

  if (!authentifiedUser) throw new Error('Mot de passe incorrect');

  return res.json(authentifiedUser);
});

/* Delete account */
router.delete('/:id?', authorize, async (req, res) => {
  const id = Number(req.params.id || req.user.id);

  if (id === 1) {
    res.status(403);
    throw new Error('Impossible de supprimer le compte admin');
  }

  if (id !== req.user.id && req.user.username !== 'admin') return res.sendStatus(401);

  await deleteAuthorPosts(id);
  await deleteAccount(id);

  return res.json({});
});

/* Get profile picture */
router.get('/:id/avatar', async (req, res) => {
  const { id } = req.params;

  const user = await readOneUserFromId(id);

  if (!user) return res.sendStatus(404);

  const { email } = user;
  const hash = crypto.createHash('md5').update(email).digest('hex');

  return res.redirect(`https://www.gravatar.com/avatar/${hash}?s=150&d=404`);
});

module.exports = router;
