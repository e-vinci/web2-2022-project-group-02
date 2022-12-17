const express = require('express');
const crypto = require('crypto');
const { readOneUserFromId, getProgress, setProgress } = require('../models/users');
const { authorize } = require('../utils/auths');

const router = express.Router();

router.post('/getProgress', authorize, async (req, res) => {
  const { cours } = req.body;
  if (cours === undefined) res.statusCode = 418;

  const reponse = await getProgress(req.user.id, cours);

  if (reponse === -1) {
    res.statusCode = 404;
    res.sendStatus(404);
  }

  res.json(reponse || {});
});

router.post('/setProgress', authorize, async (req, res) => {
  const { cours, chapitre, progres, page } = req.body;
  if (cours === undefined) res.sendStatus(418);

  await setProgress(req.user.id, cours, chapitre ?? 0, progres ?? 0, page ?? 0);

  res.json({});
});

/* Get profile picture */
router.get('/:id/avatar', async (req, res) => {
  const { id } = req.params;

  const user = await readOneUserFromId(id);

  if (!user)
    return res.redirect('https://www.gravatar.com/avatar/00000000000000000000000000000000?s=100');

  const { email } = user;
  const hash = crypto.createHash('md5').update(email).digest('hex');

  return res.redirect(`https://www.gravatar.com/avatar/${hash}?s=100&d=identicon`);
});

module.exports = router;
