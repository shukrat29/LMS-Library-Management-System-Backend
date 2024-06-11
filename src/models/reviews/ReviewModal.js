import ReviewSchema from "./ReviewSchema.js";

// insert
export const insertReview = (obj) => {
  return ReviewSchema(obj).save();
};

//Read all for the admin only
export const getAllReviews = (filter) => {
  return ReviewSchema.find(filter);
};

// get review by Id
// export const getAReviewById = (_id) => {
//   return ReviewSchema.findById(_id);
// };

// update review by id
export const updateAReviewById = (_id, obj) => {
  return ReviewSchema.findByIdAndUpdate(_id, obj);
};

//delete review by id
// export const deleteAReviewById = (_id) => {
//   return ReviewSchema.findByIdAndDelete(_id);
// };
