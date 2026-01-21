import mongoose from "mongoose";

const chiefComplaintMasterSchema = new mongoose.Schema(
  {
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      unique: true, // one document per department
    },

    complaints: {
      type: [String],
      default: [],
      trim: true,
    },
    locations: { type: [String], default: [] },
    descriptions: { type: [String], default: [] },
    since: { type: [String], default: [] },
    treatments: { type: [String], default: [] },
    with: { type: [String], default: [] },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ChiefComplaintMaster = mongoose.model(
  "ChiefComplaintMaster",
  chiefComplaintMasterSchema,
);

export default ChiefComplaintMaster;
