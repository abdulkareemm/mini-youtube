import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { _ } from "lodash";
import {Jwt} from "jsonwebtoken"

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    return res.status(200).json({ msg: "the user has been saved" });
  } catch (err) {
    const error = {
      msg: "invalid input",
    };
    next(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      next({ msg: "username or password in incorrect" });
    }
    const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash) {
      next({ msg: "username or password in incorrect" });
    }

    return res.status(200).json({
      msg: "welcome",
      user: _.omit(user.toObject(), ["createdAt", "updatedAt", "password"]),
    });
  } catch (err) {
    const error = {
      msg: "invalid input",
    };
    next(error);
  }
};
