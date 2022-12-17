const express = require('express');
const { getProgress, setProgress } = require('../models/users');
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

module.exports = router;
