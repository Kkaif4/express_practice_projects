export const errorhandler = (err, req, res, next) => {
  console.log('error handler:', err.message || 'internal server error');
  res
    .status(err.status || 500)
    .json({ message: err.message || 'internal server error', success: false });
};
