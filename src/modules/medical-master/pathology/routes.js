import express from "express";
import {
  createPathology,
  getPathology,
  updatePathology,
  deletePathology,
} from "./controller.js";

const router = express.Router();

router.post("/", createPathology);
router.get("/", getPathology);
router.put("/:id", updatePathology);
router.delete("/:id", deletePathology);

export default router;
