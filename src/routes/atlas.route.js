const {Router} = require("express");
const {atlas} = require("../controllers/atlas.controlle")
const isUser = require("../middleware/isUser");

const router = Router();

router.get("/atlas",isUser, atlas);

module.exports = router;