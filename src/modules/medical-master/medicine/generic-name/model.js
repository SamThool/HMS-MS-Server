import mongoose from "mongoose";

const genericMedSchema = new mongoose.Schema(
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

const GenericMed = mongoose.model("GenericMed", genericMedSchema);
export default GenericMed;
