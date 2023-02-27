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
    if (!user) throw new Error('Not found User');

    res.json(user.notedItems);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/recent', authenticateToken, async (req, res) => {
  try {
    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found User');

    res.json(user.recentProjects);
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

router.post('/:id/recent', authenticateToken, async (req, res) => {
  try {
    if (typeof req.body.projectId !== 'string' || req.body.projectId.trim().length === 0) throw new Error('Not found property projectId');
  
    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found User');
    
    if (user.recentProjects.includes(req.body.projectId)) {
      user.recentProjects.splice(user.recentProjects.findIndex((data) => data === req.body.projectId), 1);
      user.recentProjects.unshift(req.body.projectId);
    } else {
      user.recentProjects.unshift(req.body.projectId);
    }

    if (user.recentProjects.length > 5) user.recentProjects.length = 5;

    await user.save();
    res.json(user.recentProjects);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Put Methods

router.put('/:id/info', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectUserInfo(req.body)) throw new Error('Not found property');
    if (typeof req.body.jobTitleInfo !== 'string') throw new Error('Not found property jobTitleInfo');
    if (typeof req.body.departmentInfo !== 'string') throw new Error('Not found property departmentInfo');
    if (typeof req.body.organizationInfo !== 'string') throw new Error('Not found property organizationInfo');
    if (typeof req.body.locationInfo !== 'string') throw new Error('Not found property locationInfo');
    if (typeof req.body.coverBlock !== 'string') throw new Error('Not found property coverBlock');

    const user = (await User.find({ _id: req.params.id }))[0];
    if (!user) throw new Error('Not found user');

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.mail = req.body.mail;
    user.password = req.body.password;

    user.jobTitleInfo = req.body.jobTitleInfo;
    user.departmentInfo = req.body.departmentInfo;
    user.organizationInfo = req.body.organizationInfo;
    user.locationInfo = req.body.locationInfo;
    user.coverBlock = req.body.coverBlock;

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
    if (idx >= 0) {
      user.notedItems.splice(idx, 1);
  
      await user.save();
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


module.exports = router;