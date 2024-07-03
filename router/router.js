const router = require("express").Router()
//const filmsController = require("../controllers/films.controller")
const authController = require("../controllers/auth.controller")
const likeController = require("../controllers/like.controller")
const userController = require("../controllers/user.controller")
const authMiddlewares = require("../middlewares/auth.middlewares")
const commentController = require("../controllers/comment.controller")

//users
router.post("/users", userController.create)
/* router.get("/users", userController.list) */
router.get("/users/me", authMiddlewares.isAuthenticated, userController.getCurrentUser)
/* router.get("/users/:id", userController.getUser) */

//like
router.post("/films/:externalItemId/like", authMiddlewares.isAuthenticated, likeController.doLike )
router.get("/likes/me", authMiddlewares.isAuthenticated, likeController.getMyLikes)

//auth
router.post("/login", authController.login);

//comment
router.post("/films/:filmId/comment", authMiddlewares.isAuthenticated, commentController.doComment)
router.get("/films/:filmId/comment", authMiddlewares.isAuthenticated, commentController.getCommentsForFilm)

module.exports = router