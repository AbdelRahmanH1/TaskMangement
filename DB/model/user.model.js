import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "Unknown",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      /* match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, */
    },
    age: {
      type: Number,
      min: 10,
      max: 85,
      default: 20,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    isEmail: {
      isVerify: { type: String, default: null },
      forgetCode: { type: Number, default: null },
      tokenSign: { type: String, default: null },
    },
    profilePicture: {
      type: String,
      default: "uploads\\360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
    },
    qr: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  try {
    const hashpassword = bcryptjs.hashSync(
      this.password,
      parseInt(process.env.SALT_ROUND)
    );
    this.password = hashpassword;
    return next();
  } catch (e) {
    return next(new Error("Error saving data"));
  }
});
userSchema.method.comparePassword = (userPassword) => {
  const match = bcryptjs.compareSync(userPassword, this.password);
  if (!match) return false;
  else return true;
};
const user = model("User", userSchema);
export default user;
