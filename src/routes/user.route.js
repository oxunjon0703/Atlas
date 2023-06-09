const {Router} = require("express");
const { register, login, userGet } = require("../controllers/user.controller");
const isUser = require("../middleware/isUser");

const router = Router();

router.post("/register", register);
router.get("/login", userGet);
router.post("/login", login);

module.exports = router;