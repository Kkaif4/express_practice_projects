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

export const protect = (req, res, next) => {};

export const validateToken = (req, res, next) => {};

