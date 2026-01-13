import express from "express";
import {
  createCorporateCompanyPublic,
  getAllCorporateCompanyPublic,
  updateCorporateCompanyPublic,
  deleteCorporateCompanyPublic,
} from "./controller.js";

const router = express.Router();

router.post("/", createCorporateCompanyPublic);
router.get("/", getAllCorporateCompanyPublic);
router.put("/:id", updateCorporateCompanyPublic);
router.delete("/:id", deleteCorporateCompanyPublic);

export default router;
