const express = require('express');
const router = express.Router();
const userControllers = require('../../controllers/user/user');
const {verifyJWT, verifyUpdateUserBody} = require('../../middleware/middleware');

router.get("/", verifyJWT, userControllers.getUser);
router.get("/todos", verifyJWT, userControllers.getUserTodos);
router.get("/:id", verifyJWT, userControllers.getUserById);
router.put("/:id", verifyJWT, verifyUpdateUserBody, userControllers.updateUser);
router.delete("/:id", verifyJWT, userControllers.deleteUser);

module.exports = router;