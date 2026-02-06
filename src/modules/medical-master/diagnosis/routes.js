import express from "express";
import {
  createDiagnosis,
  getDiagnoses,
  updateDiagnosis,
  deleteDiagnosis,
} from "./controller.js";

const router = express.Router();

router.post("/", createDiagnosis); // Create
router.get("/", getDiagnoses); // Read
router.put("/:id", updateDiagnosis); // Update
router.delete("/:id", deleteDiagnosis); // Soft Delete

export default router;
