import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/users.js';
import authsRouter from './routes/auths.js';
import codeRunnerRouter from './routes/coderunner/coderunner.js';
import leaderboardRouter from './routes/leaderboards.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/auths', authsRouter);
app.use('/coderunner', codeRunnerRouter);
app.use('/leaderboard', leaderboardRouter);

export default app;
