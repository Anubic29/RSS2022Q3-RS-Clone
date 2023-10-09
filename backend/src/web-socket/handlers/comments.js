const sendMessages = require('../func/sendMessages');
const Project = require('../../models/Project');
const Task = require('../../models/Task');
const Comment = require('../../models/Comment');

const commentProperties = ['text', 'dateUpdate'];

async function commentsHandler(method, data, objDuct, projectEnv, socket) {
  const project = await Project.findOne({ _id: projectEnv });
  if (!project) throw new Error('Not found project');

  const socketsArrTeam = Object.keys(objDuct.all)
    .filter((key) => [project.author, ...project.team].includes(key))
    .filter((key) => !!objDuct.all[key])
    .map((key) => objDuct.all[key])
    .map((array) => array.filter((client) => client.projectEnv === project._id.toString()));

  switch (method) {
    case 'get':
      const answerGotten = JSON.stringify({type: 'comment', method: 'get', data: await getComments(data)});
      sendMessages([socket], [answerGotten]);
      break;
    case 'create':
      const answerCreated = JSON.stringify({type: 'comment', method: 'get', data: [await createComment(data)]});
      socketsArrTeam.forEach((array) => {
        sendMessages(array.map((client) => client.socket), [answerCreated]);
      });
      break;
    case 'update':
      const answerUpdated = JSON.stringify({type: 'comment', method: 'put', data: [await updateComment(data)]});
      socketsArrTeam.forEach((array) => {
        sendMessages(array.map((client) => client.socket), [answerUpdated]);
      });
      break;
    case 'remove':
      const answerRemoved = JSON.stringify({type: 'comment', method: 'delete', data: await removeComment(data)});
      socketsArrTeam.forEach((array) => {
        sendMessages(array.map((client) => client.socket), [answerRemoved]);
      });
      break;
    default:
      throw new Error('Method value is wrong in type comment');
  }
}

async function getComments(data) {
  const comments = await Comment.find({ taskId: data.taskId });

  return comments;
}

async function createComment(data) {
  const values = {};
  const error = [];

  [...commentProperties, 'author', 'date', 'taskId'].forEach((property) => {
    if (typeof data[property] !== 'string') error.push(`Property ${property} is of the wrong type`);
    else if (data[property].trim() === '') error.push(`Property ${property} can't be empty`);
    values[property] = data[property];
  });
  if (error.length) throw new Error(`${error.join('. ')}.`);

  const task = await Task.findOne({ _id: data.taskId });
  if (!task) throw new Error('Not found task');

  const comment = new Comment(values);

  await comment.save();

  return comment;
}

async function updateComment(data) {
  const { _id, taskId, ...rest } = data;

  const comment = await Comment.findOne({ _id });
  if (!comment) throw new Error('Not found comment');

  Object.entries(rest).filter((arr) => commentProperties.includes(arr[0])).forEach((arr) => {
    if (typeof arr[1] !== 'string') throw new Error(`Property ${property} is of the wrong type`);
    else if (arr[1].trim() === '') throw new Error(`Property ${property} can't be empty`);
    comment[arr[0]] = arr[1];
  });

  await comment.save();

  return comment;
}

async function removeComment(data) {
  const comment = await Comment.findOne({ _id: data._id });
  if (!comment) throw new Error('Not found comment');

  await Comment.deleteOne({ _id: data._id });

  return [data._id];
}

module.exports = commentsHandler;
