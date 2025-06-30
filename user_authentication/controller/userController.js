import User from '../models/user.js';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../utils/emails.js';

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

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

export const forgotEmail = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      const error = new Error('user not found');
      error.status = 400;
      return next(error);
    }
    res.json({
      message: `user found, here is your email`,
      data: user.email,
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body || {};
  if (!email) return next(new Error('email is required'));
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('user not found');
      error.status = 400;
      return next(error);
    }
    const code = generateVerificationCode();
    user.code = code;
    user.save();
    let message = '';
    sendVerificationEmail(email, code)
      ? (message += 'verification email sent')
      : (message += 'error sending email');
    res.json({ message, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { email, code, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error('user not found');
      error.status = 400;
      return next(error);
    }
    if (code !== user.code) {
      const error = new Error('invalid code');
      error.status = 400;
      return next(error);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    user.updatedAt = Date.now();
    user.isValid = true;
    user.code = null;
    user.save();
    res.json({
      message: 'password updated, you can login with new password',
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};
