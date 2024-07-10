const router = require("express").Router()
const multer = require("../config/storage.config")
//const filmsController = require("../controllers/films.controller")
const authController = require("../controllers/auth.controller")
const likeController = require("../controllers/like.controller")
const userController = require("../controllers/user.controller")
const authMiddlewares = require("../middlewares/auth.middlewares")
const commentController = require("../controllers/comment.controller")
const watchListController = require("../controllers/watchList.controller")

//users
router.post("/users", multer.single("imgUrl"), userController.create)
router.get("/users/me", authMiddlewares.isAuthenticated, userController.getCurrentUser)
router.put("/users/me", authMiddlewares.isAuthenticated, multer.single("imgUrl"), userController.update);
/* router.get("/users/:id", userController.getUser) */

//like
router.post("/films/:externalItemId/like", authMiddlewares.isAuthenticated, likeController.doLike )
router.get("/likes/me", authMiddlewares.isAuthenticated, likeController.getMyLikes)

//auth
router.post("/login", authController.login);

//comment
router.post("/films/:filmId/comment", authMiddlewares.isAuthenticated, commentController.doComment)
router.get("/films/:filmId/comment", authMiddlewares.isAuthenticated, commentController.getCommentsForFilm)

//watchList
router.post("/films/:externalItemId/watchList", authMiddlewares.isAuthenticated, watchListController.addOrRemoveFromWatchlist )
router.get("/watchList/me", authMiddlewares.isAuthenticated, watchListController.getMyWatchlist)

module.exports = router