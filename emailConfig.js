// backend/emailConfig.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({path : "./config/config.env"});

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

export const sendConfirmationEmail = (to,username, orderId) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: 'Payment Confirmation',
    html:`
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color:black;">
      <p>Dear ${username},</p>
      <p>Congratulations on successfully registering for Edusahyogi's counseling services! We are excited to help you find the best college that matches your preferences.</p>
      <p>We have received your payment and your counseling session has been confirmed. You will receive further details and the session link shortly.</p>
      <p><strong>Your Payment ID is : </strong> ${orderId}</p>
      <p>Best Regards,<br>
      The Edusahyogi Team<br>
      Support Team contact<br>
      8818822890</p>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
