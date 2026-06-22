import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.SMTP_HOST ||
  !process.env.SMTP_PORT ||
  !process.env.SMTP_USER ||
  !process.env.SMTP_PASS
) {
  console.warn(
    "SMTP configuration is incomplete. Please check your environment variables.",
  );
}

const transporter = createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    console.log("Sending email to:", to);
    console.log("Email subject:", subject);
    console.log("Email text:", text);
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
