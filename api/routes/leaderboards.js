const { updateScore, getScore } = require('../models/users');
const router = require('./users');

router.post('/getScore', async (req, res) => {
  const username = req.body?.username ? req.body.username : undefined;
  const cours = req.body?.cours ? req.body.cours : undefined;
  if (username === undefined) res.statusCode = 418;
  if (cours === undefined) res.statusCode = 418;
  const response = {
    score: await getScore(username, cours),
  };
  return res.json(response);
});

router.post('/majScore', async (req, res) => {
  const username = req.body?.username ? req.body.username : undefined;
  const cours = req.body?.cours ? req.body.cours : undefined;
  const score = req.body?.score ? req.body.score : undefined;
  if (username === undefined) res.statusCode = 418;
  if (cours === undefined) res.statusCode = 418;
  if (score === undefined) res.statusCode = 418;

  updateScore(username, cours, score);
  res.statusCode = 200;
  return res.statusCode;
});

module.exports = router;
