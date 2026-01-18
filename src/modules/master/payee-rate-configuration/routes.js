import express from "express";
import {
  createPayeeRateConfiguration,
  getAllPayeeRateConfigurations,
  updatePayeeRateConfiguration,
  deletePayeeRateConfiguration,
} from "./controller.js";

const router = express.Router();

router.post("/", createPayeeRateConfiguration);
router.get("/", getAllPayeeRateConfigurations);
router.put("/:id", updatePayeeRateConfiguration);
router.delete("/:id", deletePayeeRateConfiguration);

export default router;
