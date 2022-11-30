const express = require('express');
const { default: LoginPage } = require('../../frontend/src/Components/Pages/LoginPage');
//const dbPath = require('../data/users.json');
const { readOneUserFromUsername } = require('../models/users');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  // if(LoginPage != dbPath ){
  //   alert('horreur');       //j'essaie de mettre une condition poir afficher erreur quand on met un pseudo ou mdp faux ...(ptt essayer en frontend...)
  // }
  res.json(); // res.json est une fonction qui renvoie la reponse entre parenthèse
});

module.exports = router;
