import User from '../models/user.js';

export const getUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById({ _id: id }).select('-password');
    if (!user) {
      const error = new Error('user not found');
      error.status = 400;
      return next(error);
    }
    res.json({ message: 'user found', data: user, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const forgotEmail = (req, res, next) => {
  const { id } = req.user;
  try {
    const user = User.findById({ _id: id });
    if (!user) {
      const error = new Error('user not found');
      error.status = 400;
      return next(error);
    }
    res.json({
      message: 'user found, here is email',
      data: user.email,
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const forgotPassword = (req, res, next) => {
  const { id } = req.user;
  const { email } = req.body;
  try {
    const user = User.findById({ _id: id });
    if (!user) {
      const error = new Error('user not found');
      error.status = 400;
      return next(error);
    }
    if (email) {
    }
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const { id } = req.user;
  const { username, firstName, lastName, email } = req.body;
  if (username || email) {
    try {
      const user = await User.findOne({
        $or: [{ email }, { username }],
      }).select('-password');
      if (user) {
        const error = new Error('cannot update, user already exist');
        error.status = 400;
        return next(error);
      }
    } catch (err) {
      const error = new Error(err.message);
      error.status = 400;
      return next(error);
    }
  }
  try {
    const user = await User.findById({ _id: id }).select('-password');
    if (!user) {
      const error = new Error('user not found');
      error.status = 400;
      return next(error);
    }
    const fields = [username, firstName, lastName, email];

    fields.forEach((field) => {
      if (field) {
        user.field = field;
      }
    });

    await user.save();
    res.json({ message: 'user updated', data: user, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
