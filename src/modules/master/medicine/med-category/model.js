import mongoose from "mongoose";

const categoryMedSchema = new mongoose.Schema(
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

const CategoryMed = mongoose.model("CategoryMed", categoryMedSchema);
export default CategoryMed;
