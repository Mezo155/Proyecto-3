const router = require("express").Router()
//const filmsController = require("../controllers/films.controller")
const authController = require("../controllers/auth.controller")
const likeController = require("../controllers/like.controller")
const userController = require("../controllers/user.controller")
const authMiddlewares = require("../middlewares/auth.middlewares")

//users
router.post("/users", userController.create)
router.get("/users", userController.list)
router.get("/users/me", authMiddlewares.isAuthenticated, userController.getCurrentUser)
router.get("/users/:id", userController.getUser)

//like
router.post("/films/:id", authMiddlewares.isAuthenticated, likeController.doLike )

//auth
router.post("/login", authController.login);

module.exports = router