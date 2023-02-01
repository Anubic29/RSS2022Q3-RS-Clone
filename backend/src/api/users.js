const express = require('express');
const User = require('../models/User');
const router = express.Router();

function isCorrectUser(body) {
  return typeof body.firstName === 'string' 
    && typeof body.lastName === 'string' 
    && typeof body.mail === 'string' 
    && typeof body.password === 'string';
}

router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (isNaN(+req.params.id)) throw new Error('Incorrect id');

    const user = (await User.find({ id: +req.params.id }))[0];
    if (!user) throw new Error('Not found');

    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/', async (req, res) => {
  try {
    if (!isCorrectUser(req.body)) throw new Error('Not found property');

    const users = await User.find({})
    const maxId = Math.max(...users.map(user => user.id), 0)

    const user = new User({
      id: maxId + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mail: req.body.mail,
      password: req.body.password
    })

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (isNaN(+req.params.id)) throw new Error('Incorrect id');
    if (!isCorrectUser(req.body)) throw new Error('Not found property');

    const user = (await User.find({ id: +req.params.id }))[0];
    if (!user) throw new Error('Not found user');

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.mail = req.body.mail;
    user.password = req.body.password;

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (isNaN(+req.params.id)) throw new Error('Incorrect id');

    const user = (await User.find({ id: +req.params.id }))[0];
    if (!user) throw new Error('Not found')

    await User.deleteOne({ _id: user._id });
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

module.exports = router;