const Like = require('../models/Like.model');

module.exports.doLike = (req, res, next) => {
  const { externalItemId } = req.params;
  const { currentUserId} = req;
  console.log("solicitud recibida", currentUserId, externalItemId)
  // Verificar si el usuario ya ha dado "like" a este ítem
  Like.findOne({ userId: currentUserId, externalItemId })
  .then((existingLike) => {
    if (existingLike) {
      console.log("Like exists, removing...");
      return Like.findByIdAndDelete(existingLike._id)
        .then(() => {
          console.log("Like removed");
          res.status(200).json({ message: 'Like removed' });
        })
        .catch(err => {
          console.error("Error removing like:", err);
          next(err);
        });
    } else {
      console.log("Like does not exist, adding...");
      return Like.create({ userId: currentUserId, externalItemId })
        .then(newLike => {
          console.log("Like added:", newLike);
          res.status(201).json({ newLike, message: 'Like added' });
        })
        .catch(err => {
          console.error("Error adding like:", err);
          next(err);
        });
    }
  })
  .catch(err => {
    console.error("Error finding like:", err);
    next(err);
  });
};

module.exports.getMyLikes = (req, res, next) => {
  Like.find({userId: req.currentUserId})
  .then((myLikes) => {
    res.status(200).json(myLikes)
  })
  .catch(err => next(err))
}
