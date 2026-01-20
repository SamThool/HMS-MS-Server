import express from "express";
import {
  createOpdPatient,
  markOpdIn,
  markOpdOut,
  getAllOpdPatients,
  getOpdById,
  searchOpdPatients,
} from "./controller.js";

const router = express.Router();

router.get("/search", searchOpdPatients);
router.post("/", createOpdPatient);
router.get("/", getAllOpdPatients);
router.get("/:id", getOpdById);
router.patch("/:id/arrived", markOpdIn);
router.patch("/:id/out", markOpdOut);

export default router;
