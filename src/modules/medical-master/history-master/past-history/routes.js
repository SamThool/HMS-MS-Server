import express from "express";
import {
  addSuggestion,
  createPastHistoryMaster,
  deleteSuggestion,
  getByDepartmentId,
  updateSuggestion,
} from "./controller.js";

const router = express.Router();

router.post("/", createPastHistoryMaster);
router.get("/department/:departmentId", getByDepartmentId);

router.post("/suggestion/add", addSuggestion);
router.post("/suggestion/update", updateSuggestion);
router.post("/suggestion/delete", deleteSuggestion);

export default router;
