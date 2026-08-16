import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorized request: Missing access token');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.adminId = decodedToken.id;
    return next(); // Explicitly call and return next()
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});

export default verifyJWT;