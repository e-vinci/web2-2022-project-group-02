const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const authsRouter = require('./routes/auths');
const codeRunnerRouter = require('./routes/coderunner');
// const leaderboards = require('./routes/leaderboards');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/auths', authsRouter);
app.use('/coderunner', codeRunnerRouter);
// app.use('./leaderboards',leaderboards);

module.exports = app;
