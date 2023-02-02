const { Schema, model } = require('mongoose');

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  executor: {
    type: String,
    required: true
  },
  projectId: {
    type: String,
    required: true
  },
  columnId: {
    type: String,
    required: true
  },
  commentList: [{
    text: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  }]
});

module.exports = model('Task', schema);