import mongoose from "mongoose";

const insuranceCompanySchema = new mongoose.Schema(
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

const InsuranceCompany = mongoose.model(
  "InsuranceCompany",
  insuranceCompanySchema
);
export default InsuranceCompany;
