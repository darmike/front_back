const db = require("../models");
const Train = db.trains;

// Create and Save a new train
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a train
  const newTrain = new Train({
    name: req.body.name,
    from: req.body.from,
    to: req.body.to,
    time: req.body.time
  });
 
  // Save train in the database
  newTrain
    .save(newTrain)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the train."
      });
    });
};

// Retrieve all trains from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Train.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trains."
      });
    });
};

// Find a single train with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Train.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found train with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving train with id=" + id });
    });
};

// Update a train by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Train.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update train with id=${id}. Maybe train was not found!`
        });
      } else res.send({ message: "train was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating train with id=" + id
      });
    });
};

// Delete a train with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Train.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete train with id=${id}. Maybe train was not found!`
        });
      } else {
        res.send({
          message: "train was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete train with id=" + id
      });
    });
};

// Delete all trains from the database.
exports.deleteAll = (req, res) => {
  Train.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} trains were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trains."
      });
    });
};