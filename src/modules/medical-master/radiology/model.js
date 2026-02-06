import mongoose from "mongoose";

const radiologySchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
      trim: true,
    },

    testCode: {
      type: String,
      trim: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    subDepartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubDepartment",
      default: null,
    },

    billGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BillGroup",
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Radiology", radiologySchema);
