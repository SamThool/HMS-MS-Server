import mongoose from "mongoose";

const opdEmrSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient", // UHID / Patient master model
      required: true,
      index: true,
    },

    opdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OPDPatient",
      required: true,
      index: true,
    },

    opdNo: {
      type: String,
      required: true,
      trim: true,
    },

    chiefComplaints: {
      type: [
        {
          complaint: String,
          location: String,
          description: String,
          since: String,
          treatment: String,
          with: String,
        },
      ],
      default: [],
    },

    // 👉 EMR sections will be added here later
    // chiefComplaints: []
    // examinations: {}
    // medicalHistory: {}
  },
  {
    timestamps: true,
  },
);

// Optional but VERY useful:
// One EMR per OPD visit
opdEmrSchema.index({ opdId: 1 }, { unique: true });

export default mongoose.model("OPDEMR", opdEmrSchema);
