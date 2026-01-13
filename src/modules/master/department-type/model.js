import mongoose from "mongoose";

const departmentTypeSchema = new mongoose.Schema(
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

const DepartmentType = mongoose.model("DepartmentType", departmentTypeSchema);
export default DepartmentType;
