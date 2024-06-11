import BurrowSchema from "./BurrowSchema.js";

// insert
export const insertBurrow = (obj) => {
  return BurrowSchema(obj).save();
};

//Read all for the admin || public
export const getAllBurrows = (filter) => {
  return BurrowSchema.find(filter);
};

// get burrow by Id
export const getABurrowById = (_id) => {
  return BurrowSchema.findById(_id);
};

// update burrow by id
export const updateABurrowById = (_id, obj) => {
  return BurrowSchema.findByIdAndUpdate(_id, obj);
};

//delete burrow by id
// export const deleteABurrowById = (_id) => {
//   return BurrowSchema.findByIdAndDelete(_id);
// };
