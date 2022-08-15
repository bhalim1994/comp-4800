const express = require("express");
const usersController = require("../controllers/users.controller.js");

const router = express.Router();

router.post("/", usersController.createUser);

router.get("/:userId", usersController.getUser);

router.get("/", usersController.getUsers);

router.patch("/:userId", usersController.updateUser);

router.delete("/:userId", usersController.deleteUser);

module.exports = router;
