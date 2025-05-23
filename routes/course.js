import express from "express";
import {
  detail_checkout,
  detail_paymentVerification,
} from "../controller/courseController.js";

const router = express.Router();

router.route("/Detail_checkout").post(detail_checkout);
router.route("/Detail_paymentverification").post(detail_paymentVerification);

export default router;
