import express from "express";
import {
  getProcedures,
  createProcedure,
  updateProcedure,
  deleteProcedure,
  addProcedureSuggestion,
  updateProcedureSuggestion,
  deleteProcedureSuggestion,
} from "./controller.js";

const router = express.Router();

/* existing CRUD (keep if you want) */
router.get("/", getProcedures);
router.post("/", createProcedure);
router.put("/:id", updateProcedure);
router.delete("/:id", deleteProcedure);

/* suggestion-style routes (FOR MasterSuggestionPills) */
router.post("/suggestion/add", addProcedureSuggestion);
router.post("/suggestion/update", updateProcedureSuggestion);
router.post("/suggestion/delete", deleteProcedureSuggestion);

export default router;
