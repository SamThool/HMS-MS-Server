import express from "express";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} from "./controller.js";

const router = express.Router();

router.post("/", createDepartment); // Create Department
router.get("/", getDepartments); // Get all Departments
router.put("/:id", updateDepartment); // Update Department
router.delete("/:id", deleteDepartment); // Soft Delete Department

export default router;
