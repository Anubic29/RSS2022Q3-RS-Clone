const express = require('express');
const User = require('../models/User');
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

router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/info', async (req, res) => {
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

router.get('/:id/noted', async (req, res) => {
  try {
    if (isNaN(+req.params.id)) throw new Error('Incorrect id');

    const user = (await User.find({ id: +req.params.id }))[0];
    if (!user) throw new Error('Not found');

    res.json(user.notedItems);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Post Methods

router.post('/', async (req, res) => {
  try {
    if (!isCorrectUserInfo(req.body)) throw new Error('Not found property');

    const users = await User.find({})
    const maxId = Math.max(...users.map(user => user.id), 0)

    const user = new User({
      id: maxId + 1,
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

router.post('/:id/noted', async (req, res) => {
  try {
    if (isNaN(+req.params.id)) throw new Error('Incorrect id');
    if (!isCorrectUserNoted(req.body)) throw new Error('Not found property');

    const user = (await User.find({ id: +req.params.id }))[0];
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

router.put('/:id/info', async (req, res) => {
  try {
    if (isNaN(+req.params.id)) throw new Error('Incorrect id');
    if (!isCorrectUserInfo(req.body)) throw new Error('Not found property');

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


// Delete Methods

router.delete('/:id/info', async (req, res) => {
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

router.delete('/:id/noted/:notedId', async (req, res) => {
  try {
    if (isNaN(+req.params.id)) throw new Error('Incorrect id');

    const user = (await User.find({ id: +req.params.id }))[0];
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