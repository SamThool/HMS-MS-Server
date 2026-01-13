import express from "express";
import {
  createAppointment,
  getAppointmentsByDoctorAndDate,
  getAllAppointments,
} from "./controller.js";

const router = express.Router();

// CREATE
router.post("/", createAppointment);

// GET by doctor + date
router.get("/by-doctor", getAppointmentsByDoctorAndDate);

// GET all
router.get("/", getAllAppointments);

export default router;
