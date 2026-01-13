import express from "express";
import {
  createDoctorSchedule,
  getDocterSchedule,
  getAllDoctorsSchedule,
} from "./controller.js";

const router = express.Router();

// CREATE / UPDATE
router.post("/", createDoctorSchedule);

// GET one doctor schedule
router.get("/:doctorId", getDocterSchedule);

// GET all doctors schedules
router.get("/", getAllDoctorsSchedule);

export default router;
