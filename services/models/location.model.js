// target.model.js
const mongoose = require('mongoose');
// Setup schema
const locationSchema = mongoose.Schema({
  locationName: {
    type: String,
    required: true,
    unique: true,
  },
  long: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^-?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(v);
      },
      message: props => `${props.value} is not a valid longitude!`
    },
    required: true,
  },
  lat: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^-?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(v);
      },
      message: props => `${props.value} is not a valid latitude!`
    },
    required: true,
  },
  range: {
    type: Number,
    required: true,
  },
  targets: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  }]
});

// Export target model
const location = mongoose.model('location', locationSchema);
module.exports = location;
module.exports.get = (callback, limit) => {
  location.find(callback).limit(limit);
};
