import User from '../models/user.js';
import Post from '../models/posts.js';

export const getAllUser = async (req, res, next) => {
  const { page, limit, date } = req.query;
  const query = {};
  const L = limit ? parseInt(limit) : 3;
  const P = page ? parseInt(page) : 1;
  if (date) {
    query.createdAt = { $gte: date };
  }
  try {
    const users = await User.find(query)
      .select('-password')
      .skip((P - 1) * L)
      .limit(L);
    res.json({ message: 'users found', data: users, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  const { page, limit, author, date } = req.query;
  const query = {};
  const L = limit ? parseInt(limit) : 3;
  const P = page ? parseInt(page) : 1;
  if (date) {
    query.createdAt = { $gte: date };
  }
  if (author) {
    query.authorId = author;
  }
  try {
    const posts = await Post.find(query)
      .skip((P - 1) * L)
      .limit(L);
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

export const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndDelete({ _id: id })
    .then((user) => {
      res.json({ message: 'user deleted', data: user, success: true });
    })
    .catch((err) => {
      const error = new Error(err.message);
      error.status = 400;
      return next(error);
    });
};

export const deletePostById = async (req, res, next) => {
  const { id } = req.params;
  await Post.findByIdAndDelete({ _id: id })
    .then((post) => {
      res.json({ message: 'post deleted', data: post, success: true });
    })
    .catch((err) => {
      const error = new Error(err.message);
      error.status = 400;
      return next(error);
    });
};

export const deleteAllPosts = async (req, res, next) => {
  try {
    await Post.deleteMany();
    res.json({ message: 'all posts deleted', success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany();
    res.json({ message: 'all users deleted', success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
