import express from "express";
import {
  getHospitalSetup,
  saveHospitalSetup,
} from "./controller.js";

const router = express.Router();

/**
 * GET  /hospital-setup
 * POST /hospital-setup
 */
router.get("/", getHospitalSetup);
router.post("/", saveHospitalSetup);

export default router;
