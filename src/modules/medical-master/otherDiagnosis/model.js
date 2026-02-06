import mongoose from "mongoose";

const otherDiagnosisSchema = new mongoose.Schema(
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
  { timestamps: true }
);

export default mongoose.model("OtherDiagnosis", otherDiagnosisSchema);
