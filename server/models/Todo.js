const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const TodoSchema = new mongoose.Schema({
  Todo: [
    {
      type: String,
    },
  ],
  PostedBy: {
    type: ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Todo', TodoSchema);
