const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send('A token is required for authentication');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secret_ecom');
    req.user = decoded.user;
    console.log('Token decoded successfully:', decoded);
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).send('Invalid Token');
  }
  return next();
};

const isAdmin = (req, res, next) => {
  console.log('Checking if user is admin:', req.user);
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access denied');
  }
  next();
};

module.exports = { verifyToken, isAdmin };
