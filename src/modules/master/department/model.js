import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    departmentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentType",
      required: true,
    },

    departmentSubType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DepartmentSubType",
      required: true,
    },

    departmentName: {
      type: String,
      required: true,
      trim: true,
    },

    departmentCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    // ✅ Soft delete flag (REQUIRED)
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
