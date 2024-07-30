import { Request, Response } from "express";
import { EmailService } from "../../Services/MailService/MailService";
import { EmailDetails } from "../../Interfaces/EmailInterface";

export const EmailController = {
  sendEmail: async (req: Request, res: Response) => {
    const emailDetails: EmailDetails = req.body;

    const result = await EmailService.sendEmail(emailDetails);

    res.status(result.statusCode).json(result.data);
  },
};
