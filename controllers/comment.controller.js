const Comment = require("../models/Comment.model")

module.exports.doComment = (req, res, next) => {
    const { filmId } = req.params
    const { currentUserId } = req
    const { title, comment  } = req.body

    return Comment.create({ user: currentUserId, filmId, comment, title })
    .then(newComment => res.status(201).json(newComment))
    .catch(err => next(err)); // Manejo de errores

}

module.exports.getCommentsForFilm = (req, res, next) => {
    const {filmId} = req.params

Comment.find({ filmId })
  .populate('user', 'userName imgUrl')  // Poblamos el campo `user` para obtener el nombre del usuario
  .then(comments => {
    res.json(comments);
  })
  .catch(error => {
    next(error);  // Manejo de errores
  });
};