import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { sendVerificationEmail } from '../utils/emails.js';
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req, res, next) => {
  const { username, firstName, lastName, email, password } = req.body;
  try {
    const code = generateVerificationCode();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = {
      username,
      firstName:
        firstName.toLowerCase().charAt(0).toUpperCase() + firstName.slice(1),
      lastName:
        lastName.toLowerCase().charAt(0).toUpperCase() + lastName.slice(1),
      email,
      password: hash,
      code,
    };
    let message = 'account created successfully, ';
    const user = await User.create(newUser);
    console.log(user.id);
    const token = jwt.sign(
      { id: user.id, isAdmin: newUser.isAdmin, isValid: newUser.isValid },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );
    sendVerificationEmail(email, code)
      ? (message += 'email sent')
      : (message += 'error sending email');
    res.json({
      message,
      data: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        valid: newUser.isValid,
      },
      token,
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const validate = async (req, res, next) => {
  const { id } = req.user;
  const { code } = req.body || {};
  if (!code) return next(new Error('verification code is required'));
  try {
    const user = await User.findById({ _id: id }).select('-password');
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
    user.code = null;
    user.isValid = true;
    user.save();
    res.json({
      message: 'validation completed',
      data: user.username,
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, email, password } = req.body;
  let user = null;
  if (username) {
    user = await User.findOne({ username });
  }
  if (email) {
    user = await User.findOne({ email });
  }
  if (!user) {
    const error = new Error('user not found');
    error.status = 400;
    return next(error);
  }
  try {
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      const error = new Error('invalid password');
      error.status = 400;
      return next(error);
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, isValid: user.isValid },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    );
    console.log('user logged in successfully');
    res.json({ message: 'user logged in', data: token, success: true });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const logout = async (req, res, next) => {};