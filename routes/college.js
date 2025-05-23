import express from "express";
import {
  college_checkout,
  college_paymentVerification,
} from "../controller/collegeController.js";

const router = express.Router();

router.route("/College_checkout").post(college_checkout);
router.route("/College_paymentverification").post(college_paymentVerification);

export default router;
