const express = require('express');
const router = express.Router();
const{
    register,
    login
}=require("../controllers/User")

router.get('/', (req, res) => {
    res.send('User routes are working!');
});

router.post('/register', register);
router.post('/login', login);



// register a user
// login a user
module.exports = router;