export const checkPostId = (req, res, next) => {
  const { postId } = req.params;
  if (!postId) {
    return next(new Error('post id is required'));
  }
  next();
};

export const emptyPost = (req, res, next) => {
  if (!req.body || typeof req.body !== 'object') {
    return next(new Error('request body is not valid or empty'));
  }
  const { title, content, category } = req.body || {};
  if (!title && !content && !category) {
    return next(new Error('Post fields cannot be empty'));
  }
  next();
};
