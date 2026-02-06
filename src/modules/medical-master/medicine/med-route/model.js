import mongoose from "mongoose";

const routeMedSchema = new mongoose.Schema(
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

const RouteMed = mongoose.model("RouteMed", routeMedSchema);
export default RouteMed;
