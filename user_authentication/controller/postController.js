import User from '../models/user.js';
import Post from '../models/posts.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published' });
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
  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      const error = new Error(`User not found with username ${user.username}`);
      error.status = 400;
      return next(error);
    }
    const userPosts = await Post.find({
      authorId: user._id,
      status: 'published',
    });
    if (!userPosts || userPosts.length === 0) {
      const error = new Error(`post not found of this user ${user.username}`);
      error.status = 400;
      return next(error);
    }

    res.json({ message: 'post found', data: userPosts, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;z
    return next(error);
  }
};

export const getPostsOfUserByPostId = async (req, res, next) => {
  const { postId } = req.params;
  const { id } = req.user;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      const error = new Error(`user not found of this username ${username}`);
      error.status = 400;
      return next(error);
    }
    const post = await Post.find({ authorId: user._id });
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
  if (req.body === null) {
    const error = new Error('cannot create incomplete post');
    error.status = 400;
    return next(error);
  }
  const { title, content, category } = req.body;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      const error = new Error(`user not found of this username ${username}`);
      error.status = 400;
      return next(error);
    }
    await user.save();
    const postCount = user.postCount + 1;
    const newPost = {
      authorId: user._id,
      title,
      content,
      category,
      postCount,
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
    const user = await User.findById({ _id: id });
    if (!user) {
      const error = new Error(
        `user not found of this username ${user.username}`
      );
      error.status = 400;
      return next(error);
    }
    const post = await Post.findOne({ _id: postId, authorId: user._id });
    if (!post) {
      const error = new Error(`post not found of this user ${user.username}`);
      error.status = 400;
      return next(error);
    }
    if (
      !post.title ||
      !post.content ||
      !post.category ||
      post.category.length === 0
    ) {
      await post.save();
      const error = new Error(`cannot publish incomplete post`);
      error.status = 400;
      return next(error);
    }
    post.status = 'published';
    post.publishedAt = Date.now();
    await post.save();
    res.json({ message: 'Post published', data: post, success: true });
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
  const user = await User.findById({ _id: id });
  if (!user) {
    const error = new Error(`user not found of this username ${user.username}`);
    error.status = 400;
    return next(error);
  }

  // if (!title || !content || !Array.isArray(category) || category.length === 0) {
  //   const error = new Error(`cannot update post with incomplete data`);
  //   error.status = 400;
  //   return next(error);
  // }

  try {
    const post = await Post.findOne({ _id: postId, authorId: user._id });
    if (!post) {
      const error = new Error(`post not found of this id ${postId}`);
      error.status = 400;
      return next(error);
    }

    post.title = title;
    post.content = content;
    post.category = category;
    post.updatedAt = Date.now();
    post.status = 'draft';
    await post.save();
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

export const deletePost = (req, res, next) => {};

//? title, author, content, publish-date, category
