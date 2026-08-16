import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

const generateTokens = async (adminId) => {
  try {
    const accessToken = jwt.sign({ id: adminId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: adminId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Directly update the DB document by ID to guarantee write bypasses schema query filters
    await Admin.findByIdAndUpdate(
      adminId,
      { $set: { refreshToken: refreshToken } },
      { new: true, runValidators: false }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, `Token generation failed: ${error.message}`);
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, pumpName, location, description } = req.body;

  if ([name, email, password, pumpName, location].some((field) => !field || field.trim() === '')) {
    throw new ApiError(400, 'All required fields must be provided');
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError(409, 'Admin with this email already exists');
  }

  const admin = await Admin.create({
    name,
    email,
    password,
    pumpName,
    location,
    description: description || ''
  });

  const { accessToken, refreshToken } = await generateTokens(admin._id);

  const createdAdmin = await Admin.findById(admin._id).select('-password -refreshToken');

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };

  return res
    .status(201)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(201, { admin: createdAdmin, accessToken }, 'Admin registered successfully'));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new ApiError(404, 'Admin does not exist');
  }

  const isPasswordValid = await admin.matchPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const { accessToken, refreshToken } = await generateTokens(admin._id);

  const loggedInAdmin = await Admin.findById(admin._id).select('-password -refreshToken');

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  };

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(200, { admin: loggedInAdmin, accessToken }, 'Login successful'));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded?.id);

    if (!admin || admin.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    const { accessToken, refreshToken } = await generateTokens(admin._id);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    };

    return res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieOptions)
      .json(new ApiResponse(200, { accessToken }, 'Access token refreshed successfully'));
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});


// admin.controller.js
export const updateAdminDetails = asyncHandler(async (req, res) => {
  const { name, pumpName, location, description } = req.body;

  // Use req.adminId as set by your verifyJWT middleware
  const adminId = req.adminId;

  if (!adminId) {
    throw new ApiError(401, 'Unauthorized request: Admin ID not found in request');
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(
    adminId,
    {
      $set: {
        name,
        pumpName,
        location,
        description: description || ''
      }
    },
    { new: true, runValidators: true }
  ).select('-password -refreshToken');

  return res
    .status(200)
    .json(new ApiResponse(200, updatedAdmin, 'Profile updated successfully'));
});

export default {
  registerAdmin,
  loginAdmin,
  refreshAccessToken,
  updateAdminDetails
};