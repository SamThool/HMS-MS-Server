import mongoose from "mongoose";

const drugHistoryMasterSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      unique: true,
    },

    drug: { type: [String], default: [] },
    dose: { type: [String], default: [] },
    since: { type: [String], default: [] },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model(
  "DrugHistoryMaster",
  drugHistoryMasterSchema,
);
