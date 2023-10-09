const { Schema, model } = require('mongoose');

const schema = new Schema({
  taskId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  dateUpdate: {
    type: String,
    required: true
  }
});

module.exports = model('Comment', schema);
