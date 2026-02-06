import express from "express";
import {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} from "./controller.js";

const router = express.Router();

// Create
router.post("/", createMedicine);

// Read
router.get("/", getMedicines);
router.get("/:id", getMedicineById);

// Update
router.put("/:id", updateMedicine);

// Soft Delete
router.delete("/:id", deleteMedicine);

export default router;
