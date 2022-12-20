const express = require('express');
const logger = require('morgan');

// Make async errors work
require('express-async-errors');

const authsRouter = require('./routes/auths');
const forumRouter = require('./routes/forum');
const usersRouter = require('./routes/users');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auths', authsRouter);
app.use('/forum', forumRouter);
app.use('/users', usersRouter);
app.use('/leaderboard', leaderboardRouter);

app.use((err, req, res, next) => {
  if (res.statusCode === 200) res.status(400);

  if (res.headersSent) return next(err);

  // If the error is not an instance of Error, it's probably an internal error
  if (Object.getPrototypeOf(err) instanceof Error) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.json({ error: 'Internal server error' });
  }

  return res.json({ error: err.message });
});

module.exports = app;
