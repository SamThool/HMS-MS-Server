import mongoose from "mongoose";

const pastHistoryMasterSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      unique: true,
    },

    history: { type: [String], default: [] },
    since: { type: [String], default: [] },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model(
  "PastHistoryMaster",
  pastHistoryMasterSchema,
);
