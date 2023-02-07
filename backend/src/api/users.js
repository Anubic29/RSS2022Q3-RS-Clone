const express = require('express');
const User = require('../models/User');
const authenticateToken = require('../func/authenticateToken');
const router = express.Router();

function isCorrectUserInfo(body) {
  return typeof body.firstName === 'string' 
    && typeof body.lastName === 'string' 
    && typeof body.mail === 'string' 
    && typeof body.password === 'string';
}

const valuesNotedType = ['board', 'project']
function isCorrectUserNoted(body) {
  return typeof body.id === 'string' && valuesNotedType.indexOf(body.type) >= 0; 
}


// Get Methods

router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/current', authenticateToken, async (req, res) => {
  try {
    const user = (await User.find({ mail: req.user.mail, password: req.user.password }))[0];
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/info', authenticateToken, async (req, res) => {
  try {
    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found');

    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/noted', authenticateToken, async (req, res) => {
  try {
    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found');

    res.json(user.notedItems);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Post Methods

router.post('/', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectUserInfo(req.body)) throw new Error('Not found property');

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mail: req.body.mail,
      password: req.body.password,
      notedItems: [],
    });

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/:id/noted', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectUserNoted(req.body)) throw new Error('Not found property');

    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found');

    user.notedItems.push({
      id: req.body.id,
      type: req.body.type
    });

    await user.save();
    res.json(user.notedItems);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Put Methods

router.put('/:id/info', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectUserInfo(req.body)) throw new Error('Not found property');

    const user = (await User.find({ _id: req.params.id }))[0];
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


// Delete Methods

router.delete('/:id/info', authenticateToken, async (req, res) => {
  try {
    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found')

    await User.deleteOne({ _id: user._id });
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/:id/noted/:notedId', authenticateToken, async (req, res) => {
  try {
    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found')

    const idx = user.notedItems.findIndex((notedItems) => notedItems.id === req.params['notedId']);
    if (idx < 0) throw new Error('Not found noted')

    user.notedItems.splice(idx, 1);

    await user.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


module.exports = router;