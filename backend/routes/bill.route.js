import express from "express";
import { addBill, getBills, updateBill, deleteBill } from "../controllers/bill.controller.js";
const router = express.Router();

router.post("/add", addBill);
router.put("/:id", updateBill);
router.delete("/:id", deleteBill);
router.get("/", getBills);

export default router;
