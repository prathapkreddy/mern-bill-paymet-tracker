import express from "express";
import { deletePayment, updatePayment, getPayments, addPayment } from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/add", addPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);
router.get("/", getPayments);

export default router;
