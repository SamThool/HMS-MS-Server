import express from "express";
import {
  createServiceList,
  getAllServiceLists,
  getServiceListById,
  updateServiceList,
  deleteServiceList,
} from "./controller.js";

const router = express.Router();

router.post("/", createServiceList);
router.get("/", getAllServiceLists);
router.get("/:id", getServiceListById);
router.put("/:id", updateServiceList);
router.delete("/:id", deleteServiceList);

export default router;
