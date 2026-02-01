import express from "express";
import {
  createBrandMed,
  getBrandMeds,
  updateBrandMed,
  deleteBrandMed,
} from "./controller.js";

const router = express.Router();

router.post("/", createBrandMed);
router.get("/", getBrandMeds);
router.put("/:id", updateBrandMed);
router.delete("/:id", deleteBrandMed);

export default router;
