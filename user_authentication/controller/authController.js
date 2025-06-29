import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const register = async (req, res, next) => {
  const { username, firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) {
    const error = new Error('hi, user already exist');
    error.status = 400;
    return next(error);
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      password: hash,
    };
    await User.create(newUser);
    res.json({
      message: 'user created',
      data: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      success: true,
    });
  } catch (err) {
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    console.log('user not found');
    const error = new Error('user not found');
    error.status = 400;
    return next(error);
  }
  try {
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      console.log('invalid password');
      const error = new Error('invalid password');
      error.status = 400;
      return next(error);
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    console.log('user logged in successfully');
    res.json({ message: 'user logged in', data: token, success: true });
  } catch (err) {
    console.log('hello', err.message);
    const error = new Error(err.message);
    error.status = 400;
    return next(error);
  }
};

export const logout = (req, res, next) => {};
