import nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import { AppDataSource } from "../../data-source"; // Assuming you have a data source setup for dependency injection or similar purposes
import { EmailDetails } from "../../Interfaces/EmailInterface";

export const EmailService = {
  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "InvesTech27@gmail.com",
      pass: "jpaz iveo nupo ilmt",
    },
  }) as Transporter,

  sendEmail: async (emailDetails: EmailDetails) => {
    console.log(emailDetails);

    const { to, subject, text, sender } = emailDetails;

    if (!to || !subject || !text || !sender) {
      return {
        statusCode: 400,
        data: { message: "Missing required fields" },
      };
    }

    try {
      const info = await EmailService.transporter.sendMail({
        from: "InvesTech27@gmail.com",
        to,
        subject,
        text,
        html: `<b>${text}Sender Email ${sender} </b>`, // html body
      });

      return {
        statusCode: 200,
        data: { message: "Email sent successfully", messageId: info.messageId },
      };
    } catch (error) {
      console.error("Error sending email:", error);
      return {
        statusCode: 500,
        data: { message: "Error sending email", error },
      };
    }
  },
};
