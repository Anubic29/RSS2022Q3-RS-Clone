const express = require('express');
const Project = require('../models/Project');
const User = require('../models/User');
const authenticateToken = require('../func/authenticateToken');
const router = express.Router();

function isCorrectProjectInfo(body) {
  return typeof body.title === 'string' 
    && body.title !== ''
    && typeof body.description === 'string' 
    && typeof body.color === 'string' 
    && body.color !== ''
    && typeof body.key === 'string' 
    && body.key !== ''
    && typeof body.author === 'string'
    && body.author !== ''
    && typeof body.pathImage === 'string'
    && body.pathImage !== '';
}

const valuesColumnType = ['common', 'final'];
function isCorrectProjectColumn(body) {
  return typeof body.title === 'string' && valuesColumnType.indexOf(body.type) >= 0; 
}


// Get Methods

router.get('/', authenticateToken, async (req, res) => {
  try {
    let projects = await Project.find({});
    if (req.query.user) {
      projects = projects.filter((project) => project.author === req.query.user || project.team.includes(req.query.user));
    }
    if (req.query.author) {
      projects = projects.filter((project) => project.author === req.query.author);
    }
    res.json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/info', authenticateToken, async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/columns', authenticateToken, async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    res.json(project.columnList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Post Methods

router.post('/', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectProjectInfo(req.body)) throw new Error('Not found property');

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      key: req.body.key,
      color: req.body.color,
      boardTitle: `Board ${req.body.title}`,
      author: req.body.author,
      team: [],
      pathImage: req.body.pathImage,
      columnList: [],
    });

    project.columnList.push({
      title: "dev",
      type: "common"
    });

    project.columnList.push({
      title: "done",
      type: "final"
    });

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/:id/team', authenticateToken, async (req, res) => {
  try {
    if (typeof req.body.userId !== 'string' && req.body.userId === '') throw new Error('Not found property');

    const user = (await User.find({ _id: req.body.userId }))[0]
    if (!user) throw new Error('Not found user');
    
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    project.team.push(user._id);

    await project.save();
    res.json(project.team);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/:id/columns', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectProjectColumn(req.body)) throw new Error('Not found property');

    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    project.columnList.push({
      title: req.body.title,
      type: req.body.type
    });

    await project.save();
    res.json(project.columnList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Put Methods

router.put('/:id/info', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectProjectInfo(req.body) || typeof req.body.boardTitle !== 'string' || req.body.boardTitle === '') throw new Error('Not found property');

    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    project.title = req.body.title;
    project.description = req.body.description;
    project.boardTitle = req.body.boardTitle;
    project.color = req.body.color;
    project.key = req.body.key;
    project.author = req.body.author;
    project.pathImage = req.body.pathImage;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.put('/:id/change-admin', authenticateToken, async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found Project');

    if (!project.team.includes(req.body.userId)) throw new Error('Not found user in team');

    const admin = project.author;

    project.author = req.body.userId;
    project.team.splice(project.team.findIndex((data) => data === req.body.userId), 1, admin);

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.put('/:id/columns', authenticateToken, async (req, res) => {
  try {
    if (!req.body.columnList) throw new Error('Not found property');
    req.body.columnList.forEach((column, idx) => {
      if (!isCorrectProjectColumn(column)) throw new Error(`Incorrect column #${idx}`);
    });

    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    project.columnList = req.body.columnList;

    await project.save();
    res.json(project.columnList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.put('/:id/columns/:columnId', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectProjectColumn(req.body)) throw new Error('Not found property');

    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    const idx = project.columnList.findIndex((column) => column._id.toString() === req.params.columnId);
    if (idx < 0) throw new Error('Not found column');

    project.columnList[idx].title = req.body.title;
    project.columnList[idx].type = req.body.type;

    await project.save();
    res.json(project.columnList[idx]);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Delete Methods

router.delete('/:id/info', authenticateToken, async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found');

    await Project.deleteOne({ _id: project._id });
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/:id/team/:userId', authenticateToken, async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    const idx = project.team.indexOf(req.params.userId);
    if (idx < 0) throw new Error('Not found column');

    project.team.splice(idx, 1);

    await project.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/:id/columns/:columnId', authenticateToken, async (req, res) => {
  try {
    const project = (await Project.find({ _id: req.params.id }))[0];
    if (!project) throw new Error('Not found project');

    const idx = project.columnList.findIndex((column) => column._id.toString() === req.params.columnId);
    if (idx < 0) throw new Error('Not found column');

    project.columnList.splice(idx, 1);

    await project.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


module.exports = router;