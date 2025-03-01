import express from "express";

import { addCreditCard, getCreditCards, deleteCreditCard, updatedCreditCard } from "../controllers/credit.card.controller.js";

const router = express.Router();

router.post("/add", addCreditCard);
router.put("/:id", updatedCreditCard);
router.delete("/:id", deleteCreditCard);
router.get("/", getCreditCards);

export default router;
