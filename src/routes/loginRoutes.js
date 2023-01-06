const express = require('express')
const validatePassword = require('../middlewares/validations/validatePassword');
const validateEmail = require('../middlewares/validations/validateEmail');
const generateId = require('../utils/generateId') 

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, (req, res) => {
    const token = generateId();
    return res.status(200).json({token: `${token}`});
});


module.exports = loginRouter;