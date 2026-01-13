import express from "express";
import {
  createGovernmentCompany,
  getAllGovernmentCompanies,
  updateGovernmentCompany,
  deleteGovernmentCompany,
} from "./controller.js";

const router = express.Router();

router.post("/", createGovernmentCompany);
router.get("/", getAllGovernmentCompanies);
router.put("/:id", updateGovernmentCompany);
router.delete("/:id", deleteGovernmentCompany);

export default router;
