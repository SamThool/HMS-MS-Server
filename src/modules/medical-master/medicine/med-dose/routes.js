import express from "express";
import {
  createDoseMed,
  getDoseMeds,
  updateDoseMed,
  deleteDoseMed,
} from "./controller.js";

const router = express.Router();

router.post("/", createDoseMed);
router.get("/", getDoseMeds);
router.put("/:id", updateDoseMed);
router.delete("/:id", deleteDoseMed);

export default router;
