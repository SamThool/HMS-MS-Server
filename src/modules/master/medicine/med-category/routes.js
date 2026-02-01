import express from "express";
import {
  createCategoryMed,
  getCategoryMeds,
  updateCategoryMed,
  deleteCategoryMed,
} from "./controller.js";

const router = express.Router();

router.post("/", createCategoryMed);
router.get("/", getCategoryMeds);
router.put("/:id", updateCategoryMed);
router.delete("/:id", deleteCategoryMed);

export default router;
