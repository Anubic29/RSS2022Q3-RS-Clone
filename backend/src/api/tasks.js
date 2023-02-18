const express = require('express');
const Task = require('../models/Task');
const authenticateToken = require('../func/authenticateToken');
const router = express.Router();

function isCorrectTaskInfo(body) {
  return typeof body.title === 'string' 
    && body.title !== ''
    && typeof body.description === 'string'
    && typeof body.author === 'string'
    && body.author !== ''
    && typeof body.projectId === 'string'
    && body.projectId !== ''
    && typeof body.columnId === 'string'
    && body.columnId !== ''
    && typeof body.executor === 'string';
}

function isCorrectTaskComment(body) {
  return typeof body.text === 'string' 
    && body.text !== ''
    && typeof body.author === 'string'
    && body.author !== ''
    && typeof body.date === 'string'
    && body.date !== '';
}


// Get Methods

router.get('/', authenticateToken, async(req, res) => {
  try {
    let tasks = await Task.find({});
    if (req.query.author) {
      tasks = tasks.filter((tasks) => tasks.author === req.query.author);
    }
    if (req.query.executor) {
      tasks = tasks.filter((tasks) => tasks.executor === req.query.executor);
    }
    if (req.query.project) {
      tasks = tasks.filter((tasks) => tasks.projectId === req.query.project);
    }
    if (req.query.column) {
      tasks = tasks.filter((tasks) => tasks.columnId === req.query.column);
    }
    res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/info', authenticateToken, async(req, res) => {
  try {
    const task = await Task.find({ _id: req.params.id });
    if (!task) throw new Error('Not found');

    res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/comments', authenticateToken, async(req, res) => {
  try {
    const task = await Task.find({ _id: req.params.id });
    if (!task) throw new Error('Not found');

    res.json(task.commentList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Post Methods

router.post('/', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectTaskInfo(req.body)) throw new Error('Not found property');

    const maxId = Math.max(...(await Task.find({ projectId: req.body.projectId })).map((task) => task.id), 0)

    const task = new Task({
      id: maxId + 1,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      executor: req.body.executor,
      projectId: req.body.projectId,
      columnId: req.body.columnId,
      commentList: []
    });

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.post('/:id/comments', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectTaskComment(req.body)) throw new Error('Not found property');

    const task = (await Task.find({ _id: req.params.id }))[0];
    if (!task) throw new Error('Not found');

    task.commentList.push({
      text: req.body.text,
      author: req.body.author,
      date: req.body.date,
      dateUpdate: req.body.date
    });

    await task.save();
    res.json(task.commentList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Put Methods

router.put('/:id/info', authenticateToken, async (req, res) => {
  try {
    if (!isCorrectTaskInfo(req.body)) throw new Error('Not found property');

    const task = (await Task.find({ _id: req.params.id }))[0];
    if (!task) throw new Error('Not found');

    task.title = req.body.title;
    task.description = req.body.description;
    task.author = req.body.author;
    task.executor = req.body.executor;
    task.projectId = req.body.projectId;
    task.columnId = req.body.columnId;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.put('/:id/comments/:commentId', authenticateToken, async (req, res) => {
  try {
    if (typeof req.body.text !== 'string' || req.body.text === '') throw new Error('Not found property text');
    if (typeof req.body.dateUpdate !== 'string' || req.body.dateUpdate === '') throw new Error('Not found property dateUpdate');
    
    const task = (await Task.find({ _id: req.params.id }))[0];
    if (!task) throw new Error('Not found task');

    const comment = task.commentList.find((data) => data._id.toString() === req.params.commentId);
    if (!comment) throw new Error('Not found comment');

    comment.text = req.body.text;
    comment.dateUpdate = req.body.dateUpdate;

    await task.save();
    res.json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.put('/by-column', authenticateToken, async(req, res) => {
  try {
    if (!typeof req.body.currId === 'string' || !req.body.currId) throw new Error('Not found property currId');
    if (!typeof req.body.newId === 'string' || !req.body.newId) throw new Error('Not found property newId');

    const tasks = await Task.find({ columnId: req.body.currId })
    if (!tasks) throw new Error('Not found tasks');

    tasks.forEach(async (task) => {
      task.columnId = req.body.newId;
      await task.save();
    })

    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Delete Methods

router.delete('/:id/info', authenticateToken, async (req, res) => {
  try {
    const task = (await Task.find({ _id: req.params.id }))[0];
    if (!task) throw new Error('Not found');

    await Task.deleteOne({ _id: task._id });
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/:id/comments/:commentId', authenticateToken, async (req, res) => {
  try {
    const task = (await Task.find({ _id: req.params.id }))[0];
    if (!task) throw new Error('Not found task');

    const idx = task.commentList.findIndex((comment) => comment._id.toString() === req.params.commentId);
    if (idx < 0) throw new Error('Not found comment');

    task.commentList.splice(idx, 1);

    await task.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/by-column/:columnId', authenticateToken, async (req, res) => {
  try {
    await Task.deleteMany({ columnId: req.params.columnId });
    res.json(true);
  } catch(error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.delete('/by-project/:projectId', authenticateToken, async (req, res) => {
  try {
    await Task.deleteMany({ projectId: req.params.projectId });
    res.json(true);
  } catch(error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


module.exports = router;