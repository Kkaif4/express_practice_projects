import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  category: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  publishedAt: {
    type: Date,
  },
  publishedId: {
    type: String,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
