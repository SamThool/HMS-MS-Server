import mongoose from "mongoose";

const opdPatientSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UHID",
      required: true,
    },

    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    opdno: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PayeeCategory",
      required: true,
    },

    parentPayee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payee",
      default: null,
    },

    payee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payee",
      default: null,
    },

    payStatus: {
      type: String,
      enum: ["paid", "unpaid", "due"],
      default: "unpaid",
    },

    status: {
      type: String,
      enum: ["in", "out", "wait"],
      default: "wait",
    },

    inTime: Date,
    outTime: Date,
  },
  { timestamps: true },
);

opdPatientSchema.index({ opdno: 1 });
opdPatientSchema.index({ createdAt: -1 });

const OPDPatient = mongoose.model("OPDPatient", opdPatientSchema);

export default OPDPatient;
