import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import users from '../models/user.js';

export const register = (req, res, next) => {
  const { username, firstName, LastName, email, password } = req.body;
  
};

export const login = (req, res, next) => {};

export const logout = (req, res, next) => {};

export const deleteUse = (req, res, next) => {};
