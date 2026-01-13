import express from "express";
import {
  createTPA,
  getAllTPAs,
  updateTPA,
  deleteTPA,
} from "./controller.js";

const router = express.Router();

router.post("/", createTPA);
router.get("/", getAllTPAs);
router.put("/:id", updateTPA);
router.delete("/:id", deleteTPA);

export default router;
