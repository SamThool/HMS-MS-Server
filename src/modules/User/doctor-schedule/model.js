import mongoose from "mongoose";

/**
 * Slot schema
 * Represents a single time block in a day
 */
const slotSchema = new mongoose.Schema(
  {
    startTime: {
      type: String, // "17:00"
      required: true,
    },

    endTime: {
      type: String, // "17:30"
      required: true,
    },

    type: {
      type: String,
      enum: ["available", "break"],
      default: "available",
    },

    isBooked: {
      type: Boolean,
      default: false,
    },

    comment: {
      type: String,
      trim: true,
      default: "",
      // e.g. "Lunch break", "Emergency block", "Tentative"
    },
  },
  { _id: false }
);

/**
 * Day schema
 * Represents one calendar date
 */
const daySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    slots: {
      type: [slotSchema],
      default: [],
    },
  },
  { _id: false }
);

/**
 * Doctor Schedule schema
 * ONE document per doctor
 */
const doctorScheduleSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // 🔑 one schedule per doctor
    },

    days: {
      type: [daySchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("DoctorSchedule", doctorScheduleSchema);
