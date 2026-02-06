import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema(
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

const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
export default Diagnosis;
