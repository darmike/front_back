module.exports = app => {
  const trains = require("../controllers/train.controller.js");

  var router = require("express").Router();

  // Create a new Train
  router.post("/", trains.create);

  // Retrieve all Trains
  router.get("/", trains.findAll);

  // Retrieve a single Train with id
  router.get("/:id", trains.findOne);

  // Update a Train with id
  router.put("/:id", trains.update);

  // Delete a Train with id
  router.delete("/:id", trains.delete);

  // Create a new Train
  router.delete("/", trains.deleteAll);

  app.use("/api/trains", router);
};
