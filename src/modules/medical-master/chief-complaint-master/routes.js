import express from "express";
import {
  // addComplaint,
  addSuggestion,
  createChiefComplaintMaster,
  // deleteComplaint,
  deleteSuggestion,
  getByDepartmentId,
  // updateComplaint,
  updateSuggestion,
} from "./controller.js";

const router = express.Router();

router.post("/", createChiefComplaintMaster);
router.get("/department/:departmentId", getByDepartmentId);

router.post("/suggestion/add", addSuggestion);
router.post("/suggestion/update", updateSuggestion);
router.post("/suggestion/delete", deleteSuggestion);

export default router;
