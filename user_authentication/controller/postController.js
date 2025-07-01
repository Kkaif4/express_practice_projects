import User from '../models/user.js';
import Post from '../models/posts.js';
import Draft from '../models/draft.js';

export const getAllPosts = async (req, res, next) => {
  const { page, limit, author, date } = req.query;
  const query = { status: 'published' };
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
      .populate('authorId', 'username')
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
export const getUsersPost = async (req, res, next) => {
  const { id } = req.user;
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
    const user = await User.findOne({ _id: id }).select('-password');
    query.authorId = user._id;
    const userPosts = await Post.find(query)
      .populate('authorId', 'username')
      .skip((P - 1) * L)
      .limit(L);
    if (!userPosts || userPosts.length === 0) {
      const error = new Error(`post not found of this user ${user.username}`);
      error.status = 400;
      return next(error);
    }

    res.json({ message: 'post found', data: userPosts, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    z;
    return next(error);
  }
};

export const getUserPostById = async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;
  try {
    const user = await User.findById({ _id: id }).select('-password');
    const post = await Post.find({ authorId: user._id, _id: postId });
    if (!post) {
      const error = new Error(`post not found of this id ${postId}`);
      error.status = 400;
      return next(error);
    }
    res.json({ message: 'post found', data: post, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const createPost = async (req, res, next) => {
  const { id } = req.user;
  const { title, content, category } = req.body;
  try {
    const user = await User.findById({ _id: id }).select('-password');
    const postCount = user.postCount + 1;
    const newPost = {
      authorId: user._id,
      title,
      content,
      category,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const savedPost = await Post.create(newPost);
    user.postCount = postCount;
    user.save();
    res.status(201).json({
      message: 'Post created successfully',
      data: savedPost,
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 500;
    return next(error);
  }
};

export const publishPost = async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;
  try {
    const user = await User.findById({ _id: id }).select('-password');
    const post = await Post.findOne({ _id: postId, authorId: user._id });
    if (!post) {
      const error = new Error(`post not found of this user ${user.username}`);
      error.status = 400;
      return next(error);
    }
    if (post.status === 'published') {
      const draft = await Draft.findOne({ postId: post._id });
      console.log('draft here ----------', draft);
      console.log('----------------------');
      if (!draft) {
        const error = new Error(`cannot publish incomplete post`);
        error.status = 401;
        return next(error);
      }
      if (
        !draft.title ||
        !draft.content ||
        !draft.category ||
        draft.category.length === 0
      ) {
        const error = new Error(`hello : cannot publish incomplete post`);
        error.status = 400;
        return next(error);
      }
      post.title = draft.title;
      post.content = draft.content;
      post.category = draft.category;
      post.status = 'published';
      post.publishedAt = Date.now();
      const publishedPost = await post.save();
      await Draft.deleteOne({ postId: post._id });
      res.json({
        message: 'post published',
        data: publishedPost,
        success: true,
      });
    }
    if (
      !post.title ||
      !post.content ||
      !post.category ||
      post.category.length === 0
    ) {
      const error = new Error(`cannot publish incomplete post`);
      error.status = 400;
      return next(error);
    }
    if (post.status === 'draft') {
      post.status = 'published';
      post.publishedAt = Date.now();
      const publishedPost = await post.save();
      res.json({
        message: 'post published',
        data: publishedPost,
        success: true,
      });
    }
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;
  const { title, content, category } = req.body;
  try {
    const user = await User.findById({ _id: id }).select('-password');
    const post = await Post.findOne({ _id: postId, authorId: user._id });
    if (!post) {
      const error = new Error(`post not found of this id ${postId}`);
      error.status = 400;
      return next(error);
    }
    const newDraft = {};
    newDraft.postId = post._id;
    newDraft.authorId = user._id;
    newDraft.title = title || post.title;
    newDraft.content = content || post.content;
    newDraft.category = category || post.category;
    newDraft.updatedAt = Date.now();
    newDraft.status = 'draft';
    const one = await Draft.create(newDraft);
    console.log(one, '------------------');
    res.json({
      message: 'Post updated, now in Draft',
      data: post,
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const { id } = req.user;
  const { postId } = req.params;
  try {
    const user = await User.findById({ _id: id }).select('-password');
    const post = await Post.findOne({
      _id: postId,
      authorId: user._id,
      status: 'published',
    });
    if (!post) {
      const error = new Error(`post not found of this id ${postId}`);
      error.status = 400;
      return next(error);
    }
    await Post.deleteOne({ _id: postId });
    res.json({ message: 'post deleted', success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
  }
};

//? title, author, content, publish-date, category
