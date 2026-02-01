import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    generic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GenericMed",
      default: null,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BrandMed",
      default: null,
    },

    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TypeMed",
      default: null,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryMed",
      default: null,
    },

    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RouteMed",
      default: null,
    },

    dose: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DoseMed",
      default: null,
    },

    strength: {
      type: String,
      trim: true,
      default: "",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Optional uniqueness protection
 * Only applies when brand + strength exist
 */
medicineSchema.index(
  { brand: 1, strength: 1 },
  {
    unique: true,
    partialFilterExpression: {
      brand: { $exists: true, $ne: null },
      strength: { $ne: "" },
      deleted: false,
    },
  }
);

const Medicine = mongoose.model("Medicine", medicineSchema);

export default Medicine;
