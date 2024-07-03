const Comment = require("../models/Comment.model")

module.exports.doComment = (req, res, next) => {
    const { filmId } = req.params
    const { currentUserId } = req
    const { comment, title } = req.body

    return Comment.create({ user: currentUserId, filmId, comment, title })
    .then(newComment => res.status(201).json(newComment))
    .catch(err => next(err)); // Manejo de errores

}