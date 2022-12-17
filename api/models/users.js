// @ts-check
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../utils/database');

const jwtSecret = 'iloveCats!';
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

async function readOneUserFromUsername(username) {
  const users = await db.get('/users');
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function readOneUserFromEmail(email) {
  const users = await db.get('/users');
  const indexOfUserFound = users.findIndex((user) => user.email === email);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function readOneUserFromId(id) {
  const users = await db.get('/users');
  const user = users.find((u) => u.id === Number(id));

  return user;
}

async function createOneUser(email, username, password) {
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
  const users = await db.get('/users');

  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

async function getScore(username, coursReq) {
  const users = await db.get('/users');

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
  const users = await db.get('/users');

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
  const users = await db.get('/users');

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
  const users = await db.get('/users');

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

/* Delete account */
async function deleteAccount(userId) {
  const users = await db.get('/users');
  const indexOfUser = users.findIndex((user) => user.id === Number(userId));

  if (indexOfUser < 0) return false;

  return db.delete(`/users[${indexOfUser}]`);
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  readOneUserFromEmail,
  readOneUserFromId,
  getScore,
  updateScore,
  getProgress,
  setProgress,
  deleteAccount,
};
