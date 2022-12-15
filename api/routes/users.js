const express = require('express');
const { getProgress, setProgress } = require('../models/users');
/*
const { LoginPage } = require('../../frontend/src/Components/Pages/LoginPage');
//const dbPath = require('../data/users.json');
const { readOneUserFromUsername } = require('../models/users');
*/
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.json(); // res.json est une fonction qui renvoie la reponse entre parenthèse
});

router.post('/getProgress', async (req, res) => {
  const username = req.body?.username ? req.body.username : undefined;
  const cours = req.body?.cours ? req.body.cours : undefined;
  res.statusCode = 200;
  if (cours === undefined) res.statusCode = 418;
  const reponse = await getProgress(username, cours);
  if (reponse === -1) {
    res.statusCode = 404;
    res.sendStatus(404);
  }
  res.send(reponse);
});

router.post('/setProgress', async (req, res) => {
  const username = req.body?.username ? req.body.username : undefined;
  const cours = req.body?.cours ? req.body.cours : undefined;
  const chapitre = req.body?.cours ? req.body.chapitre : 0;
  const progres = req.body?.progres ? req.body.progres : 0;

  if (username === undefined) res.sendStatus(418);
  if (cours === undefined) res.sendStatus(418);
  const reponse = await setProgress(username, cours, chapitre, progres);
  console.log(reponse);
  res.send(reponse);
});

module.exports = router;
