const express = require('express');
const { readAllUsers, updateScore, getScore } = require('../models/users');
const { authorize } = require('../utils/auths');

const router = express.Router();

/* Get ranking */
router.get('/', async (req, res) => {
  const users = await readAllUsers();
  const courses = {};

  users.forEach((user) => {
    user.courses?.forEach((course) => {
      if (!course.score) return;

      if (courses[course.title] === undefined) {
        courses[course.title] = [];
      }

      courses[course.title].push({
        id: user.id,
        username: user.username,
        score: course.score,
      });
    });
  });

  Object.keys(courses).forEach((course) => {
    courses[course].sort((a, b) => b.score - a.score);
  });

  return res.json(courses);
});

router.post('/getScore', authorize, async (req, res) => {
  const cours = req.body?.cours ? req.body.cours : undefined;
  if (cours === undefined) res.statusCode = 418;
  const response = {
    score: await getScore(req.user.username, cours),
  };
  return res.json(response);
});

router.post('/setScore', authorize, async (req, res) => {
  const cours = req.body?.cours ? req.body.cours : undefined;
  const score = req.body?.score ? req.body.score : undefined;
  if (cours === undefined) res.statusCode = 418;
  if (score === undefined) res.statusCode = 418;

  updateScore(req.user.username, cours, score);
  res.statusCode = 200;
  return res.statusCode;
});

module.exports = router;
