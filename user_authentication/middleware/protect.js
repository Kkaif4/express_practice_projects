// import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

export const checkRegisterInfo = (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return next(new Error(`Invalid request body`));
  }
  const requiredFields = [
    'username',
    'firstName',
    'lastName',
    'email',
    'password',
  ];
  for (const field of requiredFields) {
    const value = body[field];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return next(new Error(`${field} is not valid`));
    }
  }
  next();
};

export const checkLoginInfo = (req, res, next) => {
  const body = req.body;
  if (!body || typeof body !== 'object') {
    return next(new Error(`Invalid request body`));
  }
  const requiredFields = ['email', 'password'];
  for (const field of requiredFields) {
    const value = body[field];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      return next(new Error(`${field} is not valid`));
    }
  }
  next();
};

export const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return next(new Error('token not found'));
  }
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
