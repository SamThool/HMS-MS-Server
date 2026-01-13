import express from "express";
import {
  createInsuranceCompany,
  getAllInsuranceCompanies,
  updateInsuranceCompany,
  deleteInsuranceCompany,
} from "./controller.js";

const router = express.Router();

router.post("/", createInsuranceCompany);
router.get("/", getAllInsuranceCompanies);
router.put("/:id", updateInsuranceCompany);
router.delete("/:id", deleteInsuranceCompany);

export default router;
