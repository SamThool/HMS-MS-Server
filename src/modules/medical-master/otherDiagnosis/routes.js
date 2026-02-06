import express from "express";
import {
  createOtherDiagnosis,
  getOtherDiagnosis,
  updateOtherDiagnosis,
  deleteOtherDiagnosis,
} from "./controller.js";

const router = express.Router();

router.post("/", createOtherDiagnosis);
router.get("/", getOtherDiagnosis);
router.put("/:id", updateOtherDiagnosis);
router.delete("/:id", deleteOtherDiagnosis);

export default router;
