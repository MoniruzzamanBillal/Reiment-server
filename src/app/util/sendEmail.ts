import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (
  resetPasswordLink: string,
  receiverMail: string
) => {
  const transporter = nodemailer.createTransport({
    host: config.nodemailer_host,
    port: 587,
    secure: false,
    auth: {
      user: "mdmoniruzzamanbillal2@gmail.com",
      pass: "ilmf eeqw agtp mibf",
    },
  });

  const response = await transporter.sendMail({
    from: config.nodemailer_sender,
    to: receiverMail,
    subject: "Reset your password within 5 mins!",
    text: "",
    html: resetPasswordLink,
  });

  return response;
};
