const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users-controller");

router.get("/", usersController.getAllUsers);

router
  .route("/:id")
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = router;
