import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
import { sendConfirmationEmail } from "../emailConfig.js";
import useModel from "../models/userModel.js";

export const checkout = async (req, res) => {
  const { amount, email, username, mobilenumber, twelvenumber, city } =
    req.body; // Receive email in the request body
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
    notes: { email, username, mobilenumber, twelvenumber, city },
  };
  try {
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      email,
      username,
      mobilenumber,
      twelvenumber,
      city,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res
      .status(500)
      .json({ success: false, message: "Razorpay order creation failed" });
  }
};

export const paymentVerification = async (req, res) => {
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
    const username = order.notes.username;
    const mobilenumber = order.notes.mobilenumber;
    const twelvenumber = order.notes.twelvenumber;
    const city = order.notes.city;

    // Database comes here
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await useModel.create({
      username,
      mobilenumber,
      email,
      twelvenumber,
      city,
    });

    sendConfirmationEmail(email, username, razorpay_payment_id);

    // Get the current date
    const date = new Date().toISOString();

    // Include username, amount, and date in the redirect URL
    res.redirect(
      `https://edusahyogi.in/Paymentsuccess?reference=${razorpay_payment_id}&username=${username}&amount=${
        order.amount / 100
      }&date=${date}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
