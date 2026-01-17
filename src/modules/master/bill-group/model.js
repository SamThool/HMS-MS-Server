import mongoose from "mongoose";

const billGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      unique: true,
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

    description: {
      type: String,
      trim: true,
      default: "",
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Auto-generate code before saving
billGroupSchema.pre("save", async function (next) {
  // Only generate code if it doesn't exist (for new documents)
  if (!this.code) {
    try {
      // Find the last document sorted by code (numeric value)
      const lastDoc = await this.constructor
        .findOne({ deleted: false })
        .sort({ code: -1 });

      let nextNumber = 1;

      if (lastDoc && lastDoc.code) {
        // Extract numeric value from code (e.g., "00001" -> 1)
        const lastNumber = parseInt(lastDoc.code, 10);
        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1;
        }
      }

      // Pad with leading zeros to 5 digits (00001, 00002, etc.)
      this.code = nextNumber.toString().padStart(5, "0");
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Performance indexes
// billGroupSchema.index({ ledger: 1 });
// billGroupSchema.index({ subLedger: 1 });
// billGroupSchema.index({ deleted: 1 });

const BillGroup = mongoose.model("BillGroup", billGroupSchema);
export default BillGroup;
