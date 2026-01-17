import express from "express";
import {
  createBillGroup,
  getAllBillGroups,
  getBillGroupById,
  updateBillGroup,
  deleteBillGroup,
} from "./controller.js";

const router = express.Router();

router.post("/", createBillGroup);
router.get("/", getAllBillGroups);
router.get("/:id", getBillGroupById);
router.put("/:id", updateBillGroup);
router.delete("/:id", deleteBillGroup);

export default router;
