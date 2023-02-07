require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

function generateAccessToken(object) {
  return jwt.sign(object, process.env.ACCESS_TOKEN_SECRET)
}

router.post('/', async (req, res) => {
  const user = {
    mail: req.body.mail,
    password: req.body.password
  }
  const parsedData = await User.find({ mail: user.mail, password: user.password });
  if (parsedData.length === 1) {
    const accessToken = generateAccessToken(user);
    res.json(accessToken);
  } else {
    res.sendStatus(400);
  }
})

module.exports = router;
