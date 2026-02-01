import mongoose from "mongoose";

const hospitalSetupSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      trim: true,
    },

    gstNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    landlineNumber: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    website: {
      type: String,
      trim: true,
    },

    // future-proofing (optional but smart)
    logoUrl: {
      type: String,
      trim: true,
    },

    footerNote: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensures ONLY ONE hospital setup exists
hospitalSetupSchema.index({}, { unique: true });

export default mongoose.model("HospitalSetup", hospitalSetupSchema);
