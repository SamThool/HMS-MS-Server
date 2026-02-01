import mongoose from "mongoose";

const doseMedSchema = new mongoose.Schema(
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

const DoseMed = mongoose.model("DoseMed", doseMedSchema);
export default DoseMed;
