import express from "express";
import {
  getInstructions,
  createInstruction,
  updateInstruction,
  deleteInstruction,
  addInstructionSuggestion,
  updateInstructionSuggestion,
  deleteInstructionSuggestion,
} from "./controller.js";

const router = express.Router();

/* existing CRUD (optional but kept) */
router.get("/", getInstructions);
router.post("/", createInstruction);
router.put("/:id", updateInstruction);
router.delete("/:id", deleteInstruction);

/* suggestion-style routes (USED BY MasterSuggestionPills) */
router.post("/suggestion/add", addInstructionSuggestion);
router.post("/suggestion/update", updateInstructionSuggestion);
router.post("/suggestion/delete", deleteInstructionSuggestion);

export default router;
