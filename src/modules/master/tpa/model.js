import mongoose from "mongoose";

const tpaSchema = new mongoose.Schema(
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

const TPA = mongoose.model("TPA", tpaSchema);
export default TPA;
