import mongoose from "mongoose";

const departmentSubTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    departmentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentType",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const DepartmentSubType = mongoose.model(
  "DepartmentSubType",
  departmentSubTypeSchema
);
export default DepartmentSubType;
