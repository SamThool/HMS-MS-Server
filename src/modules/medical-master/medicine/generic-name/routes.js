import express from "express";
import {
  createGenericMed,
  getGenericMeds,
  updateGenericMed,
  deleteGenericMed,
} from "./controller.js";

const router = express.Router();

router.post("/", createGenericMed);     // Create
router.get("/", getGenericMeds);         // Read
router.put("/:id", updateGenericMed);    // Update
router.delete("/:id", deleteGenericMed); // Soft Delete

export default router;
