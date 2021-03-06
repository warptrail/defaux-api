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
      const { date, timestamp, info, category_id } = req.body;

      const newEvent = {
        date,
        timestamp,
        info,
        category_id,
      };

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

      // add the event to the database
      const insertEvent = await EventService.createEvent(
        req.app.get('db'),
        newEvent
      );

      // response the new event created
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
    try {
      const { id } = req.params;

      const { date, timestamp, info, category_id } = req.body;

      const updatedEventObject = {
        date,
        timestamp,
        info,
        category_id,
      };

      console.log(updatedEventObject);

      // check if valid timestamp
      const isValidTimestamp =
        new Date(updatedEventObject.timestamp).getTime() > 0;
      if (!isValidTimestamp) {
        return res.status(400).json({
          error: {
            message: `Not a valid timestamp - isValidTimestamp: ${new Date(
              updatedEventObject.timestamp
            )}`,
          },
        });
      }

      // Check to see if any values have been updated, otherwise no need to fetch Patch
      const numberOfValues = Object.values(updatedEventObject).filter(Boolean)
        .length;
      if (numberOfValues === 0) {
        logger.error('nothing has changed, patch not needed');
        return res.status(400).json({
          error: {
            message: 'Request body must contain a changed value',
          },
        });
      }

      // Validate all fields have values
      for (const [key, value] of Object.entries(updatedEventObject))
        if (value === null) {
          logger.error(`Missing ${key} in request body`);
          return res.status(400).json({
            error: `Missing ${key} in request body`,
          });
        }

      // Set the user Id for the updated event
      updatedEventObject.user_id = req.user.id;

      // Update the event in the database
      const updatedEvent = await EventService.updateEvent(
        req.app.get('db'),
        id,
        updatedEventObject
      );
      res.json(updatedEvent);
    } catch (error) {
      console.log(error);
    }
  });

//* GET all categories
eventRouter
  .route('/category')
  .all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const allCategories = await EventService.getAllCategories(
        req.app.get('db'),
        req.user.id
      );
      res.json(allCategories);
    } catch (error) {
      console.log(error);
    }
  })
  //* POST new category
  .post(jsonBodyParser, async (req, res, next) => {
    try {
      const { real_name, encoded_name, icon, color } = req.body;
      const newCategory = { real_name, encoded_name, icon, color };

      // Validate keys all have values
      for (const [key, value] of Object.entries(newCategory))
        if (value === null) {
          logger.error(`Missing ${key} in request body`);
          return res.status(400).json({
            error: `Missing ${key} in request body`,
          });
        }

      // Set the user_id in the new event
      newCategory.user_id = req.user.id;

      // add the event to the database
      const insertCategory = await EventService.createCategory(
        req.app.get('db'),
        newCategory
      );

      // response the new event created
      res.status(201).json(insertCategory);
    } catch (error) {
      console.log(error);
    }
  });

//*  GET specific category
eventRouter
  .route('/category/:id')
  .all(requireAuth)
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await EventService.getSpecificCategory(
        req.app.get('db'),
        id
      );
      res.json(category);
    } catch (error) {
      console.log(error);
    }
  })
  //* DELETE specific category
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoryToDelete = await EventService.deleteCategory(
        req.app.get('db'),
        id
      );
      console.log('deleting ', categoryToDelete);
      res.end();
    } catch (error) {
      console.log(error);
    }
  })
  //* PATCH specific category
  .patch(jsonBodyParser, async (req, res, next) => {
    try {
      const { id } = req.params;

      const { real_name, encoded_name, icon, color } = req.body;

      const updatedCategoryObject = {
        real_name,
        encoded_name,
        icon,
        color,
      };

      // Check to see if any values have been updated, otherwise no need to fetch Patch
      const numberOfValues = Object.values(updatedCategoryObject).filter(
        Boolean
      ).length;

      if (numberOfValues === 0) {
        logger.error('nothing has changed, patch not needed');
        return res.status(400).json({
          error: {
            message: 'Request body must contain a changed value',
          },
        });
      }

      // Validate all fields have values
      for (const [key, value] of Object.entries(updatedCategoryObject))
        if (value === null) {
          logger.error(`Missing ${key} in request body`);
          return res.status(400).json({
            error: `Missing ${key} in request body`,
          });
        }

      // Set the user Id for the updated event
      updatedCategoryObject.user_id = req.user.id;

      // Update the event in the database
      const updatedCategory = await EventService.updateCategory(
        req.app.get('db'),
        id,
        updatedCategoryObject
      );
      res.json(updatedCategory);
      //
    } catch (error) {
      console.log(error);
    }
  });

eventRouter.route('/testing').patch(jsonBodyParser, (req, res, next) => {
  try {
    const body = req.body;
    const bodyLength = Object.keys(body).length;

    const numberOfValues = Object.values(body).filter(Boolean).length;

    res.send(`${bodyLength} - ${numberOfValues}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = eventRouter;
