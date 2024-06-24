const creatorError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports.create = (req, res, next) => {
  const { email, password, username } = req.body;

  User.create({ email, password, username })
    .then((userCreated) => {
      res.status(204).json(userCreated);
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
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
};

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
