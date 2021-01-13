const express = require("express");

const WidgetService = require("./widget-service");

const widgetRouter = express.Router();
const jsonBodyParser = express.json();

//* GET all widgets
widgetRouter.route("/").get(async (req, res, next) => {
  try {
    const widgets = await WidgetService.getAllWidgets(req.app.get("db")); // array of objects

    res.json(widgets);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* GET specific widget
widgetRouter
  .route("/single/:id")
  .get(async (req, res, next) => {
    try {
      const { id } = req.params;
      const widget = await WidgetService.getSpecificWidget(
        req.app.get("db"),
        id
      );

      res.json(widget);
    } catch (error) {
      console.log(error);
    }
  })
  //* DELETE specific widget
  .delete(async (req, res, next) => {
    try {
      const { id } = req.params;
      const widgetToDelete = await WidgetService.deleteWidget(
        req.app.get("db"),
        id
      );
      res.end();
    } catch (error) {
      console.log(error);
    }
  })
  .patch(jsonBodyParser, async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedWidgetName = { name };

    const updatedWidget = await WidgetService.updateWidget(
      req.app.get("db"),
      id,
      updatedWidgetName
    );
    res.json(updatedWidget);
  });

//* GET random widget
widgetRouter.route("/random").get(async (req, res, next) => {
  try {
    const randomWidget = await WidgetService.getRandomWidget(req.app.get("db"));
    res.json(randomWidget);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//* Test widget
widgetRouter.route("/test").get((req, res) => {
  try {
    res.send("test");
  } catch (error) {
    console.log(error);
  }
});

//* POST new widget
widgetRouter.route("/").post(jsonBodyParser, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newWidget = { name };

    const insertWidget = await WidgetService.insertWidget(
      req.app.get("db"),
      newWidget
    );

    res.status(201).json(insertWidget);
  } catch (error) {
    console.log(error);
  }
});

module.exports = widgetRouter;
