// models/Like.js
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
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

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
