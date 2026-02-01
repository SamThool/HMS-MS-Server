import express from "express";
import {
  createTypeMed,
  getTypeMeds,
  updateTypeMed,
  deleteTypeMed,
} from "./controller.js";

const router = express.Router();

router.post("/", createTypeMed);
router.get("/", getTypeMeds);
router.put("/:id", updateTypeMed);
router.delete("/:id", deleteTypeMed);

export default router;
