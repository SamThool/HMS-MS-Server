import express from "express";
import {
  createAppointment,
  getAppointmentsByDoctorAndDate,
  getAllAppointments,
  softDeleteAppointment,
} from "./controller.js";

const router = express.Router();

// CREATE
router.post("/", createAppointment);

// GET by doctor + date
router.get("/by-doctor", getAppointmentsByDoctorAndDate);

// GET all
router.get("/", getAllAppointments);

// SOFT DELETE - Add this route
router.delete("/:id", softDeleteAppointment);

export default router;
