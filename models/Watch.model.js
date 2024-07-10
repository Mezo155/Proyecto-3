// models/Like.js
const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  externalItemId: {
    type: String,
    required: true
  }
});

const Like = mongoose.model('WatchList', watchListSchema);

module.exports = Like;
