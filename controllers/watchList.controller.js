const Watchlist = require('../models/Watch.model');

module.exports.addOrRemoveFromWatchlist = (req, res, next) => {
  const { externalItemId } = req.params;
  const { currentUserId } = req;
  console.log("Solicitud recibida", currentUserId, externalItemId);

  // Verificar si la película ya está en la watchlist del usuario
  Watchlist.findOne({ userId: currentUserId, externalItemId })
    .then((existingEntry) => {
      if (existingEntry) {
        console.log("Película ya en watchlist, eliminando...");
        return Watchlist.findByIdAndDelete(existingEntry._id)
          .then(() => {
            console.log("Película eliminada de la watchlist");
            res.status(200).json({ message: 'Película eliminada de la watchlist' });
          })
          .catch(err => {
            console.error("Error eliminando de la watchlist:", err);
            next(err);
          });
      } else {
        console.log("Película no en watchlist, añadiendo...");
        return Watchlist.create({ userId: currentUserId, externalItemId })
          .then(newEntry => {
            console.log("Película añadida a la watchlist:", newEntry);
            res.status(201).json({ newEntry, message: 'Película añadida a la watchlist' });
          })
          .catch(err => {
            console.error("Error añadiendo a la watchlist:", err);
            next(err);
          });
      }
    })
    .catch(err => {
      console.error("Error encontrando en la watchlist:", err);
      next(err);
    });
};

module.exports.getMyWatchlist = (req, res, next) => {
  Watchlist.find({ userId: req.currentUserId })
    .then((myWatchlist) => {
      res.status(200).json(myWatchlist);
    })
    .catch(err => next(err));
};
