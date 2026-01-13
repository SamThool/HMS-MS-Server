import mongoose from "mongoose";

const uhidSchema = new mongoose.Schema(
  {
    uhid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    prefix: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prefix",

      //   required: true,
    },

    fname: {
      type: String,
      required: true,
      trim: true,
    },

    mname: {
      type: String,
      trim: true,
    },

    lname: {
      type: String,
      trim: true,
    },

    dob: {
      type: Date,
      //   required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      //   required: true,
    },

    mobileNumber: {
      type: String,
      //   required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      trim: true,
      default: "India",
    },

    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed", "Separated", ""],
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UHID = mongoose.model("UHID", uhidSchema);
export default UHID;
