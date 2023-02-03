const express = require('express');
const Task = require('../models/Task');
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
    && body.date instanceof Date;
}


// Get Methods

router.get('/', async(req, res) => {
  try {
    const tasks = await Task.find({})
    res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/info', async(req, res) => {
  try {
    const task = await Task.find({ _id: req.params.id });
    if (!task) throw new Error('Not found');

    res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});

router.get('/:id/comments', async(req, res) => {
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

router.post('/', async (req, res) => {
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

router.post('/:id/comments', async (req, res) => {
  try {
    if (!isCorrectTaskComment(req.body)) throw new Error('Not found property');

    const task = (await Task.find({ _id: req.params.id }))[0];
    if (!task) throw new Error('Not found');

    task.commentList.push({
      text: req.body.text,
      author: req.body.author,
      date: req.body.data
    });

    await task.save();
    res.json(task.commentList);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


// Put Methods

router.put('/:id/info', async (req, res) => {
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


// Delete Methods

router.delete('/:id/info', async (req, res) => {
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

router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const task = (await Task.find({ _id: req.params.id }))[0];
    if (!task) throw new Error('Not found task');

    const idx = task.commentList.findIndex((comment) => comment._id === req.params.commentId);
    if (idx < 0) throw new Error('Not found comment');

    task.commentList.splice(idx, 1);

    await task.save();
    res.json(true);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error! ${error.message}`);
  }
});


module.exports = router;