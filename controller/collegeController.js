import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import CollegeModel from "../models/college.js";
import { sendConfirmationEmail } from "../emailConfig.js";

export const college_checkout = async (req, res) => {
  const {
    discount,
    heading,
    name,
    number,
    email,
    program,
    state,
    city,
    course,
    specializations,
  } = req.body;

  const options = {
    amount: Number(discount * 100),
    currency: "INR",
    notes: {
      heading,
      name,
      number,
      email,
      program,
      state,
      city,
      course,
      specializations,
    },
  };

  try {
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      heading,
      name,
      number,
      email,
      program,
      state,
      city,
      course,
      specializations,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res
      .status(500)
      .json({ success: false, message: "Razorpay order creation failed" });
  }
};

export const college_paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const order = await instance.orders.fetch(razorpay_order_id);

    const email = order.notes.email;
    const name = order.notes.name;
    const number = order.notes.number;
    const heading = order.notes.heading;
    const city = order.notes.city;
    const program = order.notes.program;
    const state = order.notes.program;
    const course = order.notes.program;
    const specialization = order.notes.program;

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await CollegeModel.create({
      name,
      email,
      number,
      program,
      state,
      city,
      course,
      specialization,
      heading,
    });

    sendConfirmationEmail(email, name, razorpay_payment_id);

    // Get the current date
    const date = new Date().toISOString();

    // Include username, amount, and date in the redirect URL
    res.redirect(
      `https://edusahyogi.in/Paymentsuccess?reference=${razorpay_payment_id}&username=${name}&amount=${
        order.amount / 100
      }&date=${date}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
