import mongoose from "mongoose";

const payeeRateConfigurationSchema = new mongoose.Schema(
  {
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayeeCategory",
      required: true,
    },

    ParentPayee: {
      type: mongoose.Schema.Types.ObjectId,
      //   ref: "PayeeRateConfiguration",
      default: null,
    },

    Payee: {
      type: mongoose.Schema.Types.ObjectId,
      //   ref: "PayeeRateConfiguration",
      default: null,
    },

    rateList: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceRate",
      required: true,
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PayeeRateConfiguration = mongoose.model(
  "PayeeRateConfiguration",
  payeeRateConfigurationSchema
);

export default PayeeRateConfiguration;
