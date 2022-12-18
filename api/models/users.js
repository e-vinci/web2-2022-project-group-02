// @ts-check
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../utils/database');

const jwtSecret = process.env.JWT_SECRET || 'iloveCats!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const defaultUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    username: 'admin',
    password: bcrypt.hashSync(process.env.DEFAULT_ADMIN_PASSWORD ?? 'admin', saltRounds),
    registerTime: Math.floor(Date.now() / 1000),
  },
];

db.setDefault('/users', defaultUsers);

function assertEmail(email) {
  if (!email || typeof email !== 'string') throw new Error('Invalid email');

  const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
  if (!emailRegex.test(email)) throw new Error('Adresse mail invalide');
}

function assertUsername(username) {
  if (!username || typeof username !== 'string') throw new Error('Invalid username');

  const usernameRegex = /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
  if (!usernameRegex.test(username))
    throw new Error(
      "Pseudo invalide : il doit être compris entre 3 et 20 caractères, et il ne doit pas comporter d'espaces ni de caractères spéciaux.",
    );
}

function assertPassword(password) {
  if (!password || typeof password !== 'string') throw new Error('Invalid password');

  if (
    !(
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password) &&
      password.length >= 8
    )
  )
    throw new Error(
      'Mot de passe invalide : il doit comporter au minimum huit caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre, et un caractère spécial.',
    );
}

async function login(username, password) {
  let user = await readOneUserFromUsername(username);
  if (!user) user = await readOneUserFromEmail(username);
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

async function register(email, username, password) {
  if ((await readOneUserFromUsername(username)) || (await readOneUserFromEmail(email)))
    return undefined;

  const user = await createOneUser(email, username, password);

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

async function getUsers() {
  const users = await db.get('/users');

  return users;
}

async function readAllUsers() {
  const users = await getUsers();

  return users;
}

async function readOneUserFromUsername(username) {
  const users = await getUsers();
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function readOneUserFromEmail(email) {
  const users = await getUsers();
  const indexOfUserFound = users.findIndex((user) => user.email === email);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function readOneUserFromId(id) {
  const users = await getUsers();
  const user = users.find((u) => u.id === Number(id));

  return user;
}

async function createOneUser(email, username, password) {
  assertEmail(email);
  assertUsername(username);
  assertPassword(password);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: await getNextId(),
    email,
    username,
    password: hashedPassword,
    registerTime: Math.floor(Date.now() / 1000),
  };

  await db.push('/users[]', createdUser);

  return createdUser;
}

async function getNextId() {
  const users = await getUsers();

  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

async function getScore(username, coursReq) {
  const users = await getUsers();

  const indexOfUserFound = users.findIndex((user) => user.username === username);
  const user = users[indexOfUserFound];
  if (user.courses === undefined) {
    user.courses = [
      {
        title: coursReq,
        chapter: 0,
        progress: 0,
        score: 0,
      },
    ];
  }

  const courseList = users[indexOfUserFound].courses;
  const courseIndex = courseList.findIndex((courses) => courses.title === coursReq);
  const coursTrouve = courseList[courseIndex];

  return coursTrouve.score;
}

async function updateScore(username, coursReq, scoreReq) {
  const users = await getUsers();

  const indexOfUserFound = users.findIndex((user) => user.username === username);
  const user = users[indexOfUserFound];
  if (user.courses === undefined) {
    user.courses = [
      {
        title: coursReq,
        chapter: 0,
        progress: 0,
        score: scoreReq,
      },
    ];
  } else {
    const courseList = user.courses;
    const courseIndex = courseList.findIndex((courses) => courses.title === coursReq);
    user.courses[courseIndex].score = scoreReq;
  }

  await db.push(`/users[${indexOfUserFound}]`, user);

  return true;
}

async function getProgress(userId, courseTitle) {
  const users = await getUsers();

  const indexOfUserFound = users.findIndex((user) => user.id === Number(userId));
  const user = users[indexOfUserFound];
  if (user === undefined) return -1;
  if (user.courses === undefined) {
    user.courses = [
      {
        title: courseTitle,
        chapter: 0,
        progress: 0,
        score: 0,
      },
    ];
  }

  const courseIndex = user.courses.findIndex((courses) => courses.title === courseTitle);

  return user.courses[courseIndex];
}

async function setProgress(userId, courseTitle, chapter, progress, page) {
  const users = await getUsers();

  const indexOfUser = users.findIndex((user) => user.id === Number(userId));
  const user = users[indexOfUser];
  if (user.courses === undefined) {
    user.courses = [
      {
        title: courseTitle,
        chapter: 0,
        progress: 0,
        score: 0,
        page: 0,
      },
    ];
  }
  const courseIndex = user.courses.findIndex((courses) => courses.title === courseTitle);
  let courses = user.courses[courseIndex];

  if (!courses) {
    courses = {
      title: courseTitle,
      chapter: 0,
      progress: 0,
      score: 0,
      page: 0,
    };

    user.courses.push(courses);
  }

  courses.chapter = chapter;
  courses.progress = progress;
  courses.page = page;

  await db.push(`/users[${indexOfUser}]`, user);

  return true;
}

/* Update account */
async function updateAccount(userId, { email, username, password, passwordConfirm }) {
  const users = await getUsers();
  const indexOfUser = users.findIndex((user) => user.id === Number(userId));

  if (indexOfUser < 0) return false;

  const user = users[indexOfUser];

  if (!(await bcrypt.compare(passwordConfirm, user.password)))
    throw new Error('Mot de passe incorrect');

  if (email && email !== user.email) {
    assertEmail(email);

    if (users.find((u) => u.email === email)) throw new Error('Adresse mail déjà utilisée');

    user.email = email;
  }

  if (username && username !== user.username) {
    if (username.match(/^admin$/i)) throw new Error('Pseudo non autorisé');

    assertUsername(username);

    if (users.find((u) => u.username === username)) throw new Error('Pseudo déjà utilisé');

    user.username = username;
  }

  if (password && !(await bcrypt.compare(password, user.password))) {
    assertPassword(password);

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
  }

  return db.push(`/users[${indexOfUser}]`, user);
}

/* Delete account */
async function deleteAccount(userId) {
  const users = await getUsers();
  const indexOfUser = users.findIndex((user) => user.id === Number(userId));

  if (indexOfUser < 0) return false;

  return db.delete(`/users[${indexOfUser}]`);
}

module.exports = {
  jwtSecret,

  login,
  register,

  readAllUsers,

  readOneUserFromUsername,
  readOneUserFromEmail,
  readOneUserFromId,
  getScore,
  updateScore,
  getProgress,
  setProgress,

  updateAccount,
  deleteAccount,
};
