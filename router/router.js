const router = require("express").Router()
//const filmsController = require("../controllers/films.controller")
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller")
const authMiddlewares = require("../middlewares/auth.middlewares")

//users
router.post("/users", userController.create)
router.get("/users", userController.list)
router.get("/users/:id", userController.getUser)
router.get("/users/me", authMiddlewares.isAuthenticated, userController.getCurrentUser)

//films






//auth
router.post("/login", authController.login);

module.exports = router