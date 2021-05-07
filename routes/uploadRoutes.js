const { Router } = require("express");
const { route } = require("./authRoutes");
const store = require('../middleware/multer');
const uploadController = require("../controllers/uploadController");

const router = Router();

// router.get("/signup", authController.signup_get);
// router.post("/signup", authController.signup_post);
// router.get("/login", authController.login_get);
// router.post("/login", authController.login_post);
// router.get("/logout", authController.logout_get);
router.post("/uploadquery", store.images , uploadController.uploads )// name of input tag name

module.exports = router;
