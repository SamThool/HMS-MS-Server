import mongoose from "mongoose";

const typeMedSchema = new mongoose.Schema(
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

const TypeMed = mongoose.model("TypeMed", typeMedSchema);
export default TypeMed;
