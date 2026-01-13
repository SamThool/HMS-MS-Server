import mongoose from "mongoose";

const corporateCompanyPrivateSchema = new mongoose.Schema(
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

const CorporateCompanyPrivate = mongoose.model(
  "CorporateCompanyPrivate",
  corporateCompanyPrivateSchema
);

export default CorporateCompanyPrivate;
