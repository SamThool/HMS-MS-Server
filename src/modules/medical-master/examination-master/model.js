import mongoose from "mongoose";

const examinationMasterSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      unique: true,
    },

    general: [{ type: String, trim: true }],
    systematic: [{ type: String, trim: true }],
    local: [{ type: String, trim: true }],
    other: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model(
  "ExaminationMaster",
  examinationMasterSchema
);
