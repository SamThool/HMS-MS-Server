import mongoose from "mongoose";

const serviceRateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ServiceList",
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        service_code: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ServiceRate = mongoose.model("ServiceRate", serviceRateSchema);

export default ServiceRate;
