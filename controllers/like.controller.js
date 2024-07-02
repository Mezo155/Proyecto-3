const Like = require('../models/Like.model');

module.exports.doLike = (req, res, next) => {
  const { externalItemId } = req.params;
  const { currentUserId} = req;
  console.log("*******", currentUserId, externalItemId)
  // Verificar si el usuario ya ha dado "like" a este ítem
  Like.findOne({ currentUserId, externalItemId })
    .then((existingLike) => {
      if (existingLike) {
        // Si ya existe un "like", eliminarlo
        return Like.findByIdAndDelete(existingLike._id)
          .then(() => res.status(200).json({ message: 'Like removed' }))
          .catch(err => next(err)); // Manejo de errores
      } else {
        // Si no existe un "like", crear uno nuevo
        return Like.create({ userId: currentUserId, externalItemId })
          .then(newLike => res.status(201).json(newLike))
          .catch(err => next(err)); // Manejo de errores
      }
    })
    .catch(err => next(err)); // Manejo de errores
};

module.exports.getMyLikes = (req, res, next) => {
  Like.find({userId: req.currentUserId})
  .then((myLikes) => {
    res.json(myLikes)
  })
  .catch(err => next(err))
}
