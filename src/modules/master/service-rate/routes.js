import express from "express";
import {
  createServiceRate,
  getAllServiceRates,
  getServiceRateById,
  updateServiceRate,
  deleteServiceRate,
} from "./controller.js";

const router = express.Router();

router.post("/", createServiceRate);
router.get("/", getAllServiceRates);
router.get("/:id", getServiceRateById);
router.put("/:id", updateServiceRate);
router.delete("/:id", deleteServiceRate);

export default router;
