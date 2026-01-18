import mongoose from "mongoose";

const serviceListSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    alternateServiceName: {
      type: String,
      trim: true,
      default: "",
    },

    billGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BillGroup",
      required: true,
    },

    ledger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ledger",
      required: true,
    },

    subLedger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubLedger",
      required: true,
    },

    departments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Performance indexes
// serviceListSchema.index({ billGroup: 1 });
// serviceListSchema.index({ ledger: 1 });
// serviceListSchema.index({ subLedger: 1 });
// serviceListSchema.index({ deleted: 1 });

const ServiceList = mongoose.model("ServiceList", serviceListSchema);
export default ServiceList;
