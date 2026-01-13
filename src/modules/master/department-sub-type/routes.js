import express from "express";
import {
  createDepartmentSubType,
  getDepartmentSubTypes,
  updateDepartmentSubType,
  deleteDepartmentSubType,
} from "./controller.js";

const router = express.Router();

router.post("/", createDepartmentSubType); // Create
router.get("/", getDepartmentSubTypes); // Read
router.put("/:id", updateDepartmentSubType); // Update
router.delete("/:id", deleteDepartmentSubType); // Soft Delete

export default router;
