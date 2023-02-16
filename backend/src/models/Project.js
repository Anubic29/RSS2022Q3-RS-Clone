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
  key: {
    type: String,
    required: true
  },
  boardTitle: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  team: {
    type: [String],
    required: true
  },
  columnList: [{
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }],
  pathImage: {
    type: String,
    required: true
  }
});

module.exports = model('Project', schema);