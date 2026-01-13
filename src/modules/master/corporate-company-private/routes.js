import express from "express";
import {
  createCorporateCompanyPrivate,
  getAllCorporateCompanyPrivate,
  updateCorporateCompanyPrivate,
  deleteCorporateCompanyPrivate,
} from "./controller.js";

const router = express.Router();

router.post("/", createCorporateCompanyPrivate);
router.get("/", getAllCorporateCompanyPrivate);
router.put("/:id", updateCorporateCompanyPrivate);
router.delete("/:id", deleteCorporateCompanyPrivate);

export default router;
