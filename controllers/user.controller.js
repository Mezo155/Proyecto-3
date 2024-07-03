const creatorError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model")

module.exports.create = (req, res, next) => {
  const {userName, email, password} = req.body;

  User.create({userName, email, password})
    .then((userCreated) => {
      res.status(201).json(userCreated);
    })
    .catch(next);
};

/* module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(createError(402, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
}; */

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .then((user) => {
      if (!user) {
        next(createError(402, "User not found"));
      } else {
        res.json(user);
      }
    })
    .catch(next);
};
