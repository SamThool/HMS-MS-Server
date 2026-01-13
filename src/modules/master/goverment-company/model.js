import mongoose from "mongoose";

const governmentCompanySchema = new mongoose.Schema(
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

const GovernmentCompany = mongoose.model(
  "GovernmentCompany",
  governmentCompanySchema
);
export default GovernmentCompany;
