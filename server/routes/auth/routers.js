const {register, login} = require('../../controllers/auth/user.controler')
const express = require('express'); 
const router = express.Router(); 

router.post("/register", register);
router.post("/login", login)

module.exports = router