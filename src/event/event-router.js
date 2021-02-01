const express = require('express');

const EventService = require('./event-service');

const eventRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

//* GET all events
eventRouter
  .route('/')
  .all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const events = await EventService.getAllEvents(
        req.app.get('db'),
        req.user.id
      );
      console.log('user: ', req.user);
      res.json(events);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = eventRouter;
