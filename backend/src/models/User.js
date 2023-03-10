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
  }],
  recentProjects: {
    type: [String],
    default: []
  },
  jobTitleInfo: {
    type: String,
    default: ''
  },
  departmentInfo: {
    type: String,
    default: ''
  },
  organizationInfo: {
    type: String,
    default: ''
  },
  locationInfo: {
    type: String,
    default: ''
  },
  coverBlock: {
    type: String,
    default: ''
  }
});

module.exports = model('User', schema);