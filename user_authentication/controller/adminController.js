import User from '../models/user.js';
import Post from '../models/posts.js';
export const getAllUser = async (req, res, next) => {
  try {
    console.log('finding all users');
    const users = await User.find().select('-password');
    res.json({ message: 'users found', data: users, success: true });
  } catch (err) {
    console.log('user found error', err.message);
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      const error = new Error('no posts found');
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ message: 'all posts', data: posts, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 500;
    return next(error);
  }
};

export const deleteUserById = (req, res, next) => {};
