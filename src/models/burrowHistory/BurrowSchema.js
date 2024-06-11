import mongoose from "mongoose";

const burrowSchema = new mongoose.Schema(
  {
    isReturned: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    bookId: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    bookTitle: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      default: "",
    },
    returnedDate: {
      type: Date,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Burrow", burrowSchema);
