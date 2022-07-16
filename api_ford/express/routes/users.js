const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controller");

router.route("/").get(usersController.getAllUsers);
router.route("/signup").post(usersController.createNewUser);
router.route("/signin").post(usersController.verifyUser);

router
  .route("/u/:id")
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = router;
