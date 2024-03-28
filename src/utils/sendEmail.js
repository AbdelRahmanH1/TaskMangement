import nodemailer from "nodemailer";

export const sendEmail = async ({ to, html }) => {
  const trasnporter = nodemailer.createTransport({
    host: "localhost",
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  const sent = await trasnporter.sendMail({
    from: process.env.EMAIL,
    to,
    html,
  });
  if (sent.accepted.length === 0) {
    return false;
  } else return true;
};
