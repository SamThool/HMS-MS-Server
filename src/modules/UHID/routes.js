// uhid/routes.js
import express from "express";
import {
  createUHID,
  getAllUHIDs,
  getUHID,
  updateUHID,
  deleteUHID,
  searchPatients,
} from "./controller.js";

const router = express.Router();
router.get("/search", searchPatients);
router.post("/", createUHID); // create UHID
router.get("/", getAllUHIDs); // list all
router.get("/:id", getUHID); // by _id or UHID string
router.put("/:id", updateUHID); // update
router.delete("/:id", deleteUHID); // soft delete

export default router;
