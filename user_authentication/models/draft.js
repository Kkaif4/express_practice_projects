import mongoose from 'mongoose';

// this is the draft model, but it is not used yet. I'll implement this later.

const draftSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  category: {
    type: [String],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Draft = mongoose.model('Draft', draftSchema);
export default Draft;
