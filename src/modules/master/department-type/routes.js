import express from "express";
import {
  createDepartmentType,
  getDepartmentTypes,
  updateDepartmentType,
  deleteDepartmentType,
} from "./controller.js";

const router = express.Router();

router.post("/", createDepartmentType); // Create
router.get("/", getDepartmentTypes); // Read
router.put("/:id", updateDepartmentType); // Update
router.delete("/:id", deleteDepartmentType); // Soft Delete

export default router;
