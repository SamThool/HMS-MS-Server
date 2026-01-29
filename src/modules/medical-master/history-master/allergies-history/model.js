import mongoose from "mongoose";

const allergyHistoryMasterSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      unique: true,
    },

    general: { type: [String], default: [] },
    food: { type: [String], default: [] },
    drug: { type: [String], default: [] },
    other: { type: [String], default: [] },
    since: { type: [String], default: [] },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model(
  "AllergyHistoryMaster",
  allergyHistoryMasterSchema,
);
