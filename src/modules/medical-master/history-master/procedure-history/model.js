import mongoose from "mongoose";

const procedureHistoryMasterSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      unique: true,
    },

    procedure: { type: [String], default: [] },
    since: { type: [String], default: [] },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model(
  "ProcedureHistoryMaster",
  procedureHistoryMasterSchema,
);
