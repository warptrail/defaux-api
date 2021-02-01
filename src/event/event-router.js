const express = require('express');

const EventService = require('./event-service');

const eventRouter = express.Router();
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');
const widgetRouter = require('../widget/widget-router');

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
  })
  .post(jsonBodyParser, async (req, res, next) => {
    try {
      const { date, start_timestamp, end_timestamp, info, category } = req.body;
      const newEvent = { date, start_timestamp, end_timestamp, info, category };

      // Validate keys all have values
      for (const [key, value] of Object.entries(newEvent))
        if (value === null) {
          logger.error(`Missing ${key} in request body`);
          return res.status(400).json({
            error: `Missing ${key} in request body`,
          });
        }

      // Set the user_id in the new event
      newEvent.user_id = req.user.id;

      const insertEvent = await EventService.createEvent(
        req.app.get('db'),
        newEvent
      );

      res.status(201).json(insertEvent);
    } catch (error) {
      console.log(error);
    }
  });

//* GET specific event
eventRouter
  .route('/single/:id')
  .all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await EventService.getSpecificEvent(req.app.get('db'), id);

      res.json(event);
    } catch (error) {
      console.log(error);
    }
  })
  //* DELETE specific event
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const eventToDelete = await EventService.deleteEvent(
        req.app.get('db'),
        id
      );
      console.log('deleting ', eventToDelete);
      res.end();
    } catch (error) {
      console.log(error);
    }
  })
  //* PATCH specific event
  .patch(jsonBodyParser, async (req, res, next) => {
    const { id } = req.params;
    const { info } = req.body;
    const updatedEventInfo = { info };

    const updatedEvent = await EventService.updateEvent(
      req.app.get('db'),
      id,
      updatedEventInfo
    );
    res.json(updatedEvent);
  });

module.exports = eventRouter;
