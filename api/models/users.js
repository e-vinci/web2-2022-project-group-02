const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jwtSecret = 'iloveCats!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', saltRounds),
  },
];

async function login(username, password) {
  const user = readOneUserFromUsername(username);
  if (!user) return undefined;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { id: user.id, username: user.username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    id: user.id,
    username: user.username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  const user = await createOneUser(username, password);

  const token = jwt.sign(
    { id: user.id, username: user.username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    id: user.id,
    username: user.username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

function readOneUserFromId(id) {
  const users = parse(jsonDbPath, defaultUsers);
  const user = users.find((u) => u.id === Number(id));

  return user;
}

async function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    username,
    password: hashedPassword,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

async function getScore(username, coursReq) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  const user = users[indexOfUserFound];
  if (user.cours === undefined) {
    user.cours = [
      {
        titre: coursReq,
        chapitre: 0,
        progres: 0,
        score: 0,
      },
    ];
  }
  const listeCours = users[indexOfUserFound].cours;
  const indexOfCours = listeCours.findIndex((cours) => cours.titre === coursReq);
  const coursTrouve = listeCours[indexOfCours];
  return coursTrouve.score;
}

async function updateScore(username, coursReq, scoreReq) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  const user = users[indexOfUserFound];
  if (user.cours === undefined) {
    user.cours = [
      {
        titre: coursReq,
        chapitre: 0,
        progres: 0,
        score: scoreReq,
      },
    ];
  } else {
    const listeCours = user.cours;
    const indexOfCours = listeCours.findIndex((cours) => cours.titre === coursReq);
    user.cours[indexOfCours].score = scoreReq;
  }
  serialize(jsonDbPath, users);
  return true;
}

async function getProgress(username, titreCours) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  const user = users[indexOfUserFound];
  if (user === undefined) return -1;
  if (user.cours === undefined) {
    user.cours = [
      {
        titre: titreCours,
        chapitre: 0,
        progres: 0,
        score: 0,
      },
    ];
  }
  const indexOfCours = user.cours.findIndex((cours) => cours.titre === titreCours);

  return user.cours[indexOfCours];
}

async function setProgress(username, titreCours, chapitre, progres, page) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUser = users.findIndex((user) => user.username === username);
  const user = users[indexOfUser];
  if (user.cours === undefined) {
    user.cours = [
      {
        titre: titreCours,
        chapitre: 0,
        progres: 0,
        score: 0,
        page: 0,
      },
    ];
  }
  const indexOfCours = user.cours.findIndex((cours) => cours.titre === titreCours);
  let cours = user.cours[indexOfCours];

  if (!cours) {
    cours = {
      titre: titreCours,
      chapitre: 0,
      progres: 0,
      score: 0,
      page: 0,
    };

    user.cours.push(cours);
  }

  cours.chapitre = chapitre;
  cours.progres = progres;
  cours.page = page;
  serialize(jsonDbPath, users);
  return true;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  readOneUserFromId,
  getScore,
  updateScore,
  getProgress,
  setProgress,
};
