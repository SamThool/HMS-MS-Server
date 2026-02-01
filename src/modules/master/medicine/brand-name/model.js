import mongoose from "mongoose";

const brandMedSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const BrandMed = mongoose.model("BrandMed", brandMedSchema);
export default BrandMed;
