const { Schema, model } = require('mongoose');

const schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  notedItems: [{
    type: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }]
});

module.exports = model('User', schema);