const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
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
    },
    dateUpdate: {
      type: Date,
      required: true
    }
  }]
});

module.exports = model('Task', schema);