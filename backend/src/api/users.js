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

const valuesNotedType = ['task', 'project']
function isCorrectUserNoted(body) {
  return typeof body.id === 'string' && valuesNotedType.indexOf(body.type) >= 0; 
}


// Get Methods

router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({})
    let userList = users.map((data) => {
      return {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        mail: data.mail
      };
    });
    if (req.query.value) {
      userList = userList.filter((data) => `${data.firstName} ${data.lastName}`.includes(req.query.value) || data.mail.includes(req.query.value));
    } else {
      if (req.query.mail) {
        userList = userList.filter((data) => data.mail.includes(req.query.mail));
      }
      if (req.query.fullname) {
        userList = userList.filter((data) => `${data.firstName} ${data.lastName}`.includes(req.query.fullname));
      }
    }
    if (req.query.limit && !Number.isNaN(+req.query.limit)) {
      userList = userList.slice(0, +req.query.limit);
    }
    res.json(userList);
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

    const data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mail: user.mail
    }

    res.json(data);
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

router.post('/', async (req, res) => {
  try {
    if (!isCorrectUserInfo(req.body)) throw new Error('Not found property');

    const users = await User.find({ mail: req.body.mail })
    if (users.length > 0) {
      return res.status(412).send('Mail already used!');
    }

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