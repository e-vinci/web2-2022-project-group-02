const express = require('express');
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

module.exports = router;
