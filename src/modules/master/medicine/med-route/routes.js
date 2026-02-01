import express from "express";
import {
  createRouteMed,
  getRouteMeds,
  updateRouteMed,
  deleteRouteMed,
} from "./controller.js";

const router = express.Router();

router.post("/", createRouteMed);
router.get("/", getRouteMeds);
router.put("/:id", updateRouteMed);
router.delete("/:id", deleteRouteMed);

export default router;
