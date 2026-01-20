import mongoose from "mongoose";

/**
 * Appointment Schema
 * Represents ONE booked slot for a patient
 */
const appointmentSchema = new mongoose.Schema(
  {
    uhid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UHID",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    consultant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    slot: {
      type: String, // e.g. "17:00-17:30"
      required: true,
      trim: true,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("Appointment", appointmentSchema);
