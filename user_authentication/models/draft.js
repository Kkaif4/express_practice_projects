import mongoose from 'mongoose';

// this is the draft model, but it is not used yet. I'll implement this later.

const draftSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  categories: {
    type: [String],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  publishedAt: {
    type: Date,
  },
});

const Draft = mongoose.model('Draft', draftSchema);
export default Draft;
