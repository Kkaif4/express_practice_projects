// import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
import User from '../models/user.js';

export const CheckUser = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById({ _id: id });
  if (!user) {
    const error = new Error('user not found');
    error.status = 400;
    return next(error);
  }
  next();
};

export const checkRegisterInfo = (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return next(new Error(`Invalid request body`));
  }

  const requiredFields = ['username', 'firstName', 'lastName', 'email'];

  for (const field of requiredFields) {
    const value = body[field];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return next(new Error(`${field} is not valid`));
    }
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(req.body.email)) {
    return next(new Error(`${body.email} email is not valid`));
  }

  /*
  ? validating password: password must be at least 8 characters,
  ? one capital, one special character and one number
   */
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,16}$/;
  const password = body.password;
  if (
    !password ||
    typeof password !== 'string' ||
    !passwordRegex.test(password)
  ) {
    return next(
      new Error(
        `password must be at least 8 characters and max 16, one capital, one special character and one number`
      )
    );
  }
  next();
};

export const checkLoginInfo = (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return next(new Error(`Invalid request body`));
  }

  //? either username or email is used for login
  const username = body.username;
  const email = body.email;
  const password = body.password;
  if (!username && !email) {
    return next(new Error(`username or email is required`));
  }
  if (username) {
    if (typeof username !== 'string' || username.trim() === '') {
      return next(new Error(`username is not valid`));
    }
  }
  if (email) {
    if (typeof email !== 'string' || email.trim() === '') {
      return next(new Error(`email is required`));
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      return next(new Error(`email is not valid`));
    }
  }
  //? password validating
  if (!password) return next(new Error('password is required'));
  if (typeof password !== 'string' || password.trim() === '') {
    return next(new Error(`password is not valid`));
  }
  next();
};

export const isUserValid = async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById({ _id: id });
  if (!user) {
    const error = new Error('user not found');
    error.status = 400;
    return next(error);
  }
  if (!user.isValid) {
    const error = new Error('user is not validated');
    error.status = 400;
    return next(error);
  }
  next();
};
export const validateUpdateInfo = (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return next(new Error(`Invalid request body`));
  }

  if (!body.username && !body.firstName && !body.lastName && !body.email) {
    return next(new Error(`cannot update invalid data`));
  }
  next();
};

export const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new Error('Token missing'));
  }
  const token = authHeader.split(' ')[1];
  const decode = jwtDecode(token);
  req.user = decode;
  next();
};

export const validateAdmin = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    const error = new Error('you are unauthorized !!');
    error.status = 403;
    return next(error);
  }
  next();
};

export const checkResetPassword = (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return next(new Error(`Invalid request body`));
  }
  const { email, code, password } = body;
  if (!email || !code || !password) {
    return next(new Error(`email, code and new password is required`));
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,16}$/;
  if (typeof password !== 'string' || !passwordRegex.test(password)) {
    console.log('test failed');
    return next(
      new Error(
        `password must be at least 8 characters and max 16, one capital, one special character and one number`
      )
    );
  }
  next();
};
