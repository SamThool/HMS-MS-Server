import express from "express";
import {
  createExaminationMaster,
  getByDepartmentId,
  addSuggestion,
  updateSuggestion,
  deleteSuggestion,
} from "./controller.js";

const router = express.Router();

/**
 * Create (or return existing) examination master
 */
router.post("/", createExaminationMaster);

/**
 * Get examination master by department
 */
router.get("/department/:departmentId", getByDepartmentId);

/**
 * Suggestion actions (used by MasterSuggestionPills)
 */
router.post("/suggestion/add", addSuggestion);
router.post("/suggestion/update", updateSuggestion);
router.post("/suggestion/delete", deleteSuggestion);

export default router;
