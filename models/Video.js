import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    vidUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      defult: 0,
    },
    tags: {
      type: [String],
      defult: [],
    },
    likes: {
      type: [String],
      defult: [],
    },
    dislikes: {
      type: [String],
      defult: [],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Video", videoSchema);
