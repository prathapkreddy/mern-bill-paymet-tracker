import express from "express";
import { getDashboardDetails } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/", getDashboardDetails);

export default router;
