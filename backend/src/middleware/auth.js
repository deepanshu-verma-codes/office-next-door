const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token && !req.cookies.refreshToken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      req.user = decoded.user;
      return next();
    }
    throw new Error("No access token"); // fallback to refresh logic
  } catch (err) {
    // If access token is expired or missing, try refresh token
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Session expired. Please login again.' });
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
      req.user = decoded.user;
      
      // Issue a new access token
      const newAccessToken = jwt.sign({ user: { id: req.user.id } }, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
      });
      
      next();
    } catch (refreshErr) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(401).json({ message: 'Session expired. Please login again.' });
    }
  }
};

module.exports = authMiddleware;
