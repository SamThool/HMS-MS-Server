import mongoose from "mongoose";

const corporateCompanyPublicSchema = new mongoose.Schema(
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

const CorporateCompanyPublic = mongoose.model(
  "CorporateCompanyPublic",
  corporateCompanyPublicSchema
);

export default CorporateCompanyPublic;
