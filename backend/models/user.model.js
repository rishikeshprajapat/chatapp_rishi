import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,   // ✅ spelling fixed
    },
    password: {
      type: String,  // ✅ spelling fixed
      required: true,
      minlength: 6,  // (mongoose me lowercase bhi safe hai)
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  //created and update at a time 
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
