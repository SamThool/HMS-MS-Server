import express from "express";
import {
  addChiefComplaint,
  deleteChiefComplaint,
  getOpdEmrByOpdId,
} from "./controller.js";

const router = express.Router();

// add chief complaint to OPD EMR
router.post("/:opdId/chief-complaint", addChiefComplaint);

// get full OPD EMR by opdId
router.get("/:opdId", getOpdEmrByOpdId);

// delet one chief compliant
router.delete("/:opdId/chief-complaint/:complaintId", deleteChiefComplaint);

export default router;
