import asyncHandler from "../utils/asyncHandler.js";
import appError from "../utils/appError.js";
import tokenModel from "../../DB/model/token.model.js";
import userModel from "../../DB/model/user.model.js";
import jwt from "jsonwebtoken";

export const auth = asyncHandler(async (req, res, next) => {
  let { token } = req.headers;
  if (!token) {
    const err = appError.create("Token missing !", 401);
    return next(err);
  }
  if (!token.startsWith(process.env.BEARER_KEY)) {
    const err = appError.create("Token failed", 400);
    return next(err);
  }
  token = token.split(process.env.BEARER_KEY)[1];
  const isTokenExist = await tokenModel.findOne({ token, isValid: true });

  if (!isTokenExist) {
    const err = appError.create("Token expired !!", 401);
    return next(err);
  }
  const info = jwt.verify(token, process.env.SECRET_KEY);
  const user = await userModel.findById(info.id);
  if (!user) {
    const err = appError.create("User not found", 404);
    return next(err);
  }
  req.user = user;
  return next();
});
