import express from "express";
import {
  createGIPSAACompany,
  getAllGIPSAACompanies,
  updateGIPSAACompany,
  deleteGIPSAACompany,
} from "./controller.js";

const router = express.Router();

router.post("/", createGIPSAACompany);
router.get("/", getAllGIPSAACompanies);
router.put("/:id", updateGIPSAACompany);
router.delete("/:id", deleteGIPSAACompany);

export default router;
