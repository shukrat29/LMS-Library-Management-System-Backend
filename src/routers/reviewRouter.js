import express from "express";

import { auth, isAdmin } from "../middlewares/auth.js";
import { newReviewValidation } from "../middlewares/joiValidation.js";
import {
  getAllReviews,
  insertReview,
  updateAReviewById,
} from "../models/reviews/ReviewModal.js";

const router = express.Router();

//Private controllers create new user
router.post("/", auth, newReviewValidation, async (req, res, next) => {
  try {
    const review = await insertReview(req.body);
    review?._id
      ? res.json({
          status: "success",
          message: "your new review has been added successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to add the review, try agian later",
        });
  } catch (error) {
    next(error);
  }
});

//update status
router.patch("/", auth, isAdmin, async (req, res, next) => {
  try {
    const { _id, status } = req.body;
    const review = await updateAReviewById(_id, { status });
    review?._id
      ? res.json({
          status: "success",
          message: "The review has been updated successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to update the review, try agian later",
        });
  } catch (error) {
    next(error);
  }
});

// return all  reviews only
router.get("/all", auth, isAdmin, async (req, res, next) => {
  try {
    const reviews = await getAllReviews();

    return res.json({
      status: "success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

// ==== public
// return all active reviews only
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews({ status: "active" });

    return res.json({
      status: "success",
      message: "",
      reviews,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
