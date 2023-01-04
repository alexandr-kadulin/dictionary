const mongoose = require('mongoose');

const WordSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, 'must provide key'],
    trim: true,
    maxlength: [20, 'key can not be more than 20 characters'],
  },
  nimetav: {
    type: String,
    required: [true, 'must provide nimetav'],
    trim: true,
    maxlength: [20, 'nimetav can not be more than 20 characters'],
  },
  omastav: {
    type: String,
    required: [true, 'must provide omastav'],
    trim: true,
    maxlength: [20, 'omastav can not be more than 20 characters'],
  },
  osastav: {
    type: String,
    required: [true, 'must provide osastav'],
    trim: true,
    maxlength: [20, 'osastav can not be more than 20 characters'],
  },
});

module.exports = mongoose.model('Word', WordSchema);
