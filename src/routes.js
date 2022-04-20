const express = require("express");
const mustache = require("mustache-express");
const router = express.Router();

// Validators
const AuthValidator = require("./validators/Auth.validator");

// Middleware
const AuthMiddleware = require("../src/middleware/Auth.middleware");

// FrontEnd Routes
const PageController = require("../src/controllers/Page.controller");

// Routes
const AuthController = require("../src/controllers/Auth.cotroller");
const UserController = require("../src/controllers/User.controller");
const MovieCotroller = require("../src/controllers/Movie.controller");
const YoutubeController = require("../src/controllers/Youtube.controller");

router.get("/ping", (req, res) => {
  res.json({ success: "pig and pong successfuly" });
});

// Auth Route
router.post("/signin", AuthValidator.signin, AuthController.signin);
router.post("/signup", AuthValidator.signup, AuthController.signup);

// FrontEnd Route
router.get("/", PageController.home);

// User Route
router.post("/users", UserController.insert_data);
router.get("/users", AuthMiddleware.private, UserController.get_all);
router.get("/users/:id", AuthMiddleware.private, UserController.get_by_id);
router.put("/users/:id", AuthMiddleware.private, UserController.update_data);
router.delete("/users/:id", AuthMiddleware.private, UserController.delete_data);

// YouTube Route
//router.get("/youtube/item", MovieCotroller.get_all);
router.get("/youtubeFake", AuthMiddleware.private, YoutubeController.get_name);

module.exports = router;
