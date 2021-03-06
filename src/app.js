require('dotenv').config();
const express = require('express');
const winston = require('winston');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

// Set up winston

// silly, debug, verbose, info, warn, error

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'info.log' })],
});

if (NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Middleware
const errorHandler = require('./middleware/error-handler');

// Routes
const authRouter = require('./auth/auth-router');
const userRouter = require('./user/user-router');
const widgetRouter = require('./widget/widget-router');
const eventRouter = require('./event/event-router');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/widget', widgetRouter);
app.use('/api/event', eventRouter);

app.use(errorHandler);

module.exports = app;
