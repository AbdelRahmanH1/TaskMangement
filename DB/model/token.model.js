import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      unique: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: String,
    },
  },
  { timestamps: true }
);

const tokenModel = model("Token", tokenSchema);
export default tokenModel;
