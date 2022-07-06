const router = require('express').Router();

const Controller = require("../controllers/authC.js")
const errorHandler = require('../middleware/error_handler.js');

router.post('/signup',errorHandler(Controller.signUpUser));
router.post('/verify',errorHandler( Controller.verifyEmail));

module.exports = router;