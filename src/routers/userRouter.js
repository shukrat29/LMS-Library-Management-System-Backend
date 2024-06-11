import express from "express";
import { createNewUser, getUserByEmail } from "../models/user/UserModel.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { newUserValidation } from "../middlewares/joiValidation.js";
import { singAccessJWT, singRefresJWT } from "../utils/jwt.js";
import { auth, jwtAuth } from "../middlewares/auth.js";
const router = express.Router();

// router.all("/", (req, res, next) => {
//   //always executes
//   console.log("from all");
//   next();
// });

//create new user
router.post("/", newUserValidation, async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your Account has been created successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create an use try again later",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another user alreay have this email, change your email and try again";
      error.status = 200;
    }
    next(error);
  }
});
///====== public controllers
//login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email.includes("@") || !password) {
      throw new Error("Invalid login details");
    }

    // find user by email
    const user = await getUserByEmail(email);
    if (user?._id) {
      // verify the password
      const isPassMatched = comparePassword(password, user.password);
      if (isPassMatched) {
        // user authenticated
        // create tokens, and retun

        return res.json({
          status: "success",
          message: "user authenticated",
          tokens: {
            accessJWT: singAccessJWT({ email }),
            refreshJWT: singRefresJWT({ email }),
          },
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid login details",
    });
  } catch (error) {
    next(error);
  }
});

/// private controllers

// return the user profile
router.get("/", auth, (req, res, next) => {
  try {
    req.userInfo.refreshJWT = undefined;
    req.userInfo.__v = undefined;
    res.json({
      status: "success",
      message: "User profile",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});

// return new accessJWT
router.get("/renew-accesjwt", jwtAuth, async (req, res, next) => {
  try {
    const { email } = req.userInfo;
    const accessJWT = singAccessJWT({ email });
    res.json({ accessJWT });
  } catch (error) {
    next(error);
  }
});

export default router;
