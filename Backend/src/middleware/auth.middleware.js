import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const verifyJWT = asyncHandler((req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    return res.status(401).json(new ApiError(401, "Access token is missing"));
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(new ApiError(403, "Invalid access token"));
    }
    req.user = user;
    next();
  });
});