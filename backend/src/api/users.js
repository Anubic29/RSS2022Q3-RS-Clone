const express = require('express');
const User = require('../models/User');
const Project = require('../models/Project');
const authenticateToken = require('../func/authenticateToken');
const getRandomBrightColor = require('../utils/getRandomBrightColor');
const router = express.Router();

const postUserProperties = ['firstName', 'lastName', 'email', 'password'];

const detailsProps = ['_id', 'firstName', 'lastName', 'email', 'color'];

// Get Methods

router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find({});
    let userList = users.map((data) => {
      return {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        color: data.color
      };
    });
    if (req.query['no-project']) {
      const project = await Project.findOne({ _id: req.query['no-project'] });
      if (project) {
        userList = userList.filter((user) => !project.team.includes(user._id.toString()) && project.author !== user._id.toString());
      }
    }
    if (req.query.value) {
      userList = userList.filter((data) => `${data.firstName} ${data.lastName}`.includes(req.query.value) || data.email.includes(req.query.value));
    } else {
      if (req.query.email) {
        userList = userList.filter((data) => data.email.includes(req.query.email));
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

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw new Error('Not found user');

    const data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      color: user.color
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Post Methods

router.post('/', async (req, res) => {
  try {
    const values = {};
    const error = [];

    postUserProperties.forEach((property) => {
      if (typeof req.body[property] !== 'string') error.push(`Property ${property} is of the wrong type`);
      else if (req.body[property].trim() === '') error.push(`Property ${property} can't be empty`);
      values[property] = req.body[property];
    });
    if (error.length) throw new Error(`${error.join('. ')}.`);

    const users = await User.find({ email: req.body.email })
    if (users.length > 0) return res.status(412).send('Email already used!');

    const user = new User({
      ...values,
      color: getRandomBrightColor(),
      coverBlock: getRandomBrightColor(),
      notedItems: [],
      jobTitleInfo: 'Job name',
      departmentInfo: 'Department',
      organizationInfo: 'Organization',
      locationInfo: 'Location'
    });

    await user.save();
    res.json(user._id);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/details', authenticateToken, async (req, res) => {
  try {
    const list = req.body.list;
    if (!list || !Array.isArray(list)) throw new Error('Not found list');

    const users = await Promise.all(list.map(async (id) => {
      const user = await User.findOne({ _id: id });
      if (!user) throw new Error('Not found user');
      const resUser = {};
      Object.keys(user._doc)
        .filter((key) => detailsProps.includes(key))
        .forEach((key) => resUser[key] = user[key]);
      return resUser;
    }));

    res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


module.exports = router;