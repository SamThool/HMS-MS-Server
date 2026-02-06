import express from "express";
import {
  createRadiology,
  getRadiology,
  updateRadiology,
  deleteRadiology,
} from "./controller.js";

const router = express.Router();

router.post("/", createRadiology);
router.get("/", getRadiology);
router.put("/:id", updateRadiology);
router.delete("/:id", deleteRadiology);

export default router;
